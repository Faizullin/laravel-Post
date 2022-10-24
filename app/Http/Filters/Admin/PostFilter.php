<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PostFilter extends AbstractFilter
{


    public $filterable = [ 'id' => "id", 'title'=>"title", "user_id"=>"author", 'description'=>'description','category'=>'category'];

	public $sortable = ['id', 'title', 'author', 'category', 'created_at', 'updated_at'];


    /**
     * @param string $user
     */
    public function userFilter($value)
    {
        $this->builder->whereHas("users",function (Builder $query) use ($value) {
            $query->where('name', 'like', "%$value%");
        });
    }


    /**
     * @param string $user
     */
    public function authorSort()
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
