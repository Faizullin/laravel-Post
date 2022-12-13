<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\Admin\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PermissionFilter extends AbstractFilter
{


    public $filterable = [ 'id' => "id", 'name'=>"name", 'guard_name'=>"guard_name","user_id"=>"user"];

	public $sortable = ['id', 'name', 'guard_name', 'created_at', 'updated_at'];


    /**
     * @param string $user
     */
    public function userFilter($value)
    {
        $this->builder->whereHas("users",function (Builder $query) use ($value) {
            $query->where('name', 'like', "%$value%");
        });
    }

    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("name","LIKE","%".$value."%")->orWhere("guard_name","LIKE","%".$value."%");
    }

}
