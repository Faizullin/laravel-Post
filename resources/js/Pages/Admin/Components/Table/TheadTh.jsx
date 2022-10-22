import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";


export default function TheadTh({children,setSortItem,itemKey,className}){
    const [sortableType,setSortableType] = useState("basic");
    const { filters } = usePage().props;
    const handleClick = (e) => {
        e.preventDefault();
        setSortItem((sortableType == "down") ? "-"+itemKey : itemKey);
        if(sortableType == "down"){
            setSortableType("up");
        } else {
            setSortableType("down");
        }
    }

    return (
        <>
            { setSortItem ?
                <th className={`${className}`}>{/* scope="col" */}
                    <div className="flex items-center">
                        { children }
                        <a href="#" onClick={handleClick}>
                            <svg className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                                {/* { (sortableType == "down") ?
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    : (sortableType == "up") ?

                                        <path d="M4.5 15.75l7.5-7.5 7.5 7.5" />

                                        : <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                                } */}
                                <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                            </svg>
                        </a>
                    </div>
                </th>
            :
                <th className={` ${className}`}>
                    { children }
                </th>
            }
        </>
    );
}
