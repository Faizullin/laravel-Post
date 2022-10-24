import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ items,pageCount }) {
    pageCount = pageCount ? pageCount : 2;
    function getClassName(active) {

        if(active) {

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";

        } else{

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";

        }

    }

    return (

        (items.meta.links.length > pageCount) && (
            <div className="table-pagination mb-4">
                <div className="flex mt-8">
                    {items.meta.links.map((item, key) => (

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

                </div>
                {/* <div className="table-pagination">
                        <div className="flex items-center justify-between">
                            <div className="buttons">
                                { props.roles.links.map((link, k) => (
                                    <Link key={k} href={link.url || ''} type="button"
                                        disabled={link.url == null ? true : false} className={`${ link.active && 'active' }  ${link.url == null && ''} button`}>{link.label}</Link>
                                ))}
                            </div>
                            <small>Page { props.roles.current_page } of { props.roles.last_page }</small>
                        </div>
                    </div> */}

            </div>

        )

    );

}
