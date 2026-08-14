<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ContentBlockTranslation extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['content' => 'array', 'source_updated_at' => 'datetime'];
    }

    /** @return BelongsTo<ContentBlock, $this> */
    public function block(): BelongsTo
    {
        return $this->belongsTo(ContentBlock::class, 'content_block_id');
    }
}
