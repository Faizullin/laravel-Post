
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
                title="Comment"
                titlePlural="Comments"
                fetchUrls={{
                    get:route(`dashboard.comment.index`),
                    edit:({item:comment}) => route(`dashboard.comment.index`,comment),
                    delete:({item:comment}) => route(`dashboard.comment.destroy`,comment),
                }}
                columns={[
                    {label:"Id",name:"id",sortable:true},
                    {label:"Message",name:"message",
                        render:({item:comment}) => (
                            <td dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(comment.message, {
                                    USE_PROFILES: { html: true }
                                } ),
                            }} />
                        ) },
                    {label:"Post",name:"post",
                        render: ({item:comment}) => (comment.commentable) ? (
                            <td>
                                <Link href={route (`post.show`,comment.commentable.id)}>{ comment.commentable?.title }</Link>
                            </td>
                        ) : (
                            <td>Unknown</td>
                        )},
                    {label:"Parent",name:"parent",
                        render: ({item:comment}) => (comment.parent) ? (
                            <td>{ comment.parent.author?.name || "Unknown" }</td>
                        ) : (
                            <td>NULL</td>
                        )},
                    {label:"Created",name:"created_at",sortable:true,type:"time"},
                    {label:"Last Updated",name:"updated_at",sortable:true,type:"time"},
                ]}
                items={comments}
                DeleteConfirmModal={DeleteConfirmModal}
            />
        </DashboardLayout>
    );
}
