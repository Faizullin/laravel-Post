import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ items,pageLimit,onChange }) {
    pageLimit = pageLimit ? pageLimit : 2
    function getClassName(active) {

        if(active) {

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";

        } else{

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";

        }

    }

    return (

        (items.meta.links.length > pageLimit) && (
            <div className="table-pagination mb-4">
                <div className="flex mt-8">
                    {/* {items.meta.links.map((item, key) => (

                            item.url === null ?

                                    (<div
                                        key={key}
                                            className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"

                                        >{item.label}</div>) :



                                    (<Link key={key}  type="button"
                                        disabled={item.url == null ? true : false}
                                        className={getClassName(item.active)}

                                        href={item.url || ''}

                                            >{item.label}</Link>)

                        ))}

                    </div> */}
                    <div className="buttons">
                        { items.links.prev === null  ? (
                                <span className="">
                                    {"<"}
                                </span>
                            ) : (
                                <Link href={items.links.prev} type="button"
                                    disabled={items.links.prev === null ? true : false} className={`button`}>
                                    {"<"}
                                </Link>
                            )
                        }
                        { items.meta.links.map((link, k) => {
                             return Number(link.label) ?
                                (items.meta.current_page!=items.meta.last_page-pageLimit && items.meta.current_page!=(pageLimit+1) && ((items.meta.current_page-link.label == pageLimit) || (items.meta.current_page-link.label === -pageLimit))) ? (
                                    <div key={k}
                                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                        >...</div>
                                ) : (
                                    <Link key={k} href={link.url || ''} type="button"
                                        disabled={link.url == null ? true : false} className={`${ link.active && 'active' }  ${link.url == null && ''} button`}>{link.label}</Link>
                                ) : ""
                        } ) }
                        { items.links.next === null ? (
                                <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                    {">"}
                                </div>
                            ) : (
                                <Link href={items.links.next} type="button"
                                    disabled={items.links.next === null ? true : false} className={`button`}>
                                    {">"}
                                </Link>
                            )
                        }
                    </div>
                    <small>Page { items.meta.current_page } of { items.meta.last_page }</small>
                </div>
            </div>

        )

    );

}
    {/* { items.meta.links.map((item, key) => (
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

    ))} */}
