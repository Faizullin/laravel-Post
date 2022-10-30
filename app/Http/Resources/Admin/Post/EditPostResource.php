<?php

namespace App\Http\Resources\Admin\Post;

use App\Http\Resources\Admin\Category\CategoryMinResource;
use App\Http\Resources\Admin\Tag\TagMinResource;
use App\Http\Resources\Admin\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EditPostResource extends JsonResource
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
            'body'  => $this->body,
            'imageUrl' => $this->imageUrl,
            'author'   => $this->user ? new UserMinResource($this->user) : null,
            'category' => new CategoryMinResource($this->category),
            'tags' => TagMinResource::collection($this->tags),
            'created_at' => $this->create_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
