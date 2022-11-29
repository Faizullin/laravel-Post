import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import Sidebar from '@/Components/Sidebar';
import PostItem from "@/Components/Post/Index/PostItem";
import Breadcrumb from "@/Components/Breadcrumb";
import CommentList from "@/Components/Comment/CommentList";


export default function Preview({post}){

    useEffect(function(){
        console.log("Preview re-render",post)
    },[])
    return (
        <section id="blog" className="p-0 blog">
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

                            <div className="content">
                                { post.body }
                            </div>

                            <div className="meta-bottom">
                                <i className="bi bi-folder"></i>
                                <ul className="cats">
                                    <li>
                                        {/* <Link href={ route(`post.category.index`,post.category) }>
                                            { post.category.title }
                                        </Link> */}
                                    </li>
                                </ul>

                                <i className="bi bi-tags"></i>
                                <ul className="tags">
                                    { post.tags.map((post_tag,index) => (
                                        <li key={post_tag.id}>
                                            <Link href={ route(`post.tag.index`,post_tag) }>{ post_tag.title }</Link>
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        </article>

                        {/* <div className="post-author flex items-center">
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
                        </div> */}
                        {/* <CommentList post={post}/> */}
                    </div>
                    <Sidebar />
                </div>
            </div>
        </section>
    )
}