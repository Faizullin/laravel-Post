<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    use Filterable;

    protected $fillable = ["title", "slug"];

    public $withCount = ['posts'];

    public function posts()
    {
        return $this->belongsToMany(Post::class, PostTag::class);
    }


}
