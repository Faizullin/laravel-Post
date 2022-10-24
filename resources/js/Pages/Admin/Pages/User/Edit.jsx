import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";



export default function Edit(props){
    const user = props.item;
    const { data:roles } = usePage().props.roles;
    const {data,setData,errors,patch} = useForm({
        name: user.name || "",
        email: user.email || "",
        roles:[],
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setRoles = (values) => {
        setData(data => ({
            ...data,
            roles: values.map(item => item.id)
        }));
    }
    useEffect(()=>{
        console.log(user)
        if(props.st && user){
            console.log(roles,user)
            setData(data => ({
                ...user,
                roles: user.roles.map(item => item.id)
            }));
        }
    },[user]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.user.update',user),{
            data,
            onSuccess:()=>{props.setSt(false)},
        });
    }
    return (
        <EditModal st={props.st} setSt={props.setSt} title={`Edit User #${user.id}`} onSubmit={handleSubmit}>
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
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                            Email
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-email" type="email"
                            onChange={handleChange} value={data.email} name="email"/>
                        { errors.email && <p className="text-red-500 text-xs italic">{ errors.email }</p> }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Roles
                        </label>

                        <div className="relative">
                            <Multiselect
                                dataKey="id"
                                textField="name"
                                defaultValue={data.roles}
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
        </EditModal>
    );
}
