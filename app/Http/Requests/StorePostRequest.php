<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
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
        return [
            'title'=>['required','string','min:3','max:150','unique:posts,title'],
            'description'=>['required','string','max:255'],
            'body'=>['required','string'],
            'category'=>['required','integer','exists:categories,id'],
            'user'=>['required','integer','exists:users,id'],
            'tags'=>['nullable','array'],
            'tag.*'=>['integer','exists:tags,id'],
            'image_path'=>['nullable','image','mimes:jpeg,jpg,png,gif,svg','max:2048'],
        ];
    }
}
