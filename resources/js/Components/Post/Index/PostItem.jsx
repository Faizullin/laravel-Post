import { Link } from "@inertiajs/inertia-react";


export default function PostItem({post}){
    return (
        <div className="w-full sm:w-1/2 xl:w-1/3 px-2 md:px-4 mb-5">
            <article className="bg-white border rounded-lg">
                <div className="post-img">
                    <img className="h-[240px] w-full object-cover mx-auto" src={ post.imageUrl } alt={ post.imageUrl }/>
                </div>
                <p className="post-category">{ post.category?.title }</p>
                <h2 className="title">
                    <Link href={ route (`post.show`,post)}>{ post.title }</Link>
                </h2>

                <div className="flex items-center">
                    <img src={post.imageUrl} alt="" className="max-w-full flex-shrink-0 post-author-img object-contain"/>
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
