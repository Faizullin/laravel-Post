import { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { EditModal } from "../../Components/Dialog/TableEditModal";
import InputBlock from "../../Components/Form/InputBlock";

const Edit = ({item:permission}) => {
    const {data,setData,errors,patch} = useForm({
        name: permission?.name || "",
        guard_name: permission?.guard_name || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(()=>{
        if(permission){
            setData(data => ({
                ...data,
                ...permission,
            }));
        }
    },[permission]);
    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        patch(route('admin.permission.update',permission),{
            data,
            onSuccess,
        });
    }
    return (
        <EditModal id="edit-table-item-modal" title={`Edit Permission #${permission.id}`} onSubmit={handleSubmit}>
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

export default Edit;
