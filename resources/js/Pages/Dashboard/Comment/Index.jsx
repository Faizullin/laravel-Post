import PostItem from "@/Components/Post/Index/PostItem";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Table from "@/Components/Dashboard/Table/Table";
import GlobalFilter from "@/Pages/Admin/Components/Table/GlobalFilter";
import TheadTh from "@/Pages/Admin/Components/Table/TheadTh";
import { Link } from "@inertiajs/inertia-react";

export default function Index({comments}){
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
            {/* <Table
                fetchUrl={ route(`dashboard.post.index`) }
                columns={["title","imageUrl",""]}
                wrap={`posts`}>
            </Table> */}
            <div className="card has-table">
                <header className="card-header">
                    <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                        Posts
                    </p>
                    <Link
                        className='inline-flex items-center px-4 py-2 bg-gray-900 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest active:bg-gray-900 transition ease-in-out duration-150'
                        href={route('admin.post.create')}>
                        Create New Post
                    </Link>
                    <Link href="#" className="card-header-icon">
                        <span className="icon"><i className="mdi mdi-reload"></i></span>
                    </Link>
                </header>
                <div className="card-content">
                    <div className='lg:w-full mb-3'>
                        <div className="p-4">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <input type="search" name="search" id="table-search" autoComplete="search"
                                    className="block rounded-lg  shadow-sm sm:text-sm  focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5" placeholder={`Search here...`}
                                    />
                            </div>
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <TheadTh  itemKey="id">Id</TheadTh>
                                <TheadTh itemKey="title">Title</TheadTh>
                                <TheadTh>Logo Image</TheadTh>
                                <TheadTh  itemKey="author">Author</TheadTh>
                                <TheadTh >Description</TheadTh>
                                <TheadTh  itemKey="category">Category</TheadTh>
                                <TheadTh  itemKey="updated_at">Last Updated</TheadTh>
                                <TheadTh itemKey="created_at">Created</TheadTh>
                                <TheadTh></TheadTh>
                            </tr>
                        </thead>
                        <tbody>
                            { comments.data.map((post,index) => (
                                <tr key={post.id}>
                                    <td>{ post.id }</td>
                                    <td data-label="Name">{ post.title }</td>
                                    <td data-label="Logo Image" className="image-cell">
                                        <div className="image">
                                            <img src={post.imageUrl} className="rounded-full"/>
                                        </div>
                                    </td>
                                    <td data-label="Author">{ post.author?.name  || "Unknown" }</td>
                                    <td data-label="Description">{ post.description }</td>
                                    <td data-label="Category">{ post.category?.title || "Unknown" }</td>
                                    <td data-label="Last Updated">
                                        <small className="text-gray-500" title="Dec 30, 2021">{ post.updated_at }</small>
                                    </td>
                                    <td data-label="Created">
                                        <small className="text-gray-500" title="Dec 30, 2021">{ post.created_at }</small>
                                    </td>
                                    <td className="actions-cell">
                                        <div className="buttons right nowrap">
                                            <Link className="button small blue --jb-modal"  data-target="sample-modal-2" type="button"
                                                href={route('admin.post.edit',post.id)}>
                                                <span className="icon"><i className="mdi mdi-eye"></i></span>
                                            </Link>
                                            <button className="button small red --jb-modal" data-target="sample-modal" type="button"
                                                onClick={ (e) => handleDestroyClick(post.id) }>
                                                <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )}
                        </tbody>
                    </table>
                    {/* <Pagination items={props.posts}/> */}
                </div>
            </div>

        </DashboardLayout>
    );
}


