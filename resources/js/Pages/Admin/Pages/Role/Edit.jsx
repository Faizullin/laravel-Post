import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { EditModal } from "../../Components/Dialog/TableEditModal";

import InputBlock from "../../Components/Form/InputBlock";
import { Multiselect } from 'react-widgets';

const Edit = ({item:role}) => {
    const { permissions } = usePage().props
    const {data,setData,errors,post} = useForm({
        name: role.name || "",
        guard_name: role.guard_name || "web",
        permissions:[],
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const handleSubmit = (e,{onSuccess}) => {
        e.preventDefault()
        post(route('admin.role.update'),{
            data,
            onSuccess,
        });
    }
    const setPermissions = (values) => {
        setData(data => ({
            ...data,
            permissions: values.map(item => item.id)
        }));
    }
    useEffect(()=>{
        if(role){
            setData(data => ({
                ...data,
                ...role,
            }))
        }
    },[role]);
    return (
        <EditModal id="edit-table-item-modal" title={`Edit Role #${role.id}`} onSubmit={handleSubmit} >
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
                        label="Guard name"
                        name="guard_name"
                        value={data.guard_name}
                        onChange={handleChange}
                        error={errors.guard_name}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputBlock
                        label="Slug"
                        name="slug"
                        value={data.slug}
                        onChange={handleChange}
                        error={errors.slug}
                        className="w-full px-3">
                        <Multiselect
                            id="input-permissions"
                            dataKey="id"
                            textField="name"
                            defaultValue={data.permissions}
                            data={permissions}
                            filter='contains'
                            onChange={value => setPermissions(value)}
                        />
                    </InputBlock>
                </div>
            </form>
        </EditModal>
    );
}


export default Edit;
