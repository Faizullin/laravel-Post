import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar'
import PostItem from "@/Components/Post/Index/PostItem";
import Pagination from "@/Components/Post/Index/Pagination";
import SortDropdown from "@/Components/Post/Index/SortDropdown"


interface IPost{
    id: number | string ,
    title:string,
    author:{
        name:string,
    },
    description:string,
    category:{
        title:string,
    },
    imageUrl:string,

}
interface IProps{
    posts:{
        data:Array<IPost>,
        links:Array<any>,
    },
    auth:{
        user:any
    } | null |undefined,
    errors:any,
}
export default function Index({posts,errors,auth}:IProps){
    const [filtersSidebarOpen,setFiltersSidebarOpen] = useState<boolean>(false);

    const getPosts = () => {
        ;
    }
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
                    <div className="flex justify-end  items-center items-baseline border-b border-gray-200 px-6 pb-4 md:px-0">
                        <SortDropdown />
                        <Sidebar.TriggerButton onClick={ () => setFiltersSidebarOpen(!filtersSidebarOpen) } />
                    </div>

                    <div className="flex mt-8">
                        <div className="md:w-2/3 ">
                            <div className="flex flex-wrap mx-auto  posts-list">
                                { posts.data.map((post,index) => (
                                    <PostItem post={post} />
                                ))}

                            </div>
                            <div className="blog-pagination">
                                <ul className="justify-center">
                                    <li><a href="#">1</a></li>
                                    <li className="active"><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                </ul>
                            </div>
                        </div>
                        <Sidebar open={filtersSidebarOpen}/>
                    </div>
                </div>
            </section>

        </Layout>
    )
}
