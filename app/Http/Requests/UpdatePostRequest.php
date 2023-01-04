<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $image_rules = ['nullable','image','mimes:jpeg,jpg,png,gif,svg','max:2048'];
        if($this->image_path && is_string($this->image_path)) {
            $image_rules = [];
        }
        return [
            'title'=>['required','string','max:255','min:3','unique:posts,title,'.$this->post->id],
            'description'=>['required','string','max:255'],
            'body'=>['required','string'],
            'category'=>['required','integer','exists:categories,id'],
            'tags'=>['nullable','array'],
            'tags.*'=>['integer','exists:tags,id'],
            'image_path'=>$image_rules,
        ];
    }
}
