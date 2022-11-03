import React, { useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar';
import PostItem from "@/Components/Post/Index/PostItem";
import Breadcrumb from "@/Components/Breadcrumb";
import CommentList from "@/Components/Comment/CommentList";


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
            {/* <section id="blog" className="blog">
                <div className="container mx-auto" data-aos="fade-up">
                    <Sidebar.TriggerButton onClick={ () => setFiltersSidebarOpen(!filtersSidebarOpen) } />
                    <div className="flex">
                        <div className="md:w-2/3 ">
                            <PostItem post={post} />
                        </div>
                        <Sidebar open={filtersSidebarOpen}/>
                    </div>
                </div>
            </section> */}
            <section id="blog" className="blog">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="flex flex-wrap  g-5">
                        <div className="lg:w-2/3 pr-4 pl-4">

                            <article className="blog-details">

                                <div className="post-img">
                                    <img src={ post.imageUrl } alt="" className="max-w-full h-auto"/>
                                </div>

                                <h2 className="title">Dolorum optio tempore voluptas dignissimos cumque fuga qui quibusdam quia</h2>

                                <div className="meta-top">
                                    <ul>
                                        <li className="flex items-center"><i className="bi bi-person"></i> <a href="blog-details.html">John Doe</a></li>
                                        <li className="flex items-center"><i className="bi bi-clock"></i> <a href="blog-details.html"><time dateTime="2020-01-01">Jan 1, 2022</time></a></li>
                                        <li className="flex items-center"><i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a></li>
                                    </ul>
                                </div>

                                <div className="content">
                                    { post.body }
                                </div>

                                <div className="meta-bottom">
                                    <i className="bi bi-folder"></i>
                                    <ul className="cats">
                                        <li><a href="#">Business</a></li>
                                    </ul>

                                    <i className="bi bi-tags"></i>
                                    <ul className="tags">
                                        <li><a href="#">Creative</a></li>
                                        <li><a href="#">Tips</a></li>
                                        <li><a href="#">Marketing</a></li>
                                    </ul>
                                </div>
                            </article>

                            <div className="post-author flex items-center">
                                <img src="assets/img/blog/blog-author.jpg" className="rounded-full flex-shrink-0" alt=""/>
                                <div>
                                    <h4>Jane Smith</h4>
                                    <div className="social-links">
                                    <a href="https://twitters.com/#"><i className="bi bi-twitter"></i></a>
                                    <a href="https://facebook.com/#"><i className="bi bi-facebook"></i></a>
                                    <a href="https://instagram.com/#"><i className="biu bi-instagram"></i></a>
                                    </div>
                                    <p>
                                    Itaque quidem optio quia voluptatibus dolorem dolor. Modi eum sed possimus accusantium. Quas repellat voluptatem officia numquam sint aspernatur voluptas. Esse et accusantium ut unde voluptas.
                                    </p>
                                </div>
                            </div>
                            <CommentList post={post}/>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
        </Layout>
    )
}
