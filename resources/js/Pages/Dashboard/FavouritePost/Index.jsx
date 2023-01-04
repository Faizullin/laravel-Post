import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Dashboard/Table/Table";
import { DeleteConfirmModal } from "@/Components/Dialog/DeleteConfirmModal";
import DOMPurify from "dompurify";

export default function Index({posts}){
    return (
        <DashboardLayout
            breadcrumbLinks={[{label:"Favourite Post"}]}>
            <Table
                wrap="post"
                title="Post"
                titlePlural="Posts"
                fetchUrls={{
                    get:route(`dashboard.favouritePost.index`),
                    edit:({item:post}) => route(`dashboard.favouritePost.index`) ,//route(`post.show`,post),
                    delete:({item:post}) => route(`post.favouritePost.destroy`,post),
                }}
                columns={[
                    {label:"Id",name:"id",sortable:true},
                    {label:"Title",name:"title",sortable:true},
                    {label:"Logo Image",name:"imageUrl",
                        render: ({item:post}) => (
                            <td className="image-cell">
                                <div className="image">
                                    <img src={post.imageUrl} className="rounded-full"/>
                                </div>
                            </td>
                        ) },
                    {label:"Description",name:"description",
                        render:({item:post}) => (
                            <td dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.description, {
                                    USE_PROFILES: { html: true }
                                } ),
                            }} />
                        ) },
                    {label:"Category",name:"category",sortable:true,
                        render: ({item:post}) => (
                            <td>{ post.category?.title || "Unknown" }</td>
                        )},
                    {label:"Created",name:"created_at",sortable:true,type:"time"},
                    {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
                ]}
                items={posts}
                DeleteConfirmModal={DeleteConfirmModal}
            />
        </DashboardLayout>
    );
}




