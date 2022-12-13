import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import InputBlock from "@Admin/Components/Form/InputBlock";



const Edit = NiceModal.create(({open,setOpen,title,tag}) => {
    const {data,setData,errors,patch} = useForm({
        title: tag.title || "",
        slug: tag.slug || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    // useEffect(()=>{
    //     if(open && tag){
    //         setData(data => ({
    //             ...tag,
    //         }));
    //     }
    // },[tag]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.tag.update',tag),{
            data,
            onSuccess:()=>{setOpen(false)},
        });
    }
    return (
        <EditModal title={`Edit Tag #${tag.id}`} open={open} setOpen={setOpen} onSubmit={handleSubmit}>
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
})

export default Edit;
