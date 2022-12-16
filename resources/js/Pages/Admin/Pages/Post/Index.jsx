import { DeleteConfirmModal } from '../../Components/Dialog/TableEditModal';
import TableLayout from '../../Layouts/TableLayout';


export default function Index({posts,filters}) {
    return (
        <TableLayout
            wrap="post"
            fetchUrls={{
                get:route(`admin.post.index`),
                create:route(`admin.post.create`),
                edit:(post) => route(`admin.post.edit`,post),
                delete:(post) => route(`admin.post.destroy`,post),
            }}
            columns={[
                {label:"Id",name:"id",sortable:true},
                {label:"Title",name:"title",sortable:true},
                {label:"Logo Image",name:"imageUrl",
                    render: () => (
                        <td data-label="Logo Image" className="image-cell">
                            <div className="image">
                                <img src={post.imageUrl} className="rounded-full"/>
                            </div>
                        </td>
                    ) },
                {label:"Author",name:"author",sortable:true,
                    render: (post) => (
                        <td data-label="Author">{ post.author?.name  || "Unknown" }</td>
                    )},
                {label:"Description",name:"description"},
                {label:"Category",name:"category",sortable:true,
                    render: (post) => (
                        <td data-label="Category">{ post.category?.title || "Unknown" }</td>
                    )},
                {label:"Created",name:"created_at",sortable:true,type:"time"},
                {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
            ]}
            items={posts}
            DeleteConfirmModal={DeleteConfirmModal}
        />
    )
}
