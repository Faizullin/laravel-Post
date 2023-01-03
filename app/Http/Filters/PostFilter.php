<?php

namespace App\Http\Filters;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class PostFilter extends AbstractFilter
{


    public $filterable = ['search'];

	public $sortable = [ "most_liked", "most_recent",'most_old'];


    public function mostRecentSortFilter()
    {
        $this->builder->latest();
    }

    public function mostOldSortFilter()
    {
        $this->builder->oldest();
    }

    public function mostLikedSortFilter()
    {

        $this->builder->withCount('likers')->orderBy("likers_count","DESC");
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


    protected function sortQuery()
    {
        $column = $this->input['sorts']['column'];
        if ($column && in_array($column,$this->sortable) && method_exists($this, Str::camel($column).'SortFilter')) {
            call_user_func_array([$this, Str::camel($column).'SortFilter'],[]);
            $this->appliedFilters['sorts']['column'] = $column;
        }

    }
}
