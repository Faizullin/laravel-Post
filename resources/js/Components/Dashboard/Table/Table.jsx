import { useModal } from "@ebay/nice-modal-react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import Pagination from "./Pagination";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { FaEye, FaTrash  } from 'react-icons/fa'

const SORT_ASC = "asc"
const SORT_DESC = "desc"
const perPageList = [1,10,20,50];

export default function Table ({fetchUrls,DeleteConfirmModal,columns,wrap,items,breadcrumbLinks,title,titlePlural}) {
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
        setLoading(false);
    },[])

    return (
        <>
            <DeleteConfirmModal id="deleteConfirm-table-item-modal"/>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            { titlePlural || "" }
                        </p>
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
                                                            <span className="icon">
                                                                <FaEye />
                                                            </span>
                                                        </Link>
                                                        <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                            onClick={ (e) => handleDestroyClick(d.id) }>
                                                            <span className="icon">
                                                                <FaTrash />
                                                            </span>
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


                        { data.length > 0 && !loading ? (
			                <div className="mt-2">
			                    <Pagination
			                        items={items}
			                        onChange={(page) => setCurrentPage(page)}
			                    />
			                </div>
			            ) : null}

                    </div>
                </div>
            </section>
        </>
    )
}
