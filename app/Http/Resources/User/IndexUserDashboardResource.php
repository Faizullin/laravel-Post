<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class IndexUserDashboardResource extends JsonResource
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
            'current_address' => 'Nur Sultan, KZ, FunnyFous',
            'permanent_address' => 'Arlington Heights, IL, Illinois',
            'phone' => '+8 777054001',
            'name' => $this->name,
            'email' => $this->email,
            'gender' => 'Male',
            'imageUrl' =>$this->imageUrl,
            'created_at' => $this->created_at->format('d M, Y'),
            'updated_at' => $this->updated_at->format('d M, Y'),
        ];
    }
}
