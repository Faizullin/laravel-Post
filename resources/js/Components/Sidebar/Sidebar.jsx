import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { FunnelIcon, MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/inertia-react"
import MobileSidebar from "./MobileSidebar";
import SearchInput from "./SearchInput";
import Img1 from "../../../img/blog/blog-recent-1.jpg"


const sortOptions = [


    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ]
  const subCategories = [


    { name: 'Totes', href: '#' },
    { name: 'Backpacks', href: '#' },
    { name: 'Travel Bags', href: '#' },
    { name: 'Hip Bags', href: '#' },
    { name: 'Laptop Sleeves', href: '#' },
  ]
  const filters = [


    {
      id: 'color',
      name: 'Color',
      options: [
        { value: 'white', label: 'White', checked: false },
        { value: 'beige', label: 'Beige', checked: false },
        { value: 'blue', label: 'Blue', checked: true },
        { value: 'brown', label: 'Brown', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'new-arrivals', label: 'New Arrivals', checked: false },
        { value: 'sale', label: 'Sale', checked: false },
        { value: 'travel', label: 'Travel', checked: true },
        { value: 'organization', label: 'Organization', checked: false },
        { value: 'accessories', label: 'Accessories', checked: false },
      ],
    },
    {
      id: 'size',
      name: 'Size',
      options: [
        { value: '2l', label: '2L', checked: false },
        { value: '6l', label: '6L', checked: false },
        { value: '12l', label: '12L', checked: false },
        { value: '18l', label: '18L', checked: false },
        { value: '20l', label: '20L', checked: false },
        { value: '40l', label: '40L', checked: true },
      ],
    },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


const Sidebar = ({open,setOpen}) => {
    const props = usePage().props;
    const {data:categories} = props.categories;
    const {data:tags} = props.tags;
    const {data:recentPosts} = props.recentPosts;

    console.log("img",Img1)


    return (
        <>
            <div className="md:hidden">
                <MobileSidebar open={open} setOpen={setOpen} tags={tags} categories={categories}/>
            </div>
            <div className="md:w-1/3 hidden md:block">

                <div className={`sidebar ease-out duration-300
                    ${ open ? "translate-x-0 " : "translate-x-full" }  md:transform-none md:transition-none`} >

                    <SearchInput />
                    <div className="sidebar-item categories">
                        <h3 className="sidebar-title">Categories</h3>
                        <ul className="mt-3 flex flex-wrap">
                            { categories.map((category,index) => (
                                <li key={`category-${category.id}`}>
                                    <Link href={ route('post.category.index',category) }>{category.title}<span>({category.posts_count})</span></Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sidebar-item recent-posts">
                        <h3 className="sidebar-title">Recent Posts</h3>

                        <div className="mt-3">

                            {/* <div className="post-item mt-3">
                            <img src={ Img1 } alt=""/>
                            <div>
                                <h4><a href="blog-details.html">Nihil blanditiis at in nihil autem</a></h4>
                                <time dateTime="2020-01-01">Jan 1, 2020</time>
                            </div>
                            </div> */}

                            { recentPosts.map((recentPost,index) => (
                                <div key={recentPost.id}
                                    className="post-item">
                                    <img src={recentPost.imageUrl} alt="" className="max-h-[60px]"/>
                                    <div>
                                        <h4>
                                            <Link href={route(`post.show`,recentPost)}>
                                                { recentPost.description }
                                            </Link>
                                        </h4>
                                        <time dateTime="2020-01-01">{ recentPost.created_at }</time>
                                    </div>
                                </div>
                            )) }

{/*
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
                            </div> */}

                        </div>

                    </div>

                    <div className="sidebar-item tags">
                        <h3 className="sidebar-title">Tags</h3>
                        <ul className="mt-3 flex flex-wrap">
                            { tags.map((tag,index) => (
                                <li key={`tag-${tag.id}`}>
                                    <Link href={ route('post.tag.index',tag) }>{tag.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
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
