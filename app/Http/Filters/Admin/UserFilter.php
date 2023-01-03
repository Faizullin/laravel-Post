<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\Admin\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class UserFilter extends AbstractFilter
{


    public $filterable = [ 'search' ];

	public $sortable = ['id', 'name', 'email', 'created_at', 'updated_at'];



    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("name","LIKE","%".$value."%")->orWhere("email","LIKE","%".$value."%");
    }

    public function postsCountSortFilter($value)
    {
        $this->builder->withCount('posts')->orderBy('posts_count', $value);
    }
}
