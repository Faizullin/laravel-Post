


const SORT_ASC = "asc"
const SORT_DESC = "desc"
const perPageList = [1,5,10,50];

export default TableLayout ({fetchUrls,EditModal,DeleteConfirmModal,}) {
	const {appliedFilters} = usePages().props

	const [data, setData] = useState([])

    const [perPage, setPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState(columns[0])
    const [sortOrder, setSortOrder] = useState("asc")
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    const [loading, setLoading] = useState(true)
    
    const handleSort = (column) => {
        if (column === sortColumn) {
            sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
        } else {
            setSortColumn(column)
            setSortOrder(SORT_ASC)
        }
    }
    const handleSearch = useRef(
        debounce((query) => {
            setSearch(query)
            setCurrentPage(1)
            setSortOrder(SORT_ASC)
            setSortColumn(columns[0])
        }, 500)
    ).current

    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    const fetchData = () => {
        setLoading(true);
        Inertia.get(fetchUrls.get || route(route().current()), {
            search,
            sort_field: sortColumn,
            sort_order: sortOrder,
            per_page: perPage,
            page: currentPage,
        }, {
            preserveState: true,
            replace: true,
            only:["posts"],
            onSuccess: response => {
                const items = response.props[wrap];
                setData(items.data)
                setPagination(items.meta)
                console.log("Response:",response)
	            setTimeout(() => {
	                setLoading(false)
	            }, 300)
            },
        });
    }

    useEffect(() => {
        fetchData();
    }, [perPage, sortColumn, sortOrder, search, currentPage])
    useEffect(() => {
        console.log("data",data)
    }, [data])

    

	// useEffect(function() {
	// 	setFilters(filters => ({
	// 		...filters,
	// 		...appliedFilters
	// 	}));
	// }, [])


    const handleEditClick = () => {
        // apiClient.get(fetchUrls.edit).then((response) => {
        //     const item = response.data[wrap];
        //     if (item) {
        //         NiceModal.show("edit-table-item-modal",{item})
        //     }
        // });
        Inertia.get(fetchUrls.edit,{},{
            preserveState: true,
            replace: true,
            only:["posts","activeForm"]
        });
    }
    const handleCreateClick = () => {
        NiceModal.show("edit-table-item-modal")
    }
    const handleDestroyClick = (item) => {
        NiceModal.show("deleteConfirm-table-item-modal",{
            onConfirm: () => Inertia.delete(fetctUrls.delete,item)
        })
    }

    return (
        <Layout>
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
                    	<div className="col-md-2">
		                    <div className="input-group">
		                        <label className="mt-2 me-2">Per page</label>
		                        <select className="form-select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
		                        	{ perPageList.map((perPageItem,index) => (
		                        		<option key={index} value={perPageItem}>{perPageItem}</option>
		                        	))}
		                        </select>
		                    </div>
		                </div>
                        <div className='lg:w-full mb-3'>
                            <GlobalFilter
                            	//value={search}
                            	onChange={handleSearch}/>
                        </div>
                        <table>
                            <thead>
                                // <tr>
                                //     <Table.Th itemKey="id" onClick={handleSort}>Id</Table.Th>
                                //     <Table.Th itemKey="title">Title</Table.Th>
                                //     <Table.Th itemKey="slug">Slug</Table.Th>
                                //     <Table.Th itemKey="posts_count">Posts Count</Table.Th>
                                //     <Table.Th itemKey="updated_at">Last Updated</Table.Th>
                                //     <Table.Th itemKey="created_at">Created</Table.Th>
                                //     <Table.Th></Table.Th>

                                // </tr>
                                <tr>
		                            { columns.map((column,index) => {
		                                return (
		                                    <th key={index} onClick={(e) => handleSort(column)}>
		                                        { column.label }
		                                        { column.name === sortColumn ? (
		                                            <span>
		                                                {sortOrder === SORT_ASC ? (
		                                                    <i className="ms-1 fa fa-arrow-up" aria-hidden="true"></i>
		                                                ) : (
		                                                    <i className="ms-1 fa fa-arrow-down" aria-hidden="true"></i>
		                                                )}
		                                            </span>
		                                        ) : null }
		                                    </th>
		                                )
		                            }) }
		                            <th>Actions</th>
		                        </tr>
                            </thead>
                            <tbody>
	                            {data.length === 0 ? (
		                            <tr>
		                                <td colSpan={columns.length}>No items found</td>
		                            </tr>
		                        ) : (
		                            ""
		                        )}

		                        {!loading ? (
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
		                                        			<small className="text-gray-500" title="Dec 30, 2021">{ tag.created_at }</small>
		                                        		);
		                                        	}
		                                        	return (
			                                        	<td key={index}>{d[column.name]}</td>
			                                        )
		                                        }) }
		                                    </tr>
		                                )
		                            })
		                            <td className="actions-cell">
                                        <div className="buttons right nowrap">
                                            <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(tag.id) }>
                                                <span className="icon"><i className="mdi mdi-eye"></i></span>
                                            </button>
                                            <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                onClick={ (e) => handleDestroyClick(tag.id) }>
                                                <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                            </button>
                                        </div>
                                    </td>
		                        ) : (
		                            <tr>
		                                <td colSpan={columns.length + 1}>
		                                    <div className="d-flex justify-content-center">
		                                        <div className="spinner-border" style={loaderStyle} role="status">
		                                            <span className="sr-only">Loading...</span>
		                                        </div>
		                                    </div>
		                                </td>
		                            </tr>
		                        )}
                            // { props.tags.data.map((tag,index) => (
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
                            // )}
                            </tbody>
                        </table>
                        { data.length > 0 && !loading ? (
			                <div className="mt-2">
			                    <Pagination
			                        pagination={pagination}
			                        pageChanged={(page) => setCurrentPage(page)}
			                        totalItems={data.length}
			                    />
			                </div>
			            ) : null}

                    </div>
                </div>
            </section>
        </Layout>
    )
}