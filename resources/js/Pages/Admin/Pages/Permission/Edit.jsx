import EditModal from "../../Components/Table/EditModal";
import { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";



export default function Edit({st,setSt,title,item}){
    const permission = item;
    const {data,setData,errors,patch} = useForm({
        name: permission.name || "",
        guard_name: permission.guard_name || "web",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });


    useEffect(()=>{
        if(st && permission){
            setData(data => ({
                ...permission,
            }));
        }
    },[permission]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.permission.update',permission),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }
    return (
        <EditModal st={st} setSt={setSt} title={`Edit Permission #${permission.id}`} onSubmit={handleSubmit}>
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-guard_name">
                            Guard Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-guard_name" type="text" placeholder="web"
                            onChange={handleChange} value={data.guard_name} name="guard_name"/>
                        { errors.guard_name && <p className="text-red-500 text-xs italic">{ errors.guard_name }</p> }
                    </div>
                </div>
            </form>
        </EditModal>
    );
}
