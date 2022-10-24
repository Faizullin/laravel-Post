import CreateModal from '../../Components/Table/CreateModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Multiselect } from 'react-widgets';



export default function Create({st,setSt,title}){
    const {data,setData,errors,post} = useForm({
        title:"",
        slug:"",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    function handleSubmit(e){
        e.preventDefault()
        post(route('admin.tag.store'),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }

    return (
        <CreateModal title={`Create New Tag`} st={st} setSt={setSt} onSubmit={handleSubmit} >
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text"
                            onChange={handleChange} value={data.title} name="title"/>
                        { errors.title && <p className="text-red-500 text-xs italic">{ errors.title }</p> }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-slug">
                            Slug
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-slug" type="text"
                            onChange={handleChange} value={data.slug} name="slug"/>
                        { errors.slug && <p className="text-red-500 text-xs italic">{ errors.slug }</p> }
                    </div>
                </div>
            </form>
        </CreateModal>
    );
}
