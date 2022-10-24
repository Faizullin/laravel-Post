import CreateModal from '../../Components/Table/CreateModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Multiselect } from 'react-widgets';



export default function Create(props){
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
        console.log("Set",values)
        setData(data => ({
            ...data,
            roles: values.map(item => item.id)
        }));
    };
    function handleSubmit(e){
        e.preventDefault()
        post(route('admin.user.store'),{
            data,
            onSuccess:()=>{props.setSt(false)},
        });
    }
    console.log(roles)
    return (
        <CreateModal title={props.title} st={props.st} setSt={props.setSt} onSubmit={handleSubmit} >
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                            Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text"
                            onChange={handleChange} value={data.name} name="name"/>
                        { errors.name && <p className="text-red-500 text-xs italic">{ errors.name }</p> }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email"
                            onChange={handleChange} value={data.guard_name} name="email"/>
                        { errors.email && <p className="text-red-500 text-xs italic">{ errors.email }</p> }
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Password
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password" type="password"
                            onChange={handleChange} value={data.password} name="password"/>
                        { errors.password && <p className="text-red-500 text-xs italic">{ errors.password }</p> }
                    </div>
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password_confirmation">
                            Password Confirm
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-password_confirmation" type="password"
                            onChange={handleChange} value={data.password_confirmation} name="password_confirmation"/>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-roles">
                            Roles
                        </label>

                        <div className="relative">
                            <Multiselect
                                id='grid-roles'
                                dataKey="id"
                                textField="name"
                                data={ roles }
                                filter='contains'
                                onChange={value => setRoles(value)}
                            />
                        </div>
                        { errors.roles ?
                            <p className="text-red-500 text-xs italic">{ errors.roles }</p>
                            :
                            <p className="text-gray-600 text-xs italic">Select Roles</p>
                         }

                    </div>
                </div>
            </form>
        </CreateModal>
    );
}
