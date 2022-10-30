

export default function CommenCreateForm() {
	const {post} = usePage().props;
	const {data,setData,post,errors} = useForm({
		message:"",
	});
	const handleChange = (e) => {
		setData({
			message:e.target.value,
		});
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("post.comment.store",{post}));

	}
	return (
		<div className="reply-form">
			<h4>Leave a Reply</h4>
			<p>Your email address will not be published. Required fields are marked * </p>
			<form onSubmit={handleSubmit}>
			  <div className="flex flex-wrap ">
			    <div className="md:w-1/2 pr-4 pl-4 mb-4">
			      <input name="name" type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Name*">
			    </div>
			    <div className="md:w-1/2 pr-4 pl-4 mb-4">
			      <input name="email" type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Email*">
			    </div>
			  </div>
			  <div className="flex flex-wrap ">
			    <div className="relative flex-grow max-w-full flex-1 px-4 mb-4">
			      <input name="website" type="text" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Website">
			    </div>
			  </div>
			  <div className="flex flex-wrap ">
			    <div className="relative flex-grow max-w-full flex-1 px-4 mb-4">
			      <textarea name="comment" className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Comment*"
			      	value={data.message} onChange={handleChange}/>
			    </div>
			  </div>
			  <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600">Post Comment</button>

			</form>
		</div>
    );	
}