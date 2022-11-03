import { Link } from "@inertiajs/inertia-react";


export default function PostItem({post}){
    return (
        <div className="xl:w-1/3 lg:w-1/2 px-2 md:px-4 mb-5 mx-auto">
            <article className="bg-white border rounded-lg">
                    {/* <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url('${post.imageUrl}')`}}>

                    </div> */}
                <div className="post-img">
                    <img className="h-[240px] w-full object-cover mx-auto" src={ post.imageUrl } alt={ post.imageUrl }/>
                </div>
                <p className="post-category">{ post.category?.title }</p>
                <h2 className="title">
                    <Link href={ route (`post.show`,post)}>{ post.title }</Link>
                </h2>

                <div className="flex items-center">
                    <img src={post.imageUrl} alt="" className="max-w-full h-auto post-author-img flex-shrink-0"/>
                    <div className="post-meta">
                        <p className="post-author-list">{  post.author?.name || "Unknown" }</p>
                        <p className="post-date">
                            <time dateTime="2022-01-01">{ post.created_at }</time>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
}
