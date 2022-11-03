import { usePage } from '@inertiajs/inertia-react';
import { useState } from 'react';
import CommentReplyItem from './CommentReplyItem';

export default function CommentItem({
        comment,
        openCreateReplyModal,setOpenCreateReplyModal,onReply,
        onEdit,onDelete,
    }){
    const [showDiscussion,setShowDiscussion] = useState(false)
    const { auth } = usePage().props;
	return (
		<div id={`comment-${comment.id}`} className="comment">
			<div className="flex">
				<div className="comment-img">
					<img src="/img/blog/comments-1.jpg" alt=""/>
				</div>
				<div>
					<h5>
						<a href="">{ comment.author.name }</a>
						<a className="reply cursor-pointer" onClick={ (e) => onReply(e,comment.id) }>
							<i className="bi bi-reply-fill mr-1">
                                <svg width="16" height="16" fill="currentColor" className="inline" viewBox="0 0 16 16">
                                    <path d="M5.921 11.9 1.353 8.62a.719.719 0 0 1 0-1.238L5.921 4.1A.716.716 0 0 1 7 4.719V6c1.5 0 6 0 7 8-2.5-4.5-7-4-7-4v1.281c0 .56-.606.898-1.079.62z"/>
                                </svg>
                            </i>Reply
						</a>
					</h5>
					<time dateTime="2020-01-01">01 Jan,2022 { comment.created_at }</time>
                    <div>
                        { comment.message }
                    </div>
                    <div className="flex">
                        <div className={`${ (auth.user?.id != comment.author.id ) ? "hidden" : ""} flex pr-4` }>
                            <button onClick={(e) => onEdit(comment)}
                                className={` mr-3`}>Edit</button>
                            <button onClick={(e) => onDelete(comment)}
                                className={` `}>Delete</button>
                        </div>
                        <div className={`${(comment.replies?.length == 0) ? "hidden" : ""} `}>
                            <button onClick={(e) => setShowDiscussion(!showDiscussion)}>Click me</button>
                        </div>
                    </div>
				</div>
			</div>
            { showDiscussion ?
                (comment.replies?.length>0) ?
                    comment.replies.map((comment_reply,index) => (
                        <CommentReplyItem key={`reply-${comment_reply.id}`}
                            comment={comment_reply}
                            onReply={onReply}
                            openCreateReplyModal={openCreateReplyModal}
                            setOpenCreateReplyModal={setOpenCreateReplyModal}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            />
                    )
                ) : ""
            : "" }
		</div>
    );
}
