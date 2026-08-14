<?php

namespace App\Http\Controllers\School;

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
        $membership = $request->user()->memberships()->where('role', 'school_admin')->firstOrFail();
        $studentIds = DB::table('memberships')->where('organization_id', $membership->organization_id)->where('role', 'student')->pluck('user_id');
        $averageProgress = Enrollment::whereIn('user_id', $studentIds)->avg('progress_percent');

        return Inertia::render('school/dashboard', [
            'metrics' => [
                'students' => $studentIds->count(),
                'teachers' => DB::table('memberships')->where('organization_id', $membership->organization_id)->where('role', 'teacher')->count(),
                'classes' => DB::table('classrooms')->where('organization_id', $membership->organization_id)->count(),
                'completion' => is_numeric($averageProgress) ? (int) round((float) $averageProgress) : 0,
            ],
        ]);
    }
}
