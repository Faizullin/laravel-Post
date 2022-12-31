import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableModalLayout from '../../Layouts/TableModalLayout';


export default function Index({permissions}) {
    return (
        <TableModalLayout
            wrap="permission"
            fetchUrls={{
                get:route(`admin.permission.index`),
                edit:(permission) => route(`admin.permission.edit`,permission),
                delete:(permission) => route(`admin.permission.destroy`,permission),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Name",name:"name",sortable:true},
                {label:"Guard Name",name:"guard_name",sortable:true},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={permissions}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
            title="Permission"
            breadcrumbLinks={[{label:"Permission"}]}
        />
    )
}
