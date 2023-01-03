<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

abstract class AbstractFilter
{
    protected $request;

    protected $builder;

    public $input = [];

    public $appliedFilters = [
        'per_page' => 1,
    ];

    public $filterable = [];
    public $sortable = [];

    /**
     * Filter constructor.
     *
     * @param Request|null $request
     */
    public function __construct(Request $request = null)
    {
        $this->request = $request ?? request();

        $this->input = [
            'filters' => $this->request->collect()->except(['sort_field','sort_order'])
                ->map(fn ($item) => $this->parseHttpValue($item))
                ->filter(fn ($item) => $item !== null),
            'sorts' => [
                'column' => $this->request->get('sort_field', ''),
                'order' => $this->request->get('sort_order', ''),
            ],
        ];
        foreach ($this->request->except(['filter','sort_field','sort_order']) as $column => $value) {
            if(array_key_exists($column,$this->appliedFilters)) {
                $this->appliedFilters[$column] = $value;
            }
        }
    }

        /**
     * @param string|null|array $query
     *
     * @return string|array|null
     */
    protected function parseHttpValue($query)
    {
        if (is_string($query)) {
            $item = explode(',', $query);
            //dd("Item",$item, $query);
            if (count($item) > 1) {
                return $item;
            }
        }

        return $query;
    }


    /**
     * @param Builder $builder
     */
    public function apply(Builder $builder)
    {
        $this->builder = $builder;
        $this->filterQuery();
        $this->sortQuery();
    }

    public function basicSortFilter($column,$direction)
    {
        $this->builder->orderBy($column,$direction);
    }

    public function basicFilter($column,$value)
    {
        $this->builder->where($column,"LIKE","%".$value."%");
    }

    protected function sortQuery()
    {
        $column = $this->input['sorts']['column'];
        $order = $this->input['sorts']['order'];
        if ($order && $column && in_array(strtolower($order),["asc","desc"])) {
            if(in_array($column,$this->sortable)) {
                if (method_exists($this, Str::camel($column).'SortFilter')) {
                    call_user_func_array([$this, Str::camel($column).'SortFilter'],[ $order]);
                    $this->appliedFilters['sorts']['order'] = $order;
                    $this->appliedFilters['sorts']['column'] = $column;
                } else {
                    $this->basicSortFilter($column, $order);
                    $this->appliedFilters['sorts']['order'] = $order;
                    $this->appliedFilters['sorts']['column'] = $column;
                }
            }
        }
    }

    protected function filterQuery()
    {
        $this->input['filters']->each(function ($value, $column) {
            if (is_string($column) && is_string($value)) {
                if(in_array($column,$this->filterable)) {
                    if (method_exists($this, Str::camel($column).'Filter')) {
                        call_user_func_array([$this, Str::camel($column).'Filter'],[ $value]);
                        $this->appliedFilters['filters'][$column] = $value;
                    } else {
                        $this->basicFilter($column,$value);
                        $this->appliedFilters['filters'][$column] = $value;
                    }
                }
            }
        });
    }
    public function getAppliedFilters()
    {
        return $this->appliedFilters;
    }

}
