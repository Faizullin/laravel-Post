import { EditModal } from "../../Components/Dialog/TableEditModal";
import { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import InputBlock from "../../Components/Form/InputBlock";


export default function Edit({item:contact}){
    const {data,setData,errors,patch} = useForm({
        name: contact?.name || "",
        email: contact?.email || "",
        subject: contact?.subject || "",
        message: contact?.message || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    useEffect(()=>{
        if(contact){
            setData(data => ({
                ...data,
                ...contact,
            }))
        }
    },[contact]);

    function handleSubmit(e,{onSuccess}){
        e.preventDefault()
        patch(route('admin.contact.update',contact),{
            data,
            onSuccess,
        });
    }
    return (
        <EditModal id="edit-table-item-modal" title={`Edit Contact #${contact.id}`} onSubmit={handleSubmit} >
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
