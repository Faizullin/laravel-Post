import { Link } from "@inertiajs/inertia-react";



export default function Pagination({items,pageCount,onPaginate}){
    pageCount = pageCount ? pageCount : 1;
    const pageLimit = 2;
    const handleClick = (e,link) => {
        e.preventDefault()
        if(link.url){
            onPaginate(link.label)
        }

    }
    return (
        (items.meta?.last_page > 1) ? (
            <div className="blog-pagination mb-4">
                <ul className="mt-8">
                    {
                        items.links.prev === null ? (
                            <li>
                                <a>{"<"}</a>
                            </li>
                        ) : (
                            <li>
                                <a onClick={ (e) => handleClick(e,{url:true,label:items.meta.current_page-1}) }
                                    >
                                    {"<"}
                                </a>
                            </li>
                        )
                    }
                    { items.meta.links.map((item, index) => (
                            (index > 0 && index < items.meta.links.length-1) ? Number(item.label) ? (
                                <li key={index} className={`${item.active ? "active" : ""}`}>
                                    <a onClick={ (e) => handleClick(e,item) }>
                                        {item.label}
                                    </a>
                                </li>
                            ) : (
                                <div key={index}>
                                    <div className="px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                    >...</div>
                                </div>
                            ) : ""
                    ))}
                    {
                        items.links.next === null ? (
                            <li>
                                <a>{">"}</a>
                            </li>
                        ) : (
                            <li>
                                <a onClick={ (e) => handleClick(e,{url:true,label:items.meta.current_page+1}) }>
                                    {">"}
                                </a>
                            </li>
                        )
                    }

                </ul>
            </div>
        ) : (
            <div className="mb-16"></div>
        )
    );
}
