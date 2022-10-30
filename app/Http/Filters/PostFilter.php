<?php

namespace App\Http\Filters;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PostFilter extends AbstractFilter
{


    public $filterable = [ 'id' => "id", 'title'=>"title", "user_id"=>"author", 'description'=>'description'];

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
    public function authorSort($value)
    {
        $this->builder->with(['user' => function ($query) use ($value) {
            $query->orderBy('name', $value);
        }]);
    }



    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("title","LIKE","%".$value."%")->orWhere("description","LIKE","%".$value."%")
            ->orWhereHas("category",function (Builder $query) use ($value) {
                $query->where('title', 'like', "%$value%");
            })
            ->orWhereHas("user",function (Builder $query) use ($value) {
                $query->where('name', 'like', "%$value%");
            });
    }

}