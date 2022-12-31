import { useModal } from "@ebay/nice-modal-react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Pagination from "./Pagination";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const SORT_ASC = "asc"
const SORT_DESC = "desc"
const perPageList = [1,10,20,50];

export default function Table ({fetchUrls,DeleteConfirmModal,columns,wrap,items,breadcrumbLinks,title}) {
	const {appliedFilters} = usePage().props
    const {data} = items

    const [perPage, setPerPage] = useState(appliedFilters.per_page || perPageList[0])
    const [sortColumn, setSortColumn] = useState(appliedFilters.sort_field || columns[0].name)
    const [sortOrder, setSortOrder] = useState(appliedFilters.sort_order || "asc")
    const [currentPage, setCurrentPage] = useState(1)

    const [loading, setLoading] = useState(true)

    const delete_modal = useModal("deleteConfirm-table-item-modal")

    const handleSort = (column) => {
        if (column.name === sortColumn) {
            sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
        } else {
            setSortColumn(column.name)
            setSortOrder(SORT_ASC)
        }
    }

    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    const fetchData = () => {
        const params = {
            sort_field: sortColumn,
            sort_order: sortOrder,
            per_page: perPage,
            page: currentPage,
        }
        setLoading(true);
        Inertia.get(fetchUrls.get || route(route().current()), params, {
            preserveState: true,
            replace: true,
            onSuccess: response => {
	            setTimeout(() => {
	                setLoading(false)
	            }, 300)
            },
        });
    }


    const handleDestroyClick = (item_id) => {
        delete_modal.show({
            onConfirm: () => {
                Inertia.delete(fetchUrls.delete(item_id),{
                    onSuccess: () => delete_modal.hide()
                });
            }
        })
    }

    useDidUpdateEffect(() => {
        fetchData();
    }, [perPage, sortColumn, sortOrder, currentPage])

    useEffect(function() {
        console.log(appliedFilters)
        setLoading(false);
    },[])

    return (
        <>
            <DeleteConfirmModal id="deleteConfirm-table-item-modal"/>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Tags
                        </p>
                        <Link
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            href={fetchUrls.create}>
                            Create New {title}
                        </Link>
                        <Link href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </Link>
                    </header>
                    <div className="card-content">
                    	<div className="lg:w-full mt-3">
                            <label className="m-2">Per page</label>
                            <select className="form-select"
                                value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                                { perPageList.map((perPageItem,index) => (
                                    <option key={index} value={perPageItem}>{perPageItem}</option>
                                ))}
                            </select>
		                </div>
                        <table>
                            <thead>
                                <tr>
		                            { columns.map((column,index) => {
		                                return (
		                                    <th key={index}>
                                                <span className="flex items-center">
                                                    { column.label }
                                                    { column.sortable ?
                                                        column.name === sortColumn ? (

                                                                sortOrder === SORT_ASC ? (
                                                                    <ChevronDownIcon className="ms-1 w-6 h-6"
                                                                        onClick={(e) => handleSort(column)}/>
                                                                ) : (
                                                                    <ChevronUpIcon className="ms-1 w-6 h-6"
                                                                        onClick={(e) => handleSort(column)}/>
                                                                )

                                                        ) : (
                                                            <ChevronDownIcon className="ms-1 w-6 h-6"
                                                                onClick={(e) => handleSort(column)}/>
                                                        )
                                                    : ""}
                                                 </span>
		                                    </th>
		                                )
		                            }) }
		                            <th>Actions</th>
		                        </tr>
                            </thead>
                            <tbody>
                                { data.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length}>No items found</td>
                                    </tr>
                                ) : (
                                    ""
                                )}

                                { (!loading) ?
                                    data.map((d, indexCol) => {
                                        return (
                                            <tr key={`tr-${indexCol}`}>

                                                { columns.map((column,index) => {
                                                    if (column.render) {
                                                        return (
                                                            <column.render key={index} item={d}/>
                                                         )
                                                     } else if (column.type === "time") {
                                                         return (
                                                            <td key={index}>
                                                                <small className="text-gray-500" title="Dec 30, 2021">{ d[column.name] }</small>
                                                            </td>
                                                         );
                                                     }
                                                     return (
                                                        <td key={index}>{d[column.name]}</td>
                                                     )
                                                }) }
                                                <td className="actions-cell">
                                                    <div className="buttons right nowrap">
                                                        <Link className="button small blue --jb-modal"  data-target="sample-modal-2" type="button"
                                                            href={fetchUrls.edit(d.id)}>
                                                            <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                        </Link>
                                                        <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                            onClick={ (e) => handleDestroyClick(d.id) }>
                                                            <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    } )
                                 : (
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) }
                            </tbody>
                        </table>

                        {/* <style>
                        html,
                        body {
                            height: 100%;
                        }

                        @media (min-width: 640px) {
                            table {
                            display: inline-table !important;
                            }

                            thead tr:not(:first-child) {
                            display: none;
                            }
                        }

                        td:not(:last-child) {
                            border-bottom: 0;
                        }

                        th:not(:last-child) {
                            border-bottom: 2px solid rgba(0, 0, 0, .1);
                        }
                        </style> */}

                        { data.length > 0 && !loading ? (
			                <div className="mt-2">
			                    <Pagination
			                        items={items}
			                        onChange={(page) => setCurrentPage(page)}
			                        // totalItems={data.length}
			                    />
			                </div>
			            ) : null}

                    </div>
                </div>
            </section>
        </>
    )
}
