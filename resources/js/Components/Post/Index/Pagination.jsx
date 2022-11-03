import { Link } from "@inertiajs/inertia-react";



export default function Pagination({items,pageCount}){
    pageCount = pageCount ? pageCount : 2;
    const pageLimit = 1;
    const getClassName = (item) => {
        if(item.active){
            return "active";
        }
        return ""
    }
    return (
        (items.meta?.links.length > pageCount) && (
            <div className="blog-pagination">
                <ul className="justify-center">
                    {
                        items.links.prev === null  ? (
                            <li>
                                <a className="">
                                    {"<"}
                                </a>
                            </li>
                        ) : (
                            <li>
                                <Link href={items.links.prev} type="button"
                                    disabled={items.links.prev === null ? true : false} className={`button`}>
                                    {"<"}
                                </Link>
                            </li>
                        )
                    }
                    { items.meta.links.map((item, key) => (
                            Number(item.label) ? ( items.meta.current_page!=items.meta.last_page-pageLimit && items.meta.current_page!=(pageLimit+1) && ((items.meta.current_page-item.label == pageLimit) || (items.meta.current_page-item.label === -pageLimit)) ? (
                                <div key={key}
                                    className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                    >...</div>
                            ) : (
                                // <a onClick={ (e) => handleClick(e,item) }
                                //     key={key}
                                //     className={getClassName(item.active)}
                                //         >{item.label}</a>

                                <li key={key}>
                                    <Link href={item.url || ''} type="button"
                                        disabled={item.url == null ? true : false} className={`${ item.active && 'active' }  ${item.url == null && ''} button`}>{item.label}</Link>
                                </li>
                            ))
                            : ""

                    ))}
                    {
                        items.links.next === null ? (
                            <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                {">"}
                            </div>
                        ) : (
                            <li>
                                <Link href={items.links.next} type="button"
                                    disabled={items.links.next === null ? true : false} className={`button`}>
                                    {">"}
                                </Link>
                            </li>
                        )
                    }

                </ul>
            </div>
        )
    );
}
