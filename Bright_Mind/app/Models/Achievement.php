<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['rules' => 'array', 'is_hidden' => 'boolean', 'is_active' => 'boolean'];
    }
}
