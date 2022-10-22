<?php

namespace App\Models\Traits;

use App\Http\Filters\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * @param Builder $builder
     * @param QueryFilter $filter
     */
    public function scopeFilter(Builder $builder, AbstractFilter $filter)
    {
        $filter->apply($builder);
    }
}
