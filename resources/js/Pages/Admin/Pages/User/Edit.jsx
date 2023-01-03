import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Multiselect } from 'react-widgets';
import { EditModal } from '../../Components/Dialog/TableEditModal';
import InputBlock from '../../Components/Form/InputBlock';



export default function Edit({item:user}){
    const { data:roles } = usePage().props.roles;
    const {data,setData,errors,patch} = useForm({
        name: user?.name || "",
        email: user?.email || "",
        roles:[],
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
        patch(route('admin.user.update',user),{
            data,
            onSuccess,
        });
    }

    useEffect(()=>{
        if(user){
            setData(data => ({
                ...data,
                ...user,
                roles: user?.roles?.map(item => item.id) || [],
            }));
        }
    },[user]);

    return (
        <EditModal id="edit-table-item-modal" title={`Edit User #${user.id}`} onSubmit={handleSubmit} >
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
                                defaultValue={data.roles}
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
