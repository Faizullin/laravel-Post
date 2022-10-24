import { Link } from '@inertiajs/inertia-react';
import { useState, useEffect } from 'react'
import { Inertia } from '@inertiajs/inertia';
import Layout from '../../Layouts/Layout';
import GlobalFilter from '../../Components/Table/GlobalFilter';
import TheadTh from '../../Components/Table/TheadTh';
import Edit from './Edit';
import Create from './Create';
import Destroy from '../../Components/Table/DestroyModal';
import axios from 'axios';
import useDialog from '../../Hooks/useDialog';
import Pagination from '../../Components/Table/Pagination';
import useFilterable from '../../Hooks/useFilterable';


export default function Index(props) {
    const [sortAttrs,searchAttrs] = useFilterable(props.filters);

    const onDeleteConfirm = (deleteItem)=>{
        Inertia.delete(route('admin.user.destroy',deleteItem));
        deleteAttrs.setSt(false);
    }

    const [EditModal,editAttrs] = useDialog(Edit);
    const [CreateModal,createAttrs] = useDialog(Create);
    const [DestroyModal,deleteAttrs] = useDialog(Destroy,{
        title:"Delete item?",
    });
    const handleEditClick =(user) => {
        axios.get(route('admin.user.edit',{user})).then((response) => {
            editAttrs.setItem(response.data.user);
            editAttrs.setSt(true)
        });
    },
    handleCreateClick =() => {
        createAttrs.setSt(true);
    },
    handleDestroyClick =(item) => {
        deleteAttrs.setItem(item);
        deleteAttrs.setSt(true);
    };


    return (
        <Layout LinkTitle="User">
            <EditModal {...editAttrs}/>
            <CreateModal {...createAttrs}/>
            <DestroyModal {...deleteAttrs} onConfirm={onDeleteConfirm}>
                Are you sure you want to delete this item?
            </DestroyModal>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Users
                        </p>
                        <button
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            onClick={ handleCreateClick }>
                            Create New User
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
                                    <TheadTh {...sortAttrs} itemKey="id">
                                        Id
                                    </TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="name">Name</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="email">Email</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="posts_count">Posts Count</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="updated_at">Last Updated</TheadTh>
                                    <TheadTh {...sortAttrs} itemKey="created_at">Created</TheadTh>
                                    <TheadTh></TheadTh>
                                </tr>
                            </thead>
                            <tbody>
                            { props.users.data.map((user,index) => (
                                    <tr key={user.id}>
                                        <td>{ user.id }</td>
                                        <td data-label="Name">{ user.name }</td>
                                        <td data-label="Email">{ user.email }</td>
                                        <td data-label="Posts Count">{ user.posts_count }</td>
                                        <td data-label="Last Updated">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ user.updated_at }</small>
                                        </td>
                                        <td data-label="Created">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ user.created_at }</small>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(user.id) }>
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                    onClick={ (e) => handleDestroyClick(user.id) }>
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                        <Pagination items={props.users}/>
                        {/* <div className="table-pagination">
                            <div className="flex items-center justify-between">
                                <div className="buttons">
                                    { props.users.links.map((link, k) => (
                                        <Link key={k} href={link.url || ''} type="button"
                                            disabled={link.url == null ? true : false} className={`${ link.active && 'active' }  ${link.url == null && ''} button`}>{link.label}</Link>
                                    ))}
                                </div>
                                <small>Page { props.users.current_page } of { props.users.last_page }</small>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
