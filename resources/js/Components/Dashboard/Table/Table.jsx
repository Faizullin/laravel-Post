import { Inertia } from "@inertiajs/inertia"
import { debounce } from "lodash"
import { useRef, useState, useEffect } from "react"
import Pagination from "./Pagination"

const SORT_ASC = "asc"
const SORT_DESC = "desc"

const Table = ({ columns, fetchUrl, wrap }) => {
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

    const loaderStyle = { width: "4rem", height: "4rem" }
    const fetchData = () => {
        setLoading(true);
        Inertia.get(fetchUrl || route(route().current()), {
            filter:{
                search
            },
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
                setLoading(false)
            },
        });
        // Inertia.get(fetchUrl, { params }).then(response => {
        //     setData(response.data.data)
        //     setPagination(response.data.meta)
        //     setTimeout(() => {
        //         setLoading(false)
        //     }, 300)
        // })

    }
    useEffect(() => {
        fetchData();
    }, [perPage, sortColumn, sortOrder, search, currentPage])
    useEffect(() => {
        console.log("data",data)
    }, [data])
    return (
        <div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <div className="input-group">
                        <input
                            className="form-control"
                            placeholder="Search..."
                            type="search"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="input-group">
                        <label className="mt-2 me-2">Per page</label>
                        <select className="form-select" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="tableFixHead">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th key={column} onClick={(e) => handleSort(column)}>
                                        {column.toUpperCase().replace("_", " ")}
                                        {column === sortColumn ? (
                                            <span>
                                                {sortOrder === SORT_ASC ? (
                                                    <i className="ms-1 fa fa-arrow-up" aria-hidden="true"></i>
                                                ) : (
                                                    <i className="ms-1 fa fa-arrow-down" aria-hidden="true"></i>
                                                )}
                                            </span>
                                        ) : null}
                                    </th>
                                )
                            })}
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
                            data.map((d, index) => {
                                return (
                                    <tr key={index}>
                                        {columns.map((column) => {
                                            return <td key={column}>{d[column]}</td>
                                        })}
                                    </tr>
                                )
                            })
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
                    </tbody>
                </table>
            </div>
            {data.length > 0 && !loading ? (
                <div className="mt-2">
                    <Pagination
                        pagination={pagination}
                        pageChanged={(page) => setCurrentPage(page)}
                        totalItems={data.length}
                    />
                </div>
            ) : null}
        </div>
    )
}


export default Table;
