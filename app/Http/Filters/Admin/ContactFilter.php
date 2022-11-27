<?php

namespace App\Http\Filters\Admin;

use App\Http\Filters\AbstractFilter;

class ContactFilter extends AbstractFilter
{


    public $filterable = [ 'id' => "id", 'name'=>"name", 'email'=>"email",'subject'=>"subject"];

	public $sortable = ['id', 'name', 'email', 'created_at', 'updated_at'];



    public function searchFilter($value)
    {
        $this->builder->where("id","LIKE","%".$value."%")->orWhere("name","LIKE","%".$value."%")->orWhere("email","LIKE","%".$value."%")->orWhere("subject","LIKE","%".$value."%");
    }

}
