<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Http\Resources\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

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
        return [
            "id" => $this->id,
            "title" => $this->title,
            "description"  => $this->description,
            "body"  => $this->body,
            "author"   => $this->user ? new UserMinResource($this->user) : null,
            "category" => new CategoryMinResource($this->category),
            "tags" => TagMinResource::collection($this->tags),
            "comments_count" => $this->comments_count,
            "imageUrl" => $this->imageUrl,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
