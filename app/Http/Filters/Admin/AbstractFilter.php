<?php

namespace App\Http\Filters\Admin;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

abstract class AbstractFilter
{
    /**
     * @var Request
     */
    protected $request;

    /**
     * @var Builder
     */
    protected $builder;



    protected $acceptedFilters = [];

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * @param Builder $builder
     */
    public function apply(Builder $builder)
    {
        $this->builder = $builder;
        $fields = $this->fields();
        $this->acceptedFilters = $fields;
        if(array_key_exists("filter",$fields)){
            foreach ($fields["filter"] as $field => $value) {
                if (method_exists($this, Str::camel($field).'Filter')) {
                    call_user_func_array([$this, Str::camel($field).'Filter'],[ $value]);
                } elseif(in_array($field,$this->filterable)) {
                    $this->basicFilter($field,$value);
                }
            }
        }
        if(array_key_exists("sort",$fields)){
            $field = $fields["sort"];
            $direction="ASC";
            if(Str::startsWith($field,"-")){
                $field = Str::substr($field,1);
                $direction="DESC";
            }
            if(!empty($field)){
                if(method_exists($this, Str::camel($field).'Sort')){
                    call_user_func_array([$this, Str::camel($field).'Sort'],[$direction]);
                } elseif (in_array($field,$this->sortable)) {
                    $this->basicSort($field,$direction);
                }
            }
        }
    }

    /**
     * @return array
     */

    public function getFilters()
    {
        return $this->acceptedFilters;
    }

    protected function fields(): array
    {
        $r = $this->request->only(['sort','filter']);
        $res = [];

        if(array_key_exists("filter",$r) && $r["filter"]){
            if(is_array($r["filter"]) || is_object($r["filter"])){
                $res['filter'] = array_filter(
                    array_map('trim', $r['filter']),
                );
            }
        }
        $res = array_merge($res,array_filter(
            array_map('trim', Arr::except($r,'filter'))
        ));

        return $res;
    }


    public function basicSort($column,$direction)
    {
        $this->builder->orderBy($column,$direction);
    }


    public function basicFilter($column,$value)
    {
        $this->builder->where($column,"LIKE","%".$value."%");
    }


    public function configPagination($label='page')
    {
        // if(array_key_exists($label,$this->acceptedFilters) && array_key_exists('filter',$this->acceptedFilters)){
        //     if($length < $this->acceptedFilters[$label]){
        //         unset($this->acceptedFilters[$label]);
        //     }
        // }
        return $this;
    }
}
