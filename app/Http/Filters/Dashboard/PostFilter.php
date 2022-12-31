<?php

namespace App\Http\Filters\Dashboard;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

class PostFilter extends AbstractFilter
{
    public $filterable = [];

	public $sortable = [ 'id',"likes_count",'title','category', "created_at",'updated_at'];



    public function likesCountSortFilter($direction)
    {
        $this->builder->withCount('likes')->orderBy("likes_count",$direction);
    }

    public function categorySortFilter($direction)
    {
        $this->builder->with(['category' => function ($query) use ($direction) {
            $query->orderBy('title',$direction);
        }]);

    }
}
