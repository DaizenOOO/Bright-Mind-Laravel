<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompleteBlockRequest;
use App\Models\ContentBlock;
use App\Models\Course;
use App\Models\Enrollment;
use App\Services\LearningProgressService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    public function show(Course $course): Response
    {
        abort_unless($course->status === 'published', 404);
        $course->load(['translations', 'sections.blocks.translations', 'sections.blocks.media']);
        $enrollment = Enrollment::whereBelongsTo(request()->user())->whereBelongsTo($course)->firstOrFail();

        return Inertia::render('student/course-player', ['course' => $course, 'enrollment' => $enrollment]);
    }

    public function complete(CompleteBlockRequest $request, Course $course, ContentBlock $block, LearningProgressService $progress): RedirectResponse
    {
        $enrollment = Enrollment::where('user_id', $request->user()->id)->where('course_id', $course->id)->firstOrFail();
        $progress->completeBlock($enrollment, $block, $request->validated('response', []), $request->integer('score') ?: null);

        return back()->with('success', 'Progress saved');
    }
}
