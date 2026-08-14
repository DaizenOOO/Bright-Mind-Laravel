<?php

use App\Http\Controllers\Admin\CourseController as AdminCourseController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\School\DashboardController as SchoolDashboardController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Teacher\DashboardController as TeacherDashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::inertia('/design-system', 'design-system')->name('design-system');
Route::inertia('/pathways', 'pathways')->name('pathways');
Route::post('/locale', LocaleController::class)->name('locale.update');

Route::get('explore/{page}', function (string $page) {
    $pages = [
        'framework-overview' => ['title' => 'Framework overview', 'description' => 'Discover the Bright Mind approach to active, reflective and collaborative learning.'],
        'framework-updates' => ['title' => 'Framework updates', 'description' => 'Follow the latest developments across the Bright Mind learning framework.'],
        'user-guide' => ['title' => 'User guide', 'description' => 'Practical guidance for using Bright Mind as a student, teacher or school.'],
        'student-corner' => ['title' => 'Student Corner', 'description' => 'Learning resources, activities and progress tools designed for students.'],
        'teacher-toolkit' => ['title' => 'Teacher Toolkit', 'description' => 'Teaching resources and tools for guiding active learning.'],
        'school-workspace' => ['title' => 'School Workspace', 'description' => 'A connected space for school groups, learning programmes and collaboration.'],
        'multilingual-interactive-courses' => ['title' => 'Multilingual Interactive Courses', 'description' => 'Interactive learning experiences designed for Bright Mind partner languages.'],
        'gamification-active-learning' => ['title' => 'Gamification of Active Learning', 'description' => 'Motivating progress and participation through purposeful game mechanics.'],
        'digital-badges-europass' => ['title' => 'Digital Badges and Europass Integration', 'description' => 'Recognition and portable evidence of completed learning.'],
        'community-content' => ['title' => 'Community Based Content', 'description' => 'Learning materials shaped and shared by the Bright Mind community.'],
        'progressive-pathways' => ['title' => 'Progressive Learning Pathways', 'description' => 'Structured learning journeys that develop with each learner.'],
        'student-learning' => ['title' => 'Student Learning', 'description' => 'Courses, quizzes and progress in one clear student experience.'],
        'teacher-workspace' => ['title' => 'Teacher Workspace', 'description' => 'Create content and guide every learning group.'],
        'focus-companion' => ['title' => 'Focus Companion', 'description' => 'Build concentration and regular learning habits.'],
        'courses' => ['title' => 'Courses', 'description' => 'Multilingual text and video learning paths.'],
        'quizzes' => ['title' => 'Quizzes', 'description' => 'Active-recall checks and final assessments.'],
        'group-management' => ['title' => 'Group Management', 'description' => 'Organise learners, classes and assignments.'],
        'course-creation' => ['title' => 'Course Creation', 'description' => 'Build lessons, videos, quizzes and activities.'],
        'digital-badges' => ['title' => 'Digital Badges', 'description' => 'Recognise completed skills and milestones.'],
        'europass' => ['title' => 'Europass', 'description' => 'Verified digital learning credentials.'],
        'partner-schools' => ['title' => 'Partner Schools', 'description' => 'Explore the European Bright Mind school network.'],
        'project-support' => ['title' => 'Project Support', 'description' => 'Guidance for students, teachers and partners.'],
        'network-events' => ['title' => 'Network Events', 'description' => 'Workshops, training and exchanges across the Bright Mind network.'],
        'about' => ['title' => 'About Bright Mind', 'description' => 'Learn about the Bright Mind Erasmus+ project and its European partnership.'],
    ];

    abort_unless(array_key_exists($page, $pages), 404);

    return Inertia::render('public/show', $pages[$page]);
})->name('public.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn () => Inertia::render('dashboard', [
        'memberships' => request()->user()->memberships()->with('organization')->get(),
    ]))->name('dashboard');
    Route::get('student', StudentDashboardController::class)->name('student.dashboard');
    Route::get('student/courses/{course:slug}', [StudentCourseController::class, 'show'])->name('student.courses.show');
    Route::post('student/courses/{course:slug}/blocks/{block}/complete', [StudentCourseController::class, 'complete'])->name('student.blocks.complete');
    Route::get('teacher', TeacherDashboardController::class)->name('teacher.dashboard');
    Route::get('school', SchoolDashboardController::class)->name('school.dashboard');
    Route::get('admin/courses', [AdminCourseController::class, 'index'])->name('admin.courses.index');
    Route::get('admin/courses/{course}/edit', [AdminCourseController::class, 'edit'])->name('admin.courses.edit');
    Route::patch('admin/courses/{course}', [AdminCourseController::class, 'update'])->name('admin.courses.update');
    Route::post('admin/courses/{course}/publish', [AdminCourseController::class, 'publish'])->name('admin.courses.publish');
    Route::post('admin/courses/{course}/blocks', [AdminCourseController::class, 'addBlock'])->name('admin.courses.blocks.store');
    Route::post('admin/courses/{course}/blocks/{block}/duplicate', [AdminCourseController::class, 'duplicateBlock'])->name('admin.courses.blocks.duplicate');
    Route::delete('admin/courses/{course}/blocks/{block}', [AdminCourseController::class, 'destroyBlock'])->name('admin.courses.blocks.destroy');
});

require __DIR__.'/settings.php';
