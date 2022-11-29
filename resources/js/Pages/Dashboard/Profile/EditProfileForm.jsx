import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";


export default function EditProfileForm(){
    const { user } = usePage().props.auth;
    const {data,setData,errors,patch} = useForm({
        name:'',
        email:'',
    });
    useEffect(() => {
        setData({
            name:  user.name,
            email: user.email,
        });
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('dashboard.profile.update'),data);
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    return(
        <form className="block md:flex mb-2"
            onSubmit={handleSubmit}>
            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                <div className="flex justify-between">
                <span className="text-xl font-semibold block">Admin Profile</span>
                    <button type="submit" className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
                        Edit
                    </button>
                </div>

                <span className="text-gray-600">This information is secret so be careful</span>
                <div className="w-full p-8 mx-2 flex justify-center">
                <img id="showImage" className="max-w-xs w-32 items-center border"
                    src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt=""/>
                </div>
            </div>
            <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                <div className="rounded  shadow p-6">
                    <div className="pb-6">
                        <label htmlFor="profile-name" className="font-semibold text-gray-700 block pb-1">Name</label>
                        <div className="flex">
                            <input id="profile-name" type="text" autoComplete="on"
                                className="border-1  rounded-r px-4 py-2 w-full"
                                name='name' value={ data.name } onChange={ handleChange } />
                        </div>
                        { errors.name ? (
                            <p className="text-red-500 pt-2 italic">{ errors.name }</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">Required. Your name</p>
                        ) }
                    </div>
                    <div className="pb-4">
                        <label htmlFor="profile-email" className="font-semibold text-gray-700 block pb-1">Email</label>
                        <input id="profile-email" className="border-1 rounded-r px-4 py-2 w-full" type="email"
                            name='email' value={ data.email } onChange={ handleChange } />
                        { errors.email ? (
                            <p className="text-red-500 pt-2 italic">{ errors.email }</p>
                        ) : (
                            <p className="text-gray-600 pt-2 block opacity-70">Required. Your email</p>
                        ) }
                    </div>
                </div>
            </div>
        </form>
    )
}
