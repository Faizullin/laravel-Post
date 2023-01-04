import { Link } from "@inertiajs/inertia-react";

export default function Pagination({ items,onChange }) {
    return (

        (items.meta.last_page > 1) && (
            <div className="table-pagination mb-4">
                <div className="flex justify-between flex-wrap mt-8">
                    <div className="buttons">
                        { items.links.prev === null  ? (
                                <a className="button">
                                    {"<"}
                                </a>
                            ) : (
                                <Link href={items.links.prev} type="button" className={`button`}>
                                    {"<"}
                                </Link>
                            )
                        }
                        { items.meta.links.map((item, index) => (
                            (index > 0 && index < items.meta.links.length-1) ? Number(item.label) ? (
                                <Link key={index} href={item.url || ''} type="button"
                                    disabled={item.url == null ? true : false} className={`${ item.active && 'active' } button`}>{item.label}</Link>
                            ) : (
                                <div key={index}>
                                    <div className="px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                    >...</div>
                                </div>
                            ) : ""
                        ))}
                        { items.links.next === null ? (
                                <a className="button">
                                    {">"}
                                </a>
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
