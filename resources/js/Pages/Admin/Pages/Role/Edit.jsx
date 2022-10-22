import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";



export default function Edit(props){
    const role = props.item;
    const { permissions } = usePage().props;
    const {data,setData,errors,patch} = useForm({
        name: role.name || "",
        guard_name: role.guard_name || "",
        permissions:[],
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setPermissions = (values) => {
        setData(data => ({
            ...data,
            permissions: values.map(item => item.id)
        }));
    }
    useEffect(()=>{
        if(props.st && role){
            setData(data => ({
                ...role,
                permissions: role.permissions.map(item => item.id)
            }));
        }
    },[role]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.role.update',role),{
            data,
            onSuccess:()=>{props.setSt(false)},
        });
    }
    return (
        <EditModal st={props.st} setSt={props.setSt} title={`Edit Role #${role.id}`} onSubmit={handleSubmit}>
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                            Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-name" type="text" placeholder="Jane"
                            onChange={handleChange} value={data.name} name="name"/>
                        { errors.name && <p className="text-red-500 text-xs italic">{ errors.name }</p> }
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-guard_name">
                            Guard Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-guard_name" type="text" placeholder="Doe"
                            onChange={handleChange} value={data.guard_name} name="guard_name"/>
                        { errors.guard_name && <p className="text-red-500 text-xs italic">{ errors.guard_name }</p> }
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                            Permissions
                        </label>

                        <div className="relative">
                            <Multiselect
                                dataKey="id"
                                textField="name"
                                defaultValue={data.permissions}
                                data={ permissions }
                                filter='contains'
                                onChange={value => setPermissions(value)}
                            />
                        </div>
                        { errors.permissions ?
                            <p className="text-red-500 text-xs italic">{ errors.permissions }</p>
                            :
                            <p className="text-gray-600 text-xs italic">Select Permissions</p>
                         }
                    </div>
                </div>
            </form>
        </EditModal>
    );
}
