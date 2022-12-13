import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import apiPost from "@/services/apiPost";


export default function CommentCreateForm({reload}) {
	const [errors,setErrors] = useState({})
    const {data,setData} = useForm({
        message:"",
        post_id:usePage().props.post.data.id,
        parent_id:null,
    });
    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        apiPost.post(route(`api.comment.store`),{
            ...data
        }).then(response => {
            reload();
        }).catch(error => {
            console.log("Error",error)
            if(error.response.status == 422){
                const tmp = {}
                //console.log('E',error.response.data)
                Object.keys(error.response.data.errors).forEach(function(key, index) {
                    tmp[key] = error.response.data.errors[key][0];
                });

                setErrors(tmp)
            }
        })
    }
    useEffect(() => {
        setErrors({...data})
    },[])
	return (
		<div className="reply-form m-0">

            <h4>Leave a Reply</h4>
            <p>Your email address will not be published. Required fields are marked * </p>
            <form className="mt-5 md:mt-10" onSubmit={handleSubmit}>
                <div className="flex flex-wrap ">
                    <div className="relative flex-grow max-w-full flex-1">
                        <textarea className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Comment*"
                            name="message" value={data.message} onChange={handleChange}/>
                        { errors.message && <p className="text-red-500 italic mt-2">{ errors.message }</p> }
                    </div>
                </div>
                <div className="flex items-center mt-5 md:mt-7">
                    <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap no-underline text-white btn-submit mr-10">Post Comment</button>
                </div>
            </form>
        </div>
    );
}
