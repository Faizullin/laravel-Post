import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableModalLayout from '../../Layouts/TableModalLayout';


export default function Index({contacts}) {
    return (
        <TableModalLayout
            wrap="contact"
            fetchUrls={{
                get:route(`admin.contact.index`),
                edit:(contact) => route(`admin.contact.edit`,contact),
                delete:(contact) => route(`admin.contact.destroy`,contact),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Name",name:"name",sortable:true},
                {label:"Email",name:"email",sortable:true},
                {label:"Subject",name:"subject"},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={contacts}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
            title="Contact"
            breadcrumbLinks={[{label:"Contact"}]}
        />
    )
}
