import { useState } from "react";

export function useError ({title,message}) {
    const [show,setShow] = useState(false)
    const errorHandle = (error) => {
        cosnole.log("Handle Error",error)
        setShow(true)
    }


    return [
        show,
        setShow,
        errorHandle,
    ]
}
