import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";



export default function Edit({st,setSt,title,item:category}){
    console.log(item===category)
    const {data,setData,errors,patch} = useForm({
        title: category.title || "",
        slug: category.slug || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(()=>{
        if(st && category){
            setData(data => ({
                ...category,
            }));
        }
    },[category]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.category.update',category),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }
    return (
        <EditModal st={st} setSt={setSt} title={`Edit category #${category.id}`} onSubmit={handleSubmit}>
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-slug">
                            Slug
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-slug" type="text"
                            onChange={handleChange} value={data.slug} name="slug"/>
                        { errors.slug && <p className="text-red-500 text-xs italic">{ errors.slug }</p> }
                    </div>
                </div>
            </form>
        </EditModal>
    );
}
