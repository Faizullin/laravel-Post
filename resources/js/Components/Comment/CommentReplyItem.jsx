

export default function CommentReplyItem({comment}) {
	return (
		<div id="comment-reply-2" className="comment comment-reply">
	        <div className="flex">
				<div className="comment-img">
					<img src="assets/img/blog/comments-4.jpg" alt="">
				</div>
				<div>
					<h5><a href="">Sianna Ramsay</a> <a href="#" className="reply"><i className="bi bi-reply-fill"></i> Reply</a></h5>
					<time datetime="2020-01-01">01 Jan,2022</time>
					<p>
					 	<span>@{ comment.parent.user.name }</span> Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores cupiditate et. Ut unde qui eligendi sapiente omnis ullam. Placeat porro est commodi est officiis voluptas repellat quisquam possimus. Perferendis id consectetur necessitatibus.
					</p>
				</div>
			</div>
	    </div>
	);
}