import CommentReplyItem from './CommentReplyItem';

export default function CommentItem({comment,openCreateReplyModal,setOpenCreateReplyModal}){

	const handleReply =(e) => {
		e.preventDefault();

	}
	return (
		<div id="comment-1" className="comment">
			<div className="flex">
				<div className="comment-img">
					<img src="/img/blog/comments-1.jpg" alt="">
				</div>
				<div>
					<h5>
						<a href="">Georgia Reader</a>
						<a href="#" className="reply" onClick={handleReply}>
							<i className="bi bi-reply-fill"></i>Reply
						</a>
					</h5>
					<time dateTime="2020-01-01">01 Jan,2022 { comment.created_at }</time>
					<p>
						Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
						Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
					</p>
				</div>
			</div>
			{ (comment.replies_count>0) ?
				comment.replies.map((comment_reply,index) => (
					<CommentReplyItem comment={comment_reply}
						openCreateReplyModal={openCreateReplyModal}
						setOpenCreateReplyModal={setOpenCreateReplyModal}
						/>
				));
				
			: "" }
		</div>
    );
}