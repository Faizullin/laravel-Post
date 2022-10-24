import CreateModal from '../../Components/Table/CreateModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Multiselect } from 'react-widgets';



export default function Create({st,setSt,title}){
    const { permissions } = usePage().props;
    const {data,setData,errors,post} = useForm({
        name:"",
        guard_name:"",
        permissions: [],
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setPermissions = (values) => {
        setData(data => ({
            ...data,
            permissions: values.map(item => item.id)
        }));
    };
    function handleSubmit(e){
        e.preventDefault()
        post(route('admin.role.store'),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }
    return (
        <CreateModal title={`Create New Role`} st={st} setSt={setSt} onSubmit={handleSubmit} >
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
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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
                                //defaultValue={[1]}
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
        </CreateModal>
    );
}
