<?php

use App\Models\Achievement;
use App\Models\ContentBlock;
use App\Models\ContentBlockTranslation;
use App\Models\Course;
use App\Models\CourseSection;
use App\Models\Enrollment;
use App\Models\MediaAsset;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\XpEvent;
use App\Services\CoursePublicationService;
use App\Services\LearningProgressService;
use Database\Seeders\BrightMindDemoSeeder;
use Inertia\Testing\AssertableInertia as Assert;

test('a partner can publish ready multilingual content that a learner completes for persistent progress and recognition', function () {
    $organization = Organization::create(['name' => 'Bright Mind Poland', 'slug' => 'bright-mind-poland', 'type' => 'partner', 'country_code' => 'PL']);
    $editor = User::factory()->create();
    $approver = User::factory()->create();
    $student = User::factory()->create();
    Membership::create(['organization_id' => $organization->id, 'user_id' => $editor->id, 'role' => 'partner_editor']);
    Membership::create(['organization_id' => $organization->id, 'user_id' => $approver->id, 'role' => 'approver']);
    Membership::create(['organization_id' => $organization->id, 'user_id' => $student->id, 'role' => 'student']);
    $cover = MediaAsset::create(['organization_id' => $organization->id, 'uploaded_by' => $editor->id, 'kind' => 'course_cover']);
    $course = Course::create([
        'organization_id' => $organization->id, 'owner_id' => $editor->id, 'cover_media_id' => $cover->id,
        'slug' => 'designing-solutions-together', 'source_locale' => 'en', 'category' => 'citizenship',
        'methodology' => 'design_thinking', 'difficulty' => 'intermediate', 'audience' => 'students',
        'estimated_minutes' => 45, 'xp_reward' => 200, 'status' => 'approved',
    ]);
    foreach (CoursePublicationService::LOCALES as $locale) {
        $course->translations()->create([
            'locale' => $locale, 'title' => "Designing solutions together ({$locale})",
            'short_description' => 'Turn observations into community action.', 'description' => 'A complete active-learning course.',
            'learning_objectives' => ['Frame a challenge', 'Test an idea'], 'status' => 'approved', 'approved_at' => now(),
        ]);
    }
    $section = CourseSection::create(['course_id' => $course->id, 'position' => 1, 'title' => 'From questions to action']);
    $block = ContentBlock::create(['course_section_id' => $section->id, 'type' => 'reflection', 'position' => 1, 'configuration' => ['minimum_words' => 20], 'xp_reward' => 50]);
    ContentBlockTranslation::create(['content_block_id' => $block->id, 'locale' => 'en', 'content' => ['prompt' => 'What changed in your thinking?'], 'status' => 'approved']);
    Achievement::create(['key' => 'first-course', 'title' => 'First Chapter', 'description' => 'Complete a first course.', 'category' => 'courses', 'tier' => 'bronze', 'xp_reward' => 100, 'rules' => ['course_completions' => 1]]);

    expect($editor->can('update', $course))->toBeTrue()
        ->and($editor->can('publish', $course))->toBeFalse()
        ->and($approver->can('publish', $course))->toBeTrue();

    $published = app(CoursePublicationService::class)->publish($course, $approver);
    expect($published->status)->toBe('published')->and($published->readiness_score)->toBe(100);

    $enrollment = Enrollment::create(['user_id' => $student->id, 'course_id' => $course->id, 'status' => 'active', 'started_at' => now()]);
    app(LearningProgressService::class)->completeBlock($enrollment, $block, ['reflection' => 'I learned to test assumptions with evidence.']);
    app(LearningProgressService::class)->completeBlock($enrollment->refresh(), $block, ['reflection' => 'Repeated request must remain idempotent.']);

    expect($enrollment->refresh()->status)->toBe('completed')
        ->and($enrollment->progress_percent)->toBe(100)
        ->and(XpEvent::where('user_id', $student->id)->sum('amount'))->toBe(250)
        ->and(UserAchievement::where('user_id', $student->id)->count())->toBe(1)
        ->and($course->enrollments()->where('status', 'completed')->count())->toBe(1);
});

test('publication is blocked until the readiness checklist is complete', function () {
    $organization = Organization::create(['name' => 'Incomplete Partner', 'slug' => 'incomplete-partner', 'type' => 'partner']);
    $approver = User::factory()->create();
    $course = Course::create([
        'organization_id' => $organization->id, 'owner_id' => $approver->id, 'slug' => 'incomplete-course',
        'category' => 'study', 'methodology' => 'active_recall', 'difficulty' => 'beginner', 'audience' => 'students',
    ]);

    expect(fn () => app(CoursePublicationService::class)->publish($course, $approver))
        ->toThrow(DomainException::class, '100% readiness');
});

test('seeded roles reach connected workspaces backed by the same course and progress data', function () {
    $this->seed(BrightMindDemoSeeder::class);
    $course = Course::where('slug', 'designing-solutions-together')->firstOrFail();

    $this->actingAs(User::where('email', 'student@brightmind.test')->firstOrFail())
        ->get(route('student.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('student/dashboard')->has('enrollments', 1));
    $this->get(route('student.courses.show', $course))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('student/course-player')->where('course.id', $course->id));

    $this->actingAs(User::where('email', 'teacher@brightmind.test')->firstOrFail())
        ->get(route('teacher.dashboard'))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('teacher/dashboard')->has('students', 1));

    $this->actingAs(User::where('email', 'school@brightmind.test')->firstOrFail())
        ->get(route('school.dashboard'))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('school/dashboard')->where('metrics.students', 1));

    $this->actingAs(User::where('email', 'editor@brightmind.test')->firstOrFail())
        ->get(route('admin.courses.index'))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/courses/index')->has('courses', 1));
    $this->get(route('admin.courses.edit', $course))->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/courses/edit')->where('readiness.score', 100));
});
