<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

use function PHPSTORM_META\type;

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
        $image_path_string = False;
        if($this->has('image_path') && $this->input('image_path')){
            if(is_string($this->input('image_path'))){
                $image_path_string = True;
                $this->request->remove('image_path');
            }
        }
        return [
            'title'=>['required','string','max:255','min:3','unique:posts,title,'.$this->id],
            'description'=>['required','string','max:255'],
            'body'=>['required','string'],
            'category'=>['required','integer','exists:categories,id'],
            'user'=>['required','integer','exists:users,id'],
            'tags'=>['nullable','array'],
            'tags.*'=>['integer','exists:tags,id'],
            'image_path'=> ['nullable','image','mimes:jpeg,jpg,png,gif,svg','max:2048'],
        ];
    }
}
