<?php

namespace App\Http\Resources\Admin\User;

use App\Http\Resources\Admin\Role\RoleMinResource;
use Illuminate\Http\Resources\Json\JsonResource;

class EditUserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'posts_count' => $this->posts()->count(),
            'roles' => RoleMinResource::collection($this->roles),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
