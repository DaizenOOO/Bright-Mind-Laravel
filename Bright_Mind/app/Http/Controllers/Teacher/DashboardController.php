<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): Response
    {
        abort_unless($request->user()->hasScopedRole('teacher'), 403);
        $studentIds = DB::table('classrooms')->where('teacher_id', $request->user()->id)->join('classroom_user', 'classrooms.id', '=', 'classroom_user.classroom_id')->pluck('user_id');

        return Inertia::render('teacher/dashboard', [
            'students' => DB::table('users')->whereIn('id', $studentIds)->select('id', 'name', 'email')->get(),
            'progress' => Enrollment::with('course.translations', 'user')->whereIn('user_id', $studentIds)->get(),
        ]);
    }
}
