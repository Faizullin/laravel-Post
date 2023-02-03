<?php

namespace App\Http\Filters\Api\v1;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class PostFilter extends AbstractFilter
{
	public $sortable = [ "most_liked", "most_recent",'most_old'];
	public $filterable = [ "tag", "category"];

    public function beforeApply()
    {
        $this->appliedFilters['per_page'] = 6;
    }

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

    protected function categoryFilter($value)
    {
        $this->builder->whereHas('category', function ($query) use ($value) {
            $query->where('slug', $value);
        });
    }

    protected function tagFilter($values)
    {
        //dd($values);
        foreach ($values as $tag) {
            $this->builder->whereHas('tags', function ($query) use ($tag) {
                $query->where('slug', $tag);
            });
        }
    }
}
