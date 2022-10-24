import { Link } from '@inertiajs/inertia-react';
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';
import GlobalFilter from '../../Components/Table/GlobalFilter';
import TheadTh from '../../Components/Table/TheadTh';
import Destroy from '../../Components/Table/DestroyModal';
import useDialog from '../../Hooks/useDialog';
import Pagination from '../../Components/Table/Pagination';
import useFilterable from '../../Hooks/useFilterable';


export default function Index(props) {
    const [sortAttrs,searchAttrs] = useFilterable(props.filters);

    const onDeleteConfirm = (deleteItem)=>{
        Inertia.delete(route('admin.post.destroy',deleteItem));
        deleteAttrs.setSt(false);
    }

    const [DestroyModal,deleteAttrs] = useDialog(Destroy,{
        title:"Delete item?",
    });
    const handleEditClick =(post) => {
        route('admin.post.edit',post)
    },
    handleCreateClick =() => {
        route('admin.post.create')
    },
    handleDestroyClick =(item) => {
        deleteAttrs.setItem(item);
        deleteAttrs.setSt(true);
    };


    return (
        <Layout LinkTitle="Post">
            <DestroyModal {...deleteAttrs} onConfirm={onDeleteConfirm}>
                Are you sure you want to delete this item?
            </DestroyModal>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Posts
                        </p>
                        <button
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            onClick={ handleCreateClick }>
                            Create New Post
                        </button>
                        <Link href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </Link>
                    </header>
                    <div className="card-content">
                        <div className='lg:w-full mb-3'>
                            <GlobalFilter {...searchAttrs} />
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <TheadTh {...sortAttrs} itemKey="id">Id</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="name">Title</TheadTh>
                                    <TheadTh>Logo Image</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="author">Author</TheadTh>
                                    <TheadTh >Description</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="category">Category</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="updated_at">Last Updated</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="created_at">Created</TheadTh>
                                    <TheadTh></TheadTh>
                                </tr>
                            </thead>
                            <tbody>
                            { props.posts.data.map((post,index) => (
                                    <tr key={post.id}>
                                        <td>{ post.id }</td>
                                        <td data-label="Name">{ post.name }</td>
                                        <td data-label="Logo Image">{ post.file_path }</td>
                                        <td data-label="Author">{ post.author.name }</td>
                                        <td data-label="Description">{ post.description }</td>
                                        <td data-label="Category">{ post.category }</td>
                                        <td data-label="Last Updated">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ post.updated_at }</small>
                                        </td>
                                        <td data-label="Created">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ post.created_at }</small>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(post.id) }>
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                    onClick={ (e) => handleDestroyClick(post.id) }>
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                        <Pagination items={props.posts}/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}