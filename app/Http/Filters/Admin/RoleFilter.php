<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\Admin\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class RoleFilter extends AbstractFilter
{


    public $filterable = ['search' ];

	public $sortable = ['id', 'name', 'guard_name', 'created_at', 'updated_at'];

    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("name","LIKE","%".$value."%")->orWhere("guard_name","LIKE","%".$value."%");
    }

}
