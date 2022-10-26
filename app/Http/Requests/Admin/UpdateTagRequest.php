<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class UpdateTagRequest extends FormRequest
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
        if($this->has('slug')){
            $this->merge([
                'slug' => is_null($this->input('slug')) ? Str::slug($this->input('title')) : Str::slug($this->input('slug')),
            ]);
        }
        return [
            'title'=>['required','string','min:2','max:50','unique:tags,title,'.$this->id],
            'slug' =>['required','string','min:2','max:50','unique:tags,slug,'.$this->id],
        ];
    }
}
