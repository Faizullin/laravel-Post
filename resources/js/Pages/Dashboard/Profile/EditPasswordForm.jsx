import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";


export default function EditPasswordForm(){
    const { user } = usePage().props.auth;
    const {data,setData,errors,patch} = useForm({
        password_current: '',
        password: '',
        password_confirmation:'',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('dashboard.profile.updateProfile'),data);
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="w-full bg-white shadow-md">
            <form className="rounded  shadow p-6"
                onSubmit={handleSubmit}>
                <div className="pb-6">
                    <label htmlFor="password_current" className="font-semibold text-gray-700 block pb-1">Current password</label>
                    <div className="flex">
                        <input id="password_current" type="password" autoComplete="current-password"
                            className="border-1 rounded-r px-4 py-2 w-full" name="password_current"
                            onChange={handleChange} value={data.password_current}/>
                    </div>
                    { errors.password_current ? (
                        <p className="text-red-500 pt-2 italic">{ errors.password_current }</p>
                    ) : (
                        <p className="text-gray-600 pt-2 block opacity-70">Required. Your current password</p>
                    ) }
                </div>
                <div className="pb-4">
                    <label htmlFor="password_new" className="font-semibold text-gray-700 block pb-1">New password</label>
                    <input id="password_new" type="password" autoComplete="new-password" className="border-1 rounded-r px-4 py-2 w-full" required
                        name="password" onChange={handleChange} value={data.password}/>
                    { errors.password ? (
                        <p className="text-red-500 pt-2 italic">{ errors.password }</p>
                    ) : (
                        <p className="text-gray-600 pt-2 block opacity-70">Required. New password</p>
                    ) }
                </div>
                <div className="pb-4">
                    <label htmlFor="password_confirm" className="font-semibold text-gray-700 block pb-1">Confirm password</label>
                    <input id="password_confirm" type="password" autoComplete="new-password" className="border-1 rounded-r px-4 py-2 w-full"
                        name="password_confirmation" onChange={handleChange} value={data.password_confirmation}/>
                    <p className="text-gray-600 pt-2 block opacity-70">Required. New password one more time</p>
                </div>
                <button type="submit"
                    className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800 cursor-pointer">Save</button>
            </form>
        </div>
    );
}
