<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\Category\CategoryMinResource;
use App\Http\Resources\Tag\TagMinResource;
use App\Http\Resources\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexPostResource extends JsonResource
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
            'id' => $this->id,
            'title' => $this->title,
            'description'  => $this->description,
            'content'  => $this->content,
            'author'   => $this->user ? new UserMinResource($this->user) : null,
            'categories' => CategoryMinResource::collection($this->categories),
            'tags' => TagMinResource::collection($this->tags),
            'created_at' => $this->create_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
