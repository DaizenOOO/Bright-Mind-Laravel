<?php

namespace App\Policies;

use App\Models\Course;
use App\Models\User;

class CoursePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->memberships()->whereIn('role', ['partner_editor', 'translator', 'reviewer', 'approver', 'platform_admin'])->exists();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Course $course): bool
    {
        return $course->status === 'published' || $user->memberships()->where('organization_id', $course->organization_id)->exists();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->memberships()->whereIn('role', ['partner_editor', 'platform_admin'])->exists();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Course $course): bool
    {
        return $user->hasScopedRole('partner_editor', $course->organization_id) || $user->hasScopedRole('platform_admin');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Course $course): bool
    {
        return $this->update($user, $course) && $course->status === 'draft';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Course $course): bool
    {
        return $this->update($user, $course);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Course $course): bool
    {
        return $user->hasScopedRole('platform_admin');
    }

    public function publish(User $user, Course $course): bool
    {
        return $user->hasScopedRole('approver', $course->organization_id) || $user->hasScopedRole('platform_admin');
    }
}
