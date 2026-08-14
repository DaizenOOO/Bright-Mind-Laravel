<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\LearningPathway;
use App\Models\XpEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();
        abort_unless($user->hasScopedRole('student'), 403);
        $enrollments = Enrollment::with('course.translations')->where('user_id', $user->id)->get();

        return Inertia::render('student/dashboard', [
            'enrollments' => $enrollments,
            'xp' => XpEvent::where('user_id', $user->id)->sum('amount'),
            'pathway' => LearningPathway::where('status', 'published')->first(),
        ]);
    }
}
