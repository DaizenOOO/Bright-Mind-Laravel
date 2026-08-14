<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\ContentBlock;
use App\Models\Course;
use App\Services\CoursePublicationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Course::class);

        $query = Course::query()->with('translations')->latest();
        if (! $request->user()->hasScopedRole('platform_admin')) {
            $organizationIds = $request->user()->memberships()->whereIn('role', ['partner_editor', 'translator', 'reviewer', 'approver'])->pluck('organization_id');
            $query->whereIn('organization_id', $organizationIds);
        }

        return Inertia::render('admin/courses/index', [
            'courses' => $query->get()->map(fn (Course $course): array => [
                'id' => $course->id, 'slug' => $course->slug, 'title' => $course->translations->firstWhere('locale', 'en')?->title,
                'status' => $course->status, 'readiness' => $course->readiness_score, 'updatedAt' => $course->updated_at?->diffForHumans(),
                'translations' => $course->translations->where('status', 'approved')->count(),
            ]),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course, CoursePublicationService $publication): Response
    {
        $this->authorize('update', $course);
        $course->load(['translations', 'sections.blocks.translations', 'sections.blocks.media']);

        return Inertia::render('admin/courses/edit', [
            'course' => $course,
            'readiness' => $publication->readiness($course),
            'blockTypes' => $this->blockTypes(),
            'locales' => CoursePublicationService::LOCALES,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course): RedirectResponse
    {
        $data = $request->validated();
        $locale = $data['locale'];
        $course->update(collect($data)->only(['category', 'methodology', 'difficulty', 'audience', 'estimated_minutes', 'xp_reward'])->all());
        $course->translations()->updateOrCreate(['locale' => $locale], collect($data)->only(['title', 'short_description', 'description'])->merge(['status' => $locale === $course->source_locale ? 'needs_review' : 'outdated'])->all());

        return back()->with('success', 'Course saved');
    }

    public function publish(Course $course, CoursePublicationService $publication, Request $request): RedirectResponse
    {
        $this->authorize('publish', $course);
        $publication->publish($course, $request->user());

        return back()->with('success', 'Course published');
    }

    public function addBlock(Course $course, Request $request): RedirectResponse
    {
        $this->authorize('update', $course);
        $allowedTypes = collect($this->blockTypes())->flatMap(fn (array $group): array => $group['types'])->all();
        $data = $request->validate([
            'section_id' => ['required', 'integer', 'exists:course_sections,id'],
            'type' => ['required', 'string', 'in:'.implode(',', $allowedTypes)],
            'content' => ['required', 'array'],
        ]);
        $section = $course->sections()->whereKey($data['section_id'])->firstOrFail();
        $block = $section->blocks()->create([
            'type' => $data['type'],
            'position' => ($section->blocks()->max('position') ?? 0) + 1,
            'configuration' => [],
            'xp_reward' => 0,
        ]);
        $block->translations()->create([
            'locale' => $course->source_locale,
            'content' => $data['content'],
            'status' => 'needs_review',
        ]);

        return back()->with('success', 'Content block added');
    }

    public function duplicateBlock(Course $course, ContentBlock $block): RedirectResponse
    {
        $this->authorize('update', $course);
        abort_unless($block->section->course_id === $course->id, 404);
        $copy = $block->replicate(['position']);
        $copy->position = $block->section->blocks()->count() + 1;
        $copy->save();
        foreach ($block->translations as $translation) {
            $copy->translations()->create($translation->only(['locale', 'content', 'status', 'provenance', 'source_updated_at']));
        }

        return back()->with('success', 'Block duplicated');
    }

    public function destroyBlock(Course $course, ContentBlock $block): RedirectResponse
    {
        $this->authorize('update', $course);
        abort_unless($block->section->course_id === $course->id, 404);
        $block->delete();

        return back()->with('success', 'Block deleted');
    }

    /** @return array<int, array{category: string, types: array<int, string>}> */
    private function blockTypes(): array
    {
        return [
            ['category' => 'Content', 'types' => ['heading', 'rich_text', 'key_concept', 'callout', 'quote', 'checklist', 'table', 'image', 'gallery', 'audio', 'download', 'resource_list']],
            ['category' => 'Video & embeds', 'types' => ['video', 'youtube', 'vimeo', 'google_embed', 'canva', 'genially', 'h5p', 'miro']],
            ['category' => 'Interactive learning', 'types' => ['single_choice', 'multiple_choice', 'true_false', 'fill_blank', 'matching', 'sorting', 'sequencing', 'categorization', 'flashcards', 'timed_recall', 'reflection', 'scenario']],
            ['category' => 'Bright Mind methods', 'types' => ['active_recall', 'peer_task', 'design_thinking', 'metacognition']],
            ['category' => 'Learning workflow', 'types' => ['assignment', 'checkpoint', 'assessment', 'prerequisite', 'milestone', 'achievement_reward', 'xp_reward', 'completion']],
        ];
    }
}
