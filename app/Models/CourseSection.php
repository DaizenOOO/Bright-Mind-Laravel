<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/** @property int $course_id */
class CourseSection extends Model
{
    protected $guarded = [];

    /** @return BelongsTo<Course, $this> */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /** @return HasMany<ContentBlock, $this> */
    public function blocks(): HasMany
    {
        return $this->hasMany(ContentBlock::class)->orderBy('position');
    }
}
