<?php

namespace App\Http\Filters\Dashboard;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class CommentFilter extends AbstractFilter
{


    public $filterable = [];

	public $sortable = [ 'id', "user", "created_at",'updated_at'];


    public function userSortFilter($value)
    {
        $this->builder->orderBy("updated_at","DESC");
    }
}
