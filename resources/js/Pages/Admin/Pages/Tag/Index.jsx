import CreateModal from './Create'
import EditModal from './Edit';
import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableModalLayout from '../../Layouts/TableModalLayout';


export default function Index({tags}) {
    return (
        <TableModalLayout
            wrap="tag"
            fetchUrls={{
                get:route(`admin.tag.index`),
                edit:(tag) => route(`admin.tag.edit`,tag),
                delete:(tag) => route(`admin.tag.destroy`,tag),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Title",name:"title",sortable:true},
                {label:"Slug",name:"slug"},
                {label:"Posts count",name:"posts_count",sortable:true},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={tags}
            CreateModal={CreateModal}
            EditModal={EditModal}
            DeleteConfirmModal={DeleteConfirmModal}
            title="Tag"
            breadcrumbLinks={[{label:"Tag"}]}
        />
    )
}
