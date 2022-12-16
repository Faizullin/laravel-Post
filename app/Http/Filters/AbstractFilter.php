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
    protected $acceptedFilters = [];

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function apply(Builder $builder)
    {

        $this->builder = $builder;
        $fields = $this->fields();
        $this->acceptedFilters = $fields;
        $this->input = $fields;
        foreach ($fields as $name => $value) {
            if (method_exists($this, Str::camel($name).'Filter')) {
                call_user_func_array([$this, Str::camel($name).'Filter'],[ $value]);
            } elseif(in_array($name,$this->filterable)) {
                $this->basicFilter($name,$value);
            }
        }
        // foreach ($fields["filter"] as $field => $value) {
        //     if (method_exists($this, Str::camel($field).'Filter')) {
        //         call_user_func_array([$this, Str::camel($field).'Filter'],[ $value]);
        //     } elseif(in_array($field,$this->filterable)) {
        //         $this->basicFilter($field,$value);
        //     }
        // }
        // if(array_key_exists("sort",$fields) && $fields['sort']){
        //     $field = $fields["sort"];
        //     $direction="ASC";
        //     if(Str::startsWith($field,"-")){
        //         $field = Str::substr($field,1);
        //         $direction="DESC";
        //     }
        //     if(!empty($field)){
        //         if(method_exists($this, Str::camel($field).'Sort')){
        //             call_user_func_array([$this, Str::camel($field).'Sort'],[$direction]);
        //         } elseif (in_array($field,$this->sortable)) {
        //             $this->basicSort($field,$direction);
        //         }
        //     }
        // }
    }

    public function getFilters()
    {
        return $this->acceptedFilters;
    }

    protected function fields(): array
    {
        return $this->request->all();
        $r = $this->request->only(['sort']);
        $res = [];
        // dd($r, $this->request->except(['sort']),array_map('trim', $this->request->except(['sort'])),array_map('trim', Arr::except($r,'filter')));
        $res['filter'] = array_filter(
            array_map('trim', $this->request->except(['sort'])),
        );

        $res['sort'] = array_filter(
            array_map('trim', Arr::except($r,'filter'))
        );
        //dd($res);
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

}
