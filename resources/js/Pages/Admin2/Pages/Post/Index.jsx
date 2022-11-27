import React from 'react';
import Base from '../../Layouts/Base';
import { Head } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/Auth/PrimaryButton';

import CreateModal from '@/Pages/Admin/Components/CreateModal';

export default function Index(props) {
    return (
        <Base
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-5">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex bg-gray-800 justify-between items=center p-5">
                            <div className="flex space-x-2 items-center text-white">
                                Post Settings Page! Here you can list, create, update or delete post!
                            </div>
                            { (props.can.create) ?
                                <div className="flex space-x-2 items-center">
                                    <CreateModal>
                                        <button href={route('admin.post.create')} className="px-4 py-2 bg-green-500 uppercase text-white rounded focus:outline-none flex items-center"
                                            onClick={()=>{}}>
                                            <span className="iconify mr-1" data-icon="gridicons:create" data-inline="false"></span> Create Post
                                        </button>
                                    </CreateModal>
                                </div>
                            : "" }
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">Title</th>
                                    <th scope="col" className="py-3 px-6">Description</th>
                                    { (props.can.edit || props.can.delete) ?
                                        <th scope="col" className="py-3 px-6">Actions</th>
                                    : "" }
                                </tr>
                            </thead>
                            <tbody>
                                { props.posts.data.map((post,index)=>(
                                    <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td data-label="Title" className="tw-py-4 tw-px-6">
                                            { post.title }
                                        </td>
                                        <td data-label="Title" className="tw-py-4 tw-px-6">
                                            { post.description }
                                        </td>
                                        { (props.can.edit || props.can.delete) ?
                                            <td className="py-4 px-6 w-48"
                                            >
                                                <div type="tw-justify-start tw-lg:justify-end" no-wrap="true">
                                                    { props.can.edit ?
                                                        <PrimaryButton className="ml-4 bg-green-500 px-2 py-1 rounded text-white cursor-pointer">
                                                            Edit
                                                        </PrimaryButton>
                                                    : "" }
                                                    { props.can.delete ?
                                                        <PrimaryButton className="ml-4 bg-red-500 px-2 py-1 rounded text-white cursor-pointer">
                                                            Delete
                                                        </PrimaryButton>
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
        </Base>
    );
}
