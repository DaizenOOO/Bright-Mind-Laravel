<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningPathway extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['recommendation_rules' => 'array', 'completion_conditions' => 'array'];
    }

    /** @return HasMany<PathwayNode, $this> */
    public function nodes(): HasMany
    {
        return $this->hasMany(PathwayNode::class);
    }
}
