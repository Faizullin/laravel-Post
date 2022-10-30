import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar';
import PostItem from "@/Components/Post/PostItem";


export default function Index({post,errors,auth}){

    const [filtersSidebarOpen,setFiltersSidebarOpen] = useState(false);
    post = post.data;
    return (
        <Layout>
            {/* errors={ errors } */}
            <Head title={"Posts"} />
            <Breadcrumb title="Posts">
                <h2>Post</h2>
                <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
            </Breadcrumb>
            <section id="blog" className="blog">
                <div className="container mx-auto" data-aos="fade-up">
                    <Sidebar.TriggerButton onClick={ () => setFiltersSidebarOpen(!filtersSidebarOpen) } />
                    <div className="flex">
                        <div className="md:w-2/3 ">
                            <PostItem post={post} />
                        </div>
                        <Sidebar open={filtersSidebarOpen}/>
                    </div>
                </div>
            </section>

        </Layout>
    )
}
