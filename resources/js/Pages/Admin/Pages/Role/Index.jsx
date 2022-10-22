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
import useDidMountEffect from '../../Hooks/useDidMountEffect';


export default function Index(props) {
    const[sortItem,setSortItem] = useState("");
    const[searchItem,setSearchItem] = useState("");

    useDidMountEffect(function(){
        const query ={...props.filters};
        if(sortItem){
            query['sort'] = sortItem;
        }
        console.log(sortItem,query)
        getItems(query)
    },[sortItem]);
    useDidMountEffect(function(){
        const query ={...props.filters};
        query['filter'] = {search:searchItem,};
        console.log("search Effect",searchItem,query)
        getItems(query)
    },[searchItem]);

    const getItems = (query) => {
        Inertia.get(route(route().current()), query, {
            preserveState: true,
            replace: true,
        });
    }
    const onDeleteConfirm = (deleteItem)=>{
        Inertia.delete(route('admin.role.destroy',deleteItem));
        deleteAttrs.setSt(false);
    }

    const [EditModal,editAttrs] = useDialog(Edit);
    const [CreateModal,createAttrs] = useDialog(Create);
    const [DestroyModal,deleteAttrs] = useDialog(Destroy,{
        title:"Delete item?",
    });
    const handleEditClick =(role) => {
        axios.get(route('admin.role.edit',{role})).then((response) => {
            editAttrs.setItem(response.data.role);
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
        <Layout LinkTitle="Role">
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
                            Roles
                        </p>
                        <button
                            className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                            onClick={ handleCreateClick }>
                            Create New Role
                        </button>
                        <Link href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </Link>
                    </header>
                    <div className="card-content">
                        <GlobalFilter setSearchItem={ setSearchItem } />
                        <table>
                            <thead>
                                <tr>
                                    <TheadTh setSortItem={setSortItem} itemKey="id">
                                        Id
                                    </TheadTh>
                                    <TheadTh setSortItem={setSortItem} itemKey="guard_name">
                                        Guard Name
                                    </TheadTh>
                                    <TheadTh setSortItem={setSortItem} itemKey="name">Name</TheadTh>
                                    <TheadTh setSortItem={setSortItem} itemKey="updated_at">Last Updated</TheadTh>
                                    <TheadTh setSortItem={setSortItem} itemKey="created_at">Created</TheadTh>
                                    <TheadTh></TheadTh>
                                </tr>
                            </thead>
                            <tbody>
                            { props.roles.data.map((role,index) => (
                                    <tr key={role.id}>
                                        <td>{ role.id }</td>
                                        <td data-label="Guard Name">{ role.guard_name }</td>
                                        <td data-label="Name">{ role.name }</td>
                                        <td data-label="Last Updated">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ role.updated_at }</small>
                                        </td>
                                        <td data-label="Created">
                                            <small className="text-gray-500" title="Dec 30, 2021">{ role.created_at }</small>
                                        </td>
                                        <td className="actions-cell">
                                            <div className="buttons right nowrap">
                                                <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button" onClick={ (e) => handleEditClick(role.id) }>
                                                    <span className="icon"><i className="mdi mdi-eye"></i></span>
                                                </button>
                                                <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                    onClick={ (e) => handleDestroyClick(role.id) }>
                                                    <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                        <Pagination links={props.roles.links}/>
                        {/* <div className="table-pagination">
                            <div className="flex items-center justify-between">
                                <div className="buttons">
                                    { props.roles.links.map((link, k) => (
                                        <Link key={k} href={link.url || ''} type="button"
                                            disabled={link.url == null ? true : false} className={`${ link.active && 'active' }  ${link.url == null && ''} button`}>{link.label}</Link>
                                    ))}
                                </div>
                                <small>Page { props.roles.current_page } of { props.roles.last_page }</small>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </Layout>
    )
}
