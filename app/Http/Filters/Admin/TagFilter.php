<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\AbstractFilter;
use Illuminate\Support\Str;

class TagFilter extends AbstractFilter
{


    public $filterable = [ 'search' => "search"];

	public $sortable = ['id', 'title', 'slug','created_at', 'updated_at'];


    public function postsCountFilter($value)
    {
        $this->builder->withCount('posts')->orderBy('posts_count', $value);
    }

    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("title","LIKE","%".$value."%")->orWhere("slug","LIKE","%".$value."%");
    }
    public function sortFieldFilter($value)
    {
        if (array_key_exists('sort_order',$this->input) && in_array($this->input['sort_order'],["asc","desc"])) {
            if (method_exists($this, Str::camel($value).'Filter')) {
                call_user_func_array([$this, Str::camel($value).'Filter'],[ $this->input['sort_order']]);
            } elseif (in_array($value,$this->sortable)) {
                $this->builder->orderBy($value, $this->input['sort_order']);
            }
        }
    }
}
