import { useState } from "react";

export default function useDialog(element,attrs:Object){
    const [st,setSt] = useState<boolean>(false);
    const [item,setItem] = useState<Object>({});
    return [
        element,
        {
            st,setSt,item,setItem,
            ...attrs,
        }
    ];
}
