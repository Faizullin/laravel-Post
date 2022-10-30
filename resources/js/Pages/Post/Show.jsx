import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar'
import PostItem from "@/Components/Post/PostItem";


export default function Index({post,errors,auth}){

    const [filtersSidebarOpen,setFiltersSidebarOpen] = useState(false);
    post = post.data;
    return (
        <Layout>
            {/* errors={ errors } */}
            <Head title={"Posts"} />
            <div className="breadcrumbs" aria-label="Breadcrumb">
                <div className="page-header flex items-center" style={{backgroundImage: '',}}>
                    <div className="container mx-auto relative">
                    <div className="row flex justify-center">
                        <div className="lg:w-1/2 text-center">
                        <h2>Post</h2>
                        <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <nav>
                    <div className="container mx-auto px-4">
                        <ol>
                            <li><Link href={ route(`pages.home`) }>Home</Link></li>
                            <li>Posts</li>
                        </ol>
                    </div>
                </nav>
            </div>
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
