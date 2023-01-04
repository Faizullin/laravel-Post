import { useForm, usePage } from "@inertiajs/inertia-react";

export default function EditPasswordForm(){
    const { user } = usePage().props.auth;
    const {data,setData,errors,patch,reset} = useForm({
        password_current: '',
        password: '',
        password_confirmation:'',
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.profile.updateProfile'),{
            data,
            onSuccess:(response) => {
                reset();
            }
        })
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    <span className="icon"><i className="mdi mdi-lock"></i></span>
                    Change Password
                </p>
            </header>
            <div className="card-content">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label" htmlFor="input-password_current">Current password</label>
                        <div className="control">
                            <input id="input-password_current" type="password" autoComplete="password_current" className="input" required
                                name="password_current" onChange={handleChange} value={data.password_current}/>
                        </div>
                        { errors.password_current ? (
                            <p className="text-red-500 text-xs italic">{ errors.password_current }</p>
                        ) : (
                            <p className="help">Required. Your current password</p>
                        ) }
                    </div>
                    <hr />
                    <div className="field">
                        <label className="label" htmlFor="input-password">New password</label>
                        <div className="control">
                            <input id="input-password" type="password" autoComplete="password" className="input" required
                                name="password" onChange={handleChange} value={data.password}/>
                        </div>
                        { errors.password ? (
                            <p className="text-red-500 text-xs italic">{ errors.password }</p>
                        ) : (
                            <p className="help">Required. New password</p>
                        ) }
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="input-password_confirmation">Confirm password</label>
                        <div className="control">
                            <input id="input-password_confirmation" type="password" autoComplete="password_confirmation" className="input" required
                                name="password_confirmation" onChange={handleChange} value={data.password_confirmation}/>
                        </div>
                        <p className="help">Required. New password one more time</p>
                    </div>
                    <hr />
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button green">
                            Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
