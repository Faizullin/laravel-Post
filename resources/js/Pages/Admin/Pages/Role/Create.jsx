import { useForm, usePage } from '@inertiajs/inertia-react';
import { EditModal } from "../../Components/Dialog/TableEditModal";

import InputBlock from "../../Components/Form/InputBlock";
import MultiSelect from '../../Components/Form/MultiSelect';

const Create = ({}) => {
    const { permissions } = usePage().props
    const {data,setData,errors,post} = useForm({
        name: "",
        guard_name: "web",
        permissions:[],
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const handleSubmit = (e,{onSuccess}) => {
        e.preventDefault()
        post(route('admin.role.store'),{
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

    return (
        <EditModal id="create-table-item-modal" title="Create New Role" onSubmit={handleSubmit} >
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
                        <MultiSelect
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


export default Create;
