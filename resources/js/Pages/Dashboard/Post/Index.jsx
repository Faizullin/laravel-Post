import PostItem from "@/Components/Post/Index/PostItem";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Dashboard/Table/Table";

export default function Index({posts}){
    return (
        <DashboardLayout>
            {/* <div className="flex flex-wrap mx-auto  posts-list">
                { posts.data.map((post,index) => (
                    <PostItem post={post} />
                ))}

            </div> */}
            {/* <div className="blog-pagination">
                <ul className="justify-center">
                    <li><a href="#">1</a></li>
                    <li className="active"><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                </ul> */}
            <Table
                fetchUrl={ route(`dashboard.post.index`) }
                columns={["title","imageUrl",""]}
                wrap={`posts`}>
            </Table>
        </DashboardLayout>
    );
}


