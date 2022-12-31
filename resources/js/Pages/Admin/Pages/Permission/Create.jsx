import { useForm } from '@inertiajs/inertia-react';
import { EditModal } from "../../Components/Dialog/TableEditModal";
import InputBlock from "../../Components/Form/InputBlock";

const Create = () => {
    const {data,setData,errors,post} = useForm({
        name: "",
        guard_name: "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        post(route('admin.permission.store'),{
            data,
            onSuccess,
        });
    }
    return (
        <EditModal id="create-table-item-modal" title="Create New Permission" onSubmit={handleSubmit} >
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputBlock
                        label="Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        error={errors.name}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                    <InputBlock
                        label="Guard Name"
                        name="guard_name"
                        value={data.guard_name}
                        onChange={handleChange}
                        error={errors.guard_name}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                </div>
            </form>
        </EditModal>
    );
}

export default Create;
