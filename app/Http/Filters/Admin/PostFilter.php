<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\Admin\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PostFilter extends AbstractFilter
{


    public $filterable = [ 'search' ];

	public $sortable = ['id', 'title', 'author', 'category', 'created_at', 'updated_at'];


    /**
     * @param string $user
     */
    public function authorSortFilter($value)
    {
        $this->builder->with("user")->join("users","posts.user_id","=","users.id")->orderBy("users.name",$value);
        // $this->builder->with(['user' => function ($query) use ($value) {
        //     $query->orderBy('name', $value);
        // }]);
        //dd($d);

    }

    public function categorySortFilter($value)
    {
        $this->builder->with("category")->join("categories","posts.category_id","=","categories.id")->orderBy("categories.title",$value);
        // $this->builder->with(['category' => function ($query) use ($value) {
        //     $query->orderBy('title', $value);
        // }]);
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
