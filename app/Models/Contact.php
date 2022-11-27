<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    use Filterable;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message'
    ];
}
