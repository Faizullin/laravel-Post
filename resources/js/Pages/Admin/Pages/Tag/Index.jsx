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
import Create as CreateModal from "./Create";
import Edit as EditModal from "./Edit";


export default function Index({tags,activeForm,}) {
    
    console.log("Tags",tags,activeForm)
    useEffect(function() {
        NiceModal.register("edit-table-item-modal",EditModal)
        NiceModal.register("deleteConfirm-table-item-modal",DeleteConfirmModal)
        if (activeForm === "create") {
            NiceModal.show("edit-table-item-modal")
        } else if (activeForm === "edit") {
            NiceModal.show("edit-table-item-modal",{tag})
        }
    }, [])
    return (
        <TableLayout
            fetchUrls={{
                get:route(`admin.tag.index`),
                edit:route(`admin.tag.edit`,tag),
                delete:route(`admin.tag.delete`,tag),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Title",name:"title",sortable:true},
                {label:"Slug",name:"slug"},
                {label:"Posts count",name:"posts_count",sortable:true},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            data={tags.data}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
        />
    )
}
