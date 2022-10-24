import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import useDidMountEffect from "./useDidMountEffect";

export default function useFilterable(filters:Object){
    const[sortItem,setSortItem] = useState("");
    const[searchItem,setSearchItem] = useState("");
    useDidMountEffect(function(){
        const query ={...filters};
        if(sortItem){
            query['sort'] = sortItem;
        }
        console.log(sortItem,query)
        getItems(query)
    },[sortItem]);
    useDidMountEffect(function(){
        const query ={...filters};
        query['filter'] = {search:searchItem,};
        console.log("search Effect",searchItem,query)
        getItems(query)
    },[searchItem]);

    const getItems = (query) => {
        Inertia.get(route(route().current()), query, {
            preserveState: true,
            replace: true,
        });
    }
    return [
        {setSortItem},
        {
            sortable:true,
            setSearchItem,
        }
    ];
}
