import useDidMountEffect from "@/Pages/Admin/Hooks/useDidMountEffect";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";


export default function CommentEditModalForm({show,setShow,title,item,reload}) {
    const [errors,setErrors] = useState({})
    const {data,setData} = useForm({
        message:"",
        post_id:usePage().props.post.data.id,
        parent_id:null,
    });
    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(route(`api.comment.update`,item),{
            ...data
        }).then(response => {
            reload().then(response => {
                setShow(false)
            })
        }).catch(error => {
            if(error.response.status == 422){
                const tmp = {}
                Object.keys(error.response.data.errors).forEach(function(key, index) {
                    tmp[key] = error.response.data.errors[key][0];
                });
                setErrors(tmp)
            }
        })
    }
    const closeModal = (e) => {
        setShow(false);
    }
    useEffect(() => {
        setData({...item})
    },[item])
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						 <Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-[1000px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									{title}
								</Dialog.Title>
                                <div className="reply-form m-0">
                                    <h4>Edit Comment</h4>
                                    <form className="mt-5 md:mt-10" onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap ">
                                            <div className="relative flex-grow max-w-full flex-1">
                                                <textarea className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded" placeholder="Your Comment*"
                                                    name="message" value={data.message} onChange={handleChange}/>
                                                { errors.message && <p className="text-red-500 italic mt-2">{ errors.message }</p> }
                                            </div>
                                        </div>
                                        <div className="flex items-center mt-5 md:mt-7">
                                            <button type="submit"
                                                className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap no-underline text-white btn-submit mr-10">
                                                Post Comment
                                            </button>
                                            <button type="button"
                                                className="rounded-lg border border-transparent bg-blue-100 px-5 py-2 max-h-[42px] font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}>
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
