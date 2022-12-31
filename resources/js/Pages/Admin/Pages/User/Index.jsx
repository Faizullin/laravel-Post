import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableModalLayout from '../../Layouts/TableModalLayout';


export default function Index({users}) {
    return (
        <TableModalLayout
            wrap="user"
            fetchUrls={{
                get:route(`admin.user.index`),
                edit:(user) => route(`admin.user.edit`,user),
                delete:(user) => route(`admin.user.destroy`,user),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Name",name:"name",sortable:true},
                {label:"email",name:"email",sortable:true},
                {label:"Posts count",name:"posts_count",sortable:true},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={users}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
            title="User"
            breadcrumbLinks={[{label:"User"}]}
        />
    )
}
