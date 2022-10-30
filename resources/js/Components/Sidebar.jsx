import { FunnelIcon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/inertia-react"
import { useState } from "react";
import SearchInput from "./Post/SearchInput";


const Sidebar = ({open}) => {
    const props = usePage().props;
    const {data:categories} = props.categories;
    const {data:tags} = props.tags;


    return (
        <div className="md:w-1/3 setIsOpen md:block">
            <div className={`sidebar navbar ease-out duration-300
                ${ open ? "translate-x-0 " : "translate-x-full" }  md:transform-none md:transition-none`} >

                <SearchInput />
                <div className="sidebar-item categories">
                <h3 className="sidebar-title">Categories</h3>
                <ul className="mt-3">
                    { categories.map((category,index) => (
                        <li><Link href={ route('post.category.index',category) }>{category.title} <span>({category.posts_count})</span></Link></li>
                    ))}
                </ul>
                </div>

                <div className="sidebar-item recent-posts">
                <h3 className="sidebar-title">Recent Posts</h3>

                <div className="mt-3">

                    <div className="post-item mt-3">
                    <img src="assets/img/blog/blog-recent-1.jpg" alt=""/>
                    <div>
                        <h4><a href="blog-details.html">Nihil blanditiis at in nihil autem</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                    </div>
                    </div>

                    <div className="post-item">
                    <img src="assets/img/blog/blog-recent-2.jpg" alt=""/>
                    <div>
                        <h4><a href="blog-details.html">Quidem autem et impedit</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                    </div>
                    </div>

                    <div className="post-item">
                    <img src="assets/img/blog/blog-recent-3.jpg" alt=""/>
                    <div>
                        <h4><a href="blog-details.html">Id quia et et ut maxime similique occaecati ut</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                    </div>
                    </div>

                    <div className="post-item">
                    <img src="assets/img/blog/blog-recent-4.jpg" alt=""/>
                    <div>
                        <h4><a href="blog-details.html">Laborum corporis quo dara net para</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                    </div>
                    </div>

                    <div className="post-item">
                    <img src="assets/img/blog/blog-recent-5.jpg" alt=""/>
                    <div>
                        <h4><a href="blog-details.html">Et dolores corrupti quae illo quod dolor</a></h4>
                        <time dateTime="2020-01-01">Jan 1, 2020</time>
                    </div>
                    </div>

                </div>

                </div>

                <div className="sidebar-item tags">
                <h3 className="sidebar-title">Tags</h3>
                <ul className="mt-3">
                    { tags.map((tag,index) => (
                        <li><Link href={ '' }>{tag.title}</Link></li>
                    ))}
                </ul>
                </div>

            </div>
        </div>
    )
}
const TriggerButton = ({onClick}) => {
    return (
        <button
            type="button"
            className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            onClick={onClick}
        >
            <span className="sr-only">Filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
        </button>
    );
}
Sidebar.TriggerButton = TriggerButton;
export default Sidebar;
