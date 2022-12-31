<?php

namespace App\Models\Traits;

use App\Http\Filters\AbstractFilter;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait Likeable {
    public function isLikedBy(Model $user): bool
    {
        if (\is_a($user, User::class)) {
            if ($this->relationLoaded('likers')) {
                return $this->likers->contains($user);
            }

            return $this->likers()->where('user_id', $user->getKey())->exists();
        }

        return false;
    }

    public function likers(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(
            User::class,
            'likes',
            'likeable_id',
            'user_id',
        )->where('likeable_type', $this->getMorphClass());
    }

    // public function likeable()
    // {
    //     return $this->morphTo();
    // }
}
