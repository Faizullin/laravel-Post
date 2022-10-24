import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";



export default function Edit({st,setSt,title,item:post}){
    const { data:tags } = usePage().props.tags;
    const {data,setData,errors,post} = useForm({
        title: post.title || "",
        description: post.description || "",
        content: post.content || "",
        author:post.author || null,
        category:post.category || null,
        tags: post.tags || [],
        file_path: post.file_path || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    }
    useEffect(()=>{
        if(st && post){
            setData(data => ({
                ...post,
                tags: post.tags.map(item => item.id)
            }));
        }
    },[post]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.post.update',post),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }
    return (
        <EditModal st={st} setSt={setSt} title={`Edit Post #${post.id}`} onSubmit={handleSubmit}>
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text"
                            onChange={handleChange} value={data.title} name="title"/>
                        { errors.title && <p className="text-red-500 text-xs italic">{ errors.title }</p> }
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email"
                            onChange={handleChange} value={data.email} name="email"/>
                        { errors.email && <p className="text-red-500 text-xs italic">{ errors.email }</p> }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-tags">
                            Tags
                        </label>

                        <div className="relative">
                            <Multiselect
                                id="grid-tags"
                                dataKey="id"
                                textField="name"
                                defaultValue={data.tags}
                                data={ tags }
                                filter='contains'
                                onChange={value => setTags(value)}
                            />
                        </div>
                        { errors.tags ?
                            <p className="text-red-500 text-xs italic">{ errors.tags }</p>
                            :
                            <p className="text-gray-600 text-xs italic">Select Tags</p>
                         }
                    </div>
                </div>
            </form>
        </EditModal>
    );
}
