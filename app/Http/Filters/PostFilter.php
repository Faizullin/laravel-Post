<?php

namespace App\Http\Filters;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PostFilter extends AbstractFilter
{


    public $filterable = [  'title'=>"title", 'description'=>'description'];

	public $sortable = [ "most_liked", "most_recent"];


    /**
     * @param string $user
     */
    public function mostRecentSort($value)
    {
        $this->builder->orderBy("updated_at","DESC");
    }
    
     public function mostLikedSort($value)
    {
        $this->builder->orderBy("likes_count","DESC");
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
