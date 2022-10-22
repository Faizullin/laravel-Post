<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use \Spatie\Permission\Models\Role as OriginalRole;

class Role extends OriginalRole
{
    use Filterable;

    protected $fillable = [
        'name',
        'guard_name',
        'updated_at',
        'created_at',
    ];

}
