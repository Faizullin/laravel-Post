import { EditModal } from '../../Components/Dialog/TableEditModal';
import { useForm, usePage } from '@inertiajs/inertia-react';
import InputBlock from '../../Components/Form/InputBlock';



export default function Create(){
    const {data,setData,errors,post} = useForm({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        post(route('admin.contact.store'),{
            data,
            onSuccess,
        });
    }

    return (
        <EditModal id="create-table-item-modal" title="Create New Contact" onSubmit={handleSubmit} >
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
                        label="Subject"
                        name="subject"
                        value={data.subject}
                        onChange={handleChange}
                        error={errors.subject}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        />
                    <InputBlock
                        label="Message"
                        name="message"
                        value={data.message}
                        onChange={handleChange}
                        error={errors.message}
                        className="w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        >

                    </InputBlock>
                </div>
            </form>
        </EditModal>
    );
}
