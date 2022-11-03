import { Link } from "@inertiajs/inertia-react";



export default function Pagination({items,pageCount,onPaginate}){
    pageCount = pageCount ? pageCount : 2;
    const pageLimit = 2;
    const handleClick = (e,link) => {
        e.preventDefault()
        if(link.url){
            onPaginate(link.label)
        }

    }
    function getClassName(active) {

        if(active) {

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary text-white bg-green-basic";

        } else{

            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded focus:border-primary focus:text-primary hover:bg-green-basic hover:text-white";

        }

    }
    return (
        (items.meta?.links.length > pageCount) && (
            <div className="table-pagination mb-4">
                <div className="flex mt-8">
                    {
                        items.links.prev === null ? (
                            <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                {"<"}
                            </div>
                        ) : (
                            <a onClick={ (e) => handleClick(e,{url:true,label:items.meta.current_page-1}) }
                                className={getClassName(false)}
                                >
                                {"<"}
                            </a>
                        )
                    }
                    { items.meta.links.map((item, key) => (
                            Number(item.label) ? ( items.meta.current_page!=items.meta.last_page-pageLimit && items.meta.current_page!=(pageLimit+1) && ((items.meta.current_page-item.label == pageLimit) || (items.meta.current_page-item.label === -pageLimit)) ? (
                                <div key={key}
                                    className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
                                    >...</div>
                            ) : (
                                <a onClick={ (e) => handleClick(e,item) }
                                    key={key}
                                    className={getClassName(item.active)}
                                        >{item.label}</a>
                            ))
                            : ""
                            // <template v-if="(link.label === 1) || (link.label === pagination.last_page) || (pagination.current_page-link.label <2 && pagination.current_page-link.label > - 2)">
                            //     <a :class="pagination.current_page === link.label ? 'active':''"
                            //         @click.prevent="getProducts(link.label)"
                            //         href="#0" >{{ link.label }}
                            //     </a>
                            // </template>
                            // <template v-if="pagination.current_page!==pagination.last_page-2 && pagination.current_page!==3 && ((pagination.current_page-link.label === 2) || (pagination.current_page-link.label === -2))">
                            //     <a>...</a>
                            // </template>

                    ))}
                    {
                        items.links.next === null ? (
                            <div className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                                {">"}
                            </div>
                        ) : (
                            <a onClick={ (e) => handleClick(e,{url:true,label:items.meta.current_page+1}) }
                                className={getClassName(false)}>
                                {">"}
                            </a>
                        )
                    }

                </div>
            </div>
        )
    );
}
