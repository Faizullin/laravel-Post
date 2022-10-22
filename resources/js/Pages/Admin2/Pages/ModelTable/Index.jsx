import React from 'react';
import Base from '../../Layouts/Base';
import { Head } from '@inertiajs/inertia-react';
import { Button } from 'react-bootstrap';

import CreateModal from '@/Pages/Admin/Components/CreateModal';
import './style.scss';

export default function Index(props) {
    console.log(props)
    return (
        <Base
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 order-lg-2 order-xl-1">
                        <div className="card">
                            <div className="d-flex card-header justify-content-between align-items-center">
                                <h4 className="header-title">Top Selling Products</h4>
                                <div className='d-flex justify-space-between align-items-center'>
                                    { (props.can.create) ?
                                        <CreateModal>
                                            <button href={route('admin.post.create')} className="px-4 py-2 btn-info me-5 text-white rounded-pill m-add-btn"
                                                onClick={()=>{}}>
                                                <span className="iconify mr-1" data-icon="gridicons:create" data-inline="false"></span> Create Post
                                            </button>
                                        </CreateModal>
                                    : "" }
                                    <a href="#" className="btn btn-sm btn-light">Export <i className="mdi mdi-download ms-1"></i></a>
                                </div>
                            </div>

                            <div className="card-body pt-0">
                                <div className="table-responsive">
                                    <table className="table table-centered table-nowrap table-hover mb-0">
                                        <thead>
                                            <tr>
                                                { Object.entries(props.table.columns).map( ([key, value],index) =>
                                                    ( value.canSee ) ?
                                                        <th key={index} scope="col" className="py-3 px-6">{ value.label }</th>
                                                    : ""
                                                )}
                                                { (props.can.edit || props.can.delete) ?
                                                    <th scope="col" className="py-3 px-6">Actions</th>
                                                : "" }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { props.items.data.map((item,index)=>(
                                                <tr key={item.id}>
                                                    { Object.entries(props.table.columns).map( ([key, value],index) =>
                                                        ( value.canSee ) ?
                                                            <td key={item.id+key} data-label={key} scope="col" className="py-3 px-6">
                                                                <h5 className="font-14 my-1 fw-normal">{ item[key] }</h5>
                                                            </td>
                                                        : ""
                                                    )}
                                                    { (props.can.edit || props.can.delete) ?
                                                        <td className="py-4 px-6 w-48"
                                                        >
                                                            <div type="tw-justify-start tw-lg:justify-end" no-wrap="true">
                                                                { props.can.edit ?
                                                                    <Button className="ml-4 bg-green-500 px-2 py-1 rounded text-white cursor-pointer"
                                                                        onClick={(event)=>{}}>
                                                                        Edit
                                                                    </Button>
                                                                : "" }
                                                                { props.can.delete ?
                                                                    <Button className="ml-4 bg-red-500 px-2 py-1 rounded text-white cursor-pointer m-delete-btn"
                                                                        onClick={(event)=>{}}>
                                                                        Delete
                                                                    </Button>
                                                                : "" }
                                                            </div>
                                                        </td>
                                                    : "" }
                                                </tr>
                                            ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
        </Base>
    );
}
