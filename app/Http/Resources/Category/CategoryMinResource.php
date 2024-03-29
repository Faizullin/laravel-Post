<?php

namespace App\Http\Resources\Category;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryMinResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $posts_count = 0;
        if($this->posts_count) {
            $posts_count = $this->posts_count;
        }
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug'  => $this->slug,
            'posts_count' => $posts_count,
        ];
    }
}
