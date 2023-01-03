import { useState } from "react";
import { Head } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar/Sidebar'
import PostItem from "@/Components/Post/Index/PostItem";
import Pagination from "@/Components/Post/Index/Pagination";
import SortDropdown from "@/Components/Post/Index/SortDropdown"
import Breadcrumb from "@/Components/Breadcrumb";




export default function Index({posts,errors,auth}){
    const [filtersSidebarOpen,setFiltersSidebarOpen] = useState(false);
    return (
        <Layout>
            <Head title={"Posts"} />
            <Breadcrumb title={`Posts`} >
                <h2>Post</h2>
                <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
            </Breadcrumb>
            <section id="blog" className="blog">
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="flex justify-end  items-center items-baseline border-b border-gray-200 px-6 pb-4 md:px-0">
                        <SortDropdown/>
                        <Sidebar.TriggerButton onClick={ () => setFiltersSidebarOpen(!filtersSidebarOpen) } />
                    </div>

                    <div className="flex mt-8">
                        <div className="lg:w-2/3 ">
                            <div className="flex flex-wrap mx-auto justify-between posts-list">
                                { posts.data.map((post,index) => (
                                    <PostItem key={post.id} post={post} />
                                ))}

                            </div>
                            <Pagination items={posts}/>
                        </div>
                        <Sidebar
                            open={filtersSidebarOpen}
                            setOpen={setFiltersSidebarOpen}/>
                    </div>
                </div>
            </section>

        </Layout>
    )
}
