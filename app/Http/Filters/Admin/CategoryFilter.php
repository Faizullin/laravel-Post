<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\Admin\AbstractFilter;

class CategoryFilter extends AbstractFilter
{


    public $filterable = [ 'id' => "id", 'title'=>"title", 'slug'=>"slug"];

	public $sortable = ['id', 'title', 'slug', 'posts_count', 'created_at', 'updated_at'];


    public function postsCountSort($value)
    {
        $this->builder->withCount('posts')->orderBy('posts_count', $value);
    }

    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("title","LIKE","%".$value."%")->orWhere("slug","LIKE","%".$value."%");
    }

}
