<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\Post\IndexPostResource;
use App\Http\Resources\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexCommentDashboardResource extends JsonResource
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
            "message" => $this->message,
            "author" => new UserMinResource($this->user),
            "parent" => $this->parent_id ? [
                "id" => $this->parent_id,
                "author" => new UserMinResource($this->parent->user),
            ] : null,
            'commentable' => new IndexPostResource($this->post),
            'created_at' => $this->created_at->format('d M, Y'),
            'updated_at' => $this->updated_at->format('d M, Y'),
        ];
    }
}
