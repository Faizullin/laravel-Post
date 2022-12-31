import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Inertia } from "@inertiajs/inertia";
import { Link, usePage } from "@inertiajs/inertia-react";
import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";
import GlobalFilter from "../Components/Table/GlobalFilter";
import apiClient from "../services/apiClient";
import Layout from "./Layout";
import Pagination from "../Components/Table/Pagination";
import Breadcrumb from "../Components/Dashboard/Breadcrumb";
import HeroBar from "../Components/Dashboard/HeroBar";

const SORT_ASC = "asc"
const SORT_DESC = "desc"
const perPageList = [1,10,20,50];

export default function TableModalLayout ({fetchUrls,CreateModal,EditModal,DeleteConfirmModal,columns,wrap,items,breadcrumbLinks,title}) {
	const {appliedFilters} = usePage().props
    const {data} = items

    const [editItem,setEditItem] = useState({})
    const [perPage, setPerPage] = useState(appliedFilters.per_page || perPageList[0])
    const [sortColumn, setSortColumn] = useState(appliedFilters.sorts?.column || columns[0].name)
    const [sortOrder, setSortOrder] = useState(appliedFilters.sorts?.order || "asc")
    const [search, setSearch] = useState(appliedFilters.filters?.search || "")
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
    const handleSearch = useRef(
        debounce((event) => {
            setSearch(event.target.value)
            setCurrentPage(1)
            setSortOrder(SORT_ASC)
            setSortColumn(columns[0].name)
        }, 500)
    ).current

    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    const fetchData = () => {
        const params = {
            filter:{
                search,
            },
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




    const handleEditClick = (item_id) => {
        apiClient.get(fetchUrls.edit(item_id)).then((response) => {
            const item = response.data[wrap];
            if (item) {
                setEditItem(item)
            }
        });
    }


    const handleCreateClick = () => {
        NiceModal.show("create-table-item-modal")
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
    }, [perPage, sortColumn, sortOrder, search, currentPage])

    useDidUpdateEffect(() => {
        if(editItem) {
            NiceModal.show("edit-table-item-modal")
        }
    }, [editItem]);
    useEffect(function() {
        setLoading(false);
    },[])

    return (
        <Layout>
            <CreateModal />
            <EditModal item={editItem} />
            <DeleteConfirmModal id="deleteConfirm-table-item-modal"/>
            <Breadcrumb links={breadcrumbLinks}/>
            <HeroBar title={title}/>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Tags
                        </p>
                        <button
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            onClick={ handleCreateClick }>
                            Create New Tag
                        </button>
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
                        <div className='lg:w-full my-3'>
                            <GlobalFilter
                            	value={search}
                            	onChange={handleSearch}/>
                        </div>
                        <table>
                            <thead>
                                <tr>
		                            { columns.map((column,index) => {
		                                return (
		                                    <th key={index}>
                                                <span className="flex items-center">
                                                    { column.label }
                                                    { column.name === sortColumn ? (

                                                            sortOrder === SORT_ASC ? (
                                                                <i className="ms-1 mdi mdi-chevron-down" aria-hidden="true"
                                                                onClick={(e) => handleSort(column)}></i>
                                                            ) : (
                                                                <i className="ms-1 mdi mdi-chevron-up" aria-hidden="true"
                                                                onClick={(e) => handleSort(column)}></i>
                                                            )

                                                    ) : (
                                                        <i className="ms-1 mdi mdi-chevron-down" aria-hidden="true"
                                                        onClick={(e) => handleSort(column)}></i>) }
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
                                                            <column.render key={index} />
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
                                                        <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(d.id) }>
                                                            <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                        </button>
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

                            {/* // { props.tags.data.map((tag,index) => (
                            //         <tr key={tag.id}>
                            //             <td>{ tag.id }</td>
                            //             <td data-label="Name">{ tag.title }</td>
                            //             <td data-label="Email">{ tag.slug }</td>
                            //             <td data-label="Posts Count">{ tag.posts_count }</td>
                            //             <td data-label="Last Updated">
                            //                 <small className="text-gray-500" title="Dec 30, 2021">{ tag.updated_at }</small>
                            //             </td>
                            //             <td data-label="Created">
                            //                 <small className="text-gray-500" title="Dec 30, 2021">{ tag.created_at }</small>
                            //             </td>
                            //             <td className="actions-cell">
                            //                 <div className="buttons right nowrap">
                            //                     <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(tag.id) }>
                            //                         <span className="icon"><i className="mdi mdi-eye"></i></span>
                            //                     </button>
                            //                     <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                            //                         onClick={ (e) => handleDestroyClick(tag.id) }>
                            //                         <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                            //                     </button>
                            //                 </div>
                            //             </td>
                            //         </tr>
                            //     )
                            // )} */}
                            </tbody>
                        </table>
                        { data.length > 0 && !loading ? (
			                <div className="mt-2">
			                    <Pagination
			                        items={items}
			                        onChange={(page) => setCurrentPage(page)}
			                        totalItems={data.length}
                                    //pageLimit={3}
			                    />
			                </div>
			            ) : null}

                    </div>
                </div>
            </section>
        </Layout>
    )
}
