import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar/Sidebar';
import Breadcrumb from "@/Components/Breadcrumb";
import CommentList from "@/Components/Comment/CommentList";

import { HeartIcon } from "@heroicons/react/24/solid";
import apiClient from "@/services/apiClient";
import DOMPurify from "dompurify";

export default function Index({post,errors,auth}){
    post = post.data;
    const [filtersSidebarOpen,setFiltersSidebarOpen] = useState(false);
    const [isLikedByCurrentUser,setIsLikedByCurrentUser] = useState(false);
    const [count,setCount] = useState(post.likes_count);



    const getIsLiked = () => {
        apiClient.post(route(`api.like.store`) ,{
            post:post.id,
        }).then(response => {
            if(response.data.type === 'like') {
                setIsLikedByCurrentUser(response.data.status);
                setCount(response.data.count)
            }
        });
    }
    const handleToggleLike = () => getIsLiked();

    useEffect(function() {
        setIsLikedByCurrentUser(post.isLikedByCurrentUser)
    },[]);

    return (
        <Layout>
            <Head title={"Posts"} />
            <Breadcrumb title="Posts">
                <h2>Post</h2>
                <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
            </Breadcrumb>
            <section id="blog" className="blog">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="flex flex-wrap  g-5">
                        <div className="lg:w-2/3 pr-4 pl-4">
                            <article className="blog-details">
                                <div className="post-img">
                                    <img src={ post.imageUrl } alt={ post.imageUrl } className="max-w-full mx-auto h-auto"/>
                                </div>

                                <h2 className="title">{ post.title }</h2>

                                <div className="meta-top">
                                    <ul>
                                        <li className="flex items-center">
                                            <i className="bi bi-person"></i>
                                            <a href="blog-details.html">
                                                { post.title }
                                            </a>
                                        </li>
                                        <li className="flex items-center">
                                            <i className="bi bi-clock"></i>
                                            <a href="blog-details.html">
                                                <time dateTime="2020-01-01">
                                                    Jan 1, 2022 { post.created_at }
                                                </time>
                                            </a>
                                        </li>
                                        <li className="flex items-center"><i className="bi bi-chat-dots"></i> <a href="blog-details.html">12 Comments</a></li>
                                    </ul>
                                </div>

                                <div className="content" dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(post.body, {
                                        USE_PROFILES: { html: true }
                                    } ),
                                }} />

                                <div className="meta-bottom">
                                    <i className="bi bi-folder"></i>
                                    <ul className="cats">
                                        <li>
                                            <Link href={ route(`post.category.index`,post.category) }>
                                                { post.category.title }
                                            </Link>
                                        </li>
                                    </ul>
                                    <i className="bi bi-tags"></i>
                                    <ul className="tags">
                                        { post.tags.map((post_tag,index) => (
                                            <li key={`post_tag-${post_tag.id}`}>
                                                <Link href={ route(`post.tag.index`,post_tag) }>{ post_tag.title }</Link>
                                            </li>
                                        )) }
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
                                    <div className="mt-5">
                                        <button onClick={handleToggleLike}>
                                            <HeartIcon className={`w-6 h-6  ${isLikedByCurrentUser ? "text-red-600" : "text-gray-500"} `}/>
                                            <span>{count}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <CommentList post={post}/>
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
