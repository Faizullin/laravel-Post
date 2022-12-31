import { useForm } from '@inertiajs/inertia-react';
import { EditModal } from "../../Components/Dialog/TableEditModal";
import InputBlock from "../../Components/Form/InputBlock";

const Create = () => {
    const {data,setData,errors,post} = useForm({
        title: "",
        slug: "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        return post(route('admin.tag.store'),{
            data,
            onSuccess,
        });
    }

    return (
        <EditModal id="create-table-item-modal" title="Create New Tag" onSubmit={handleSubmit} >
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


export default Create;
