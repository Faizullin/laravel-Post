<?php

namespace App\Models\Traits;

use App\Http\Filters\AbstractFilter;
use App\Models\Like;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait Liker {

    public function like(Model $object): Like
    {
        $attributes = [
            'likeable_type' => $object->getMorphClass(),
            'likeable_id' => $object->getKey(),
            'user_id' => $this->getKey(),
        ];
        $like = new Like;
        /* @var \Overtrue\LaravelLike\Traits\Likeable|\Illuminate\Database\Eloquent\Model $object */
        return $like->where($attributes)->firstOr(
            function () use ($like, $attributes) {
                return $like->unguarded(function () use ($like, $attributes) {
                    if ($this->relationLoaded('likes')) {
                        $this->unsetRelation('likes');
                    }

                    return $like->create($attributes);
                });
            }
        );
    }


    public function unlike(Model $object)
    {
        $relation = Like::where('likeable_id', $object->getKey())
            ->where('likeable_type', $object->getMorphClass())
            ->where('user_id', $this->getKey())
            ->first();

        if ($relation) {
            if ($this->relationLoaded('likes')) {
                $this->unsetRelation('likes');
            }

            $relation->delete();
            return null;
        }

        return null;
    }

    public function toggleLike(Model $object)
    {
        return $this->hasLiked($object) ? $this->unlike($object) : $this->like($object);
    }

    public function hasLiked(Model $object): bool
    {
        return ($this->relationLoaded('likes') ? $this->likes : $this->likes())
                ->where('likeable_id', $object->getKey())
                ->where('likeable_type', $object->getMorphClass())
                ->count() > 0;
    }

    public function likes(): HasMany
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Get Query Builder for likes
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getLikedItems(string $model)
    {
        //dd($this->getKey());
        return app($model)->whereHas(
            'likers',
            function ($query) {
                return $query->where('user_id', $this->getKey());
            }
        );
    }
}
