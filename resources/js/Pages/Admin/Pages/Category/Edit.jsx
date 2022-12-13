import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";



export default function Edit({open,setOpen,title,item:category}){
    const {data,setData,errors,patch} = useForm({
        title: category.title || "",
        slug: category.slug || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(()=>{
        if(open && category){
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
        <EditModal open={open} setOpen={setOpen} title={`Edit category #${category.id}`} onSubmit={handleSubmit}>
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputBlock 
                        label="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                    <InputBlock 
                        label="Slug"
                        name="slug"
                        value={data.slug}
                        onChange={handleChange}
                        error={errors.slug}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                </div>
            </form>
        </EditModal>
    );
}
