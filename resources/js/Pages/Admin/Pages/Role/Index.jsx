import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableLayout from '../../Layouts/TableLayout';
import { useEffect } from 'react';


export default function Index({roles,filters}) {
    useEffect(()=>{
        console.log("Roles",roles,filters)
    },[])
    return (
        <TableLayout
            wrap="role"
            fetchUrls={{
                get:route(`admin.role.index`),
                edit:(role) => route(`admin.role.edit`,role),
                delete:(role) => route(`admin.role.destroy`,role),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Name",name:"name",sortable:true},
                {label:"guard_name",name:"guard_name"},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={roles}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
        />
    )
}
