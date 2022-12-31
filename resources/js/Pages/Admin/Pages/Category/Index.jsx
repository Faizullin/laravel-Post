import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableModalLayout from '../../Layouts/TableModalLayout';


export default function Index({categories}) {
    return (
        <TableModalLayout
            wrap="category"
            fetchUrls={{
                get:route(`admin.category.index`),
                edit:(category) => route(`admin.category.edit`,category),
                delete:(category) => route(`admin.category.destroy`,category),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Title",name:"title",sortable:true},
                {label:"Slug",name:"slug"},
                {label:"Posts count",name:"posts_count",sortable:true},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={categories}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
            title="Category"
            breadcrumbLinks={[{label:"Category"}]}
        />
    )
}
