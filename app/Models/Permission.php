<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Spatie\Permission\Models\Permission as OriginalPermission;

class Permission extends OriginalPermission
{
    use Filterable;

    protected $fillable = [
        'name',
        'guard_name',
        'updated_at',
        'created_at',
    ];
}
