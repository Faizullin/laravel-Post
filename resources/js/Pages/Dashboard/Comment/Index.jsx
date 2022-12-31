
import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Dashboard/Table/Table";
import { DeleteConfirmModal } from "@/Components/Dialog/DeleteConfirmModal";
import { Link } from "@inertiajs/inertia-react";
import DOMPurify from "dompurify";

export default function Index({comments}){
    return (
        <DashboardLayout
            breadcrumbLinks={[{label:"Comment"}]}>
            <Table
                wrap="comment"
                fetchUrls={{
                    get:route(`dashboard.comment.index`),
                    edit:({item:comment}) => route(`dashboard.comment.index`,comment),
                    delete:({item:comment}) => route(`dashboard.comment.destroy`,comment),
                }}
                columns={[
                    {label:"Id",name:"id",sortable:true},
                    {label:"Author",name:"author",sortable:true,
                        render: ({item:comment}) => (
                            <td>{ comment.author?.name  || "Unknown" }</td>
                        )},
                    {label:"Message",name:"message",
                        render:({item:comment}) => (
                            <td dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(comment.message, {
                                    USE_PROFILES: { html: true }
                                } ),
                            }} />
                        ) },
                    {label:"Post",name:"post",sortable:true,
                        render: ({item:comment}) => (comment.post) ? (
                            <td>
                                <Link href={route (`post.show`,comment.post.id)}>{ comment.post?.title }</Link>
                            </td>
                        ) : (
                            <td>Unknown</td>
                        )},
                    {label:"Parent",name:"parent",sortable:true,
                        render: ({item:comment}) => (comment.parent) ? (
                            <td>{ comment.parent?.title }</td>
                        ) : (
                            <td>Unknown</td>
                        )},
                    {label:"Created",name:"created_at",sortable:true,type:"time"},
                    {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
                ]}
                items={comments}
                DeleteConfirmModal={DeleteConfirmModal}
                title="comment"

            />
        </DashboardLayout>
    );
}
