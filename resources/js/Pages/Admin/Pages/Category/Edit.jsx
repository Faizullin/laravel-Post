import { EditModal } from "../../Components/Dialog/TableEditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import InputBlock from "../../Components/Form/InputBlock";



export default function Edit({item:category}){
    const {data,setData,errors,patch} = useForm({
        title: category?.title || "",
        slug: category?.slug || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(()=>{
        if(category){
            setData(data => ({
                ...category,
            }));
        }
    },[category]);
    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        patch(route('admin.category.update',category),{
            data,
            onSuccess,
        })
    }
    return (
        <EditModal id="edit-table-item-modal" title={`Edit Category #${category.id}`} onSubmit={handleSubmit} >
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
