import CreateModal from '../../Components/Table/CreateModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useEffect } from 'react';
import { Multiselect } from 'react-widgets';



export default function Create({st,setSt,title}){
    const { data:tags } = usePage().props.tags;
    const {data,setData,errors,post} = useForm({
        title:"",
        description:"",
        content:"",
        author:null,
        category:null,
        tags:[],
        file_path: "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    };
    function handleSubmit(e){
        e.preventDefault()
        post(route('admin.post.store'),{
            data,
            onSuccess:()=>{setSt(false)},
        });
    }
    return (
        <CreateModal title={`Create New Post``} st={st} setSt={setSt} onSubmit={handleSubmit} >
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-tags">
                            Tags
                        </label>

                        <div className="relative">
                            <Multiselect
                                id='grid-tags'
                                dataKey="id"
                                textField="title"
                                data={ tags }
                                filter='contains'
                                onChange={value => setTags(value)}
                            />
                        </div>
                        { errors.tags ?
                            <p className="text-red-500 text-xs italic">{ errors.tags }</p>
                            :
                            <p className="text-gray-600 text-xs italic">Select Tags</p>
                         }

                    </div>
                </div>
            </form>
        </CreateModal>
    );
}
