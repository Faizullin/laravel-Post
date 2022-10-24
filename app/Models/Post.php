<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    use Filterable;

    protected $fillable = ["title", "file_path", "created_at", "updated_at"];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id');
    }

    public function comments()
    {
      return $this->hasMany(Comment::class,'post_id')->whereNull('parent_id');
    }



    public function getImageUrlAttribute()
    {
        return $this->image_path ? $this->image_path : 'img/unknown.jpg';
    }
}
