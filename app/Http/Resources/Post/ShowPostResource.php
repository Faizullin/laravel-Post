<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Http\Resources\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ShowPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $user = null;
        if(Auth::guard('sanctum')->check()){
            $user = Auth::guard('sanctum')->user();
        } elseif (auth()->user()) {
            $user = auth()->user();
        }
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description'  => $this->description,
            'body'  => $this->body,
            'author'   => $this->user ? new UserMinResource($this->user) : null,
            'category' => new CategoryMinResource($this->category),
            'tags' => TagMinResource::collection($this->tags),
            'comments_count' => $this->commentsWithReplies()->count() ?? $this->comments_count,
            'likes_count' => $this->likers()->count(),// $this->likers_count ?? 0,
            'isLikedByCurrentUser' => $user ? $this->isLikedBy($user) : false,
            'imageUrl' => $this->imageUrl,
            'created_at' => $this->created_at->format('d M, Y'),
            'updated_at' => $this->updated_at->format('d M, Y'),
        ];
    }
}
