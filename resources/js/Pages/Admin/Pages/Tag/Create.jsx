import CreateModal from '../../Components/Table/CreateModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import InputBlock from "@Admin/Components/Form/InputBlock";


const Create = NiceMocal.create(({open,setOpen,title}) => {
    const {data,setData,errors,post} = useForm({
        title:"",
        slug:"",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    function handleSubmit(e){
        e.preventDefault()
        post(route('admin.tag.store'),{
            data,
            onSuccess:()=>{setOpen(false)},
        });
    }

    return (
        <CreateModal title={`Create New Tag`} open={open} setOpen={setOpen} onSubmit={handleSubmit} >
            <form className='w-full max-w-lg'
                onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <InputBlock 
                        label="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                    <InputBlock 
                        label="Slug"
                        name="slug"
                        value={data.slug}
                        onChange={handleChange}
                        error={errors.slug}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                </div>
            </form>
        </CreateModal>
    );
})


export default Create;