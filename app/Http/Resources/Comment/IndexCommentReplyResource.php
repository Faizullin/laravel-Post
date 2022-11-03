<?php

namespace App\Http\Resources\Comment;

use App\Http\Resources\User\UserMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexCommentReplyResource extends JsonResource
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
            "parent" => $this->parent ? [
                "id" => $this->parent_id,
                "author" => new UserMinResource($this->parent->user),
            ] : null,
            "replies" => IndexCommentReplyResource::collection($this->replies),
        ];
    }
}
