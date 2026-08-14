<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** @property string $locale @property string $title @property string $status */
class CourseTranslation extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['learning_objectives' => 'array', 'prerequisites' => 'array', 'approved_at' => 'datetime', 'source_updated_at' => 'datetime'];
    }

    /** @return BelongsTo<Course, $this> */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}
