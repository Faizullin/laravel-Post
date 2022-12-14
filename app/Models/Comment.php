<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    use Filterable;

    protected $fillable = [
        'user_id',
        'post_id',
        'parent_id',
        'message'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->commentable();
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Comment::class,);
    }

    public function commentable()
    {
        return $this->morphTo();
    }
}
