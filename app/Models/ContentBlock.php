<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/** @property int $id @property int $position @property int $xp_reward @property bool $is_required */
class ContentBlock extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['configuration' => 'array', 'is_required' => 'boolean'];
    }

    /** @return BelongsTo<CourseSection, $this> */
    public function section(): BelongsTo
    {
        return $this->belongsTo(CourseSection::class, 'course_section_id');
    }

    /** @return BelongsTo<MediaAsset, $this> */
    public function media(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class, 'media_asset_id');
    }

    /** @return HasMany<ContentBlockTranslation, $this> */
    public function translations(): HasMany
    {
        return $this->hasMany(ContentBlockTranslation::class);
    }
}
