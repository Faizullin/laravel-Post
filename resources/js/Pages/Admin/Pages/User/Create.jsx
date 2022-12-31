import { EditModal } from '../../Components/Dialog/TableEditModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { Multiselect } from 'react-widgets';
import InputBlock from '../../Components/Form/InputBlock';



export default function Create(){
    const { data:roles } = usePage().props.roles;
    const {data,setData,errors,post} = useForm({
        name:"",
        email:"",
        roles: [],
        password:"",
        password_confirmation:"",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setRoles = (values) => {
        setData(data => ({
            ...data,
            roles: values.map(item => item.id)
        }));
    };
    const handleSubmit = (e,{onSuccess}) => {
        e.preventDefault()
        post(route('admin.user.store'),{
            data,
            onSuccess,
        });
    }

    return (
        <EditModal id="create-table-item-modal" title="Create New User" onSubmit={handleSubmit} >
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
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        error={errors.email}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                    <InputBlock
                        label="Password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        error={errors.password}
                        className="w-full px-3 mb-6 md:mb-0"
                        />
                    <InputBlock
                        label="Password Confirm"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        onChange={handleChange}
                        error={errors.password_confirmation}
                        className="w-full px-3 mb-6 md:mb-0"
                        />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputBlock
                        label="Roles"
                        name="roles"
                        error={errors.roles}>
                        <div className="relative">
                            <Multiselect
                                id='input-roles'
                                dataKey="id"
                                textField="name"
                                data={ roles }
                                filter='contains'
                                onChange={value => setRoles(value)}
                            />
                        </div>
                        { !errors.roles && <p className="text-gray-600 text-xs italic">Select Roles</p>  }
                    </InputBlock>
                </div>
            </form>
        </EditModal>
    );
}
