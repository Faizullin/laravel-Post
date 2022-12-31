import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Dashboard/Table/Table";
import { DeleteConfirmModal } from "@/Components/Dialog/DeleteConfirmModal";
import DOMPurify from "dompurify";

export default function Index({posts}){
    return (
        <DashboardLayout
            breadcrumbLinks={[{label:"Post"}]}>
            <Table
                wrap="post"
                fetchUrls={{
                    get:route(`dashboard.post.index`),
                    create:route(`post.create`),
                    edit:(post) => route(`post.edit`,post),
                    delete:(post) => route(`post.destroy`,post),
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
                title="Post"
            />
        </DashboardLayout>
    );
}




