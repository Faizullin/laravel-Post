import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";



export default function Pagination({items}){
    const current_page = items.meta.current_page;
    if(current_page < 1 || current_page > items.meta.last_page) {
        Inertia.get(items.links.first);
    }

    return (
        (items.meta?.links?.length > 1) && (
            <div className="blog-pagination">
                <ul className="justify-center">
                    {
                        items.links.prev === null  ? (
                            <li>
                                <a>
                                    {"<"}
                                </a>
                            </li>
                        ) : (
                            <li>
                                <Link href={items.links.prev}
                                    disabled={items.links.prev === null ? true : false}>
                                    {"<"}
                                </Link>
                            </li>
                        )
                    }
                    { (current_page > 2) && (
                        <li>
                            <Link href={items.links.first}>1</Link>
                        </li>
                    ) }
                    { (items.links.prev) && (
                        <li>
                            <Link href={items.links.prev}>{ current_page - 1 }</Link>
                        </li>
                    ) }

                    <li className="active">
                        <a>{current_page}</a>
                    </li>

                    { (items.links.next !== null) && (
                        <li>
                            <Link href={items.links.next}>{ current_page + 1 }</Link>
                        </li>
                    ) }
                    { (current_page + 1 < items.meta.last_page) && (
                        <li>
                            <Link href={items.links.last}>{ items.meta.last_page }</Link>
                        </li>
                    ) }
                    {
                        items.links.next === null ? (
                            <li>
                                <a className="text-gray-100">
                                    {">"}
                                </a>
                            </li>
                        ) : (
                            <li>
                                <Link href={items.links.next}
                                    disabled={items.links.next === null ? true : false}>
                                    {">"}
                                </Link>
                            </li>
                        )
                    }

                </ul>
            </div>
        )
    )
}
