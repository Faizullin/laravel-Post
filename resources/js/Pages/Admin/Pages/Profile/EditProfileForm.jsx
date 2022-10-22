import { useForm, usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";


export default function EditProfileForm(){
    const { user } = usePage().props.auth;
    const {data,setData,errors,patch} = useForm({

    });
    useEffect(() => {
        setData({...user});
    },[]);
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data)
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }
    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                Edit Profile
                </p>
            </header>
            <div className="card-content">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Avatar</label>
                        <div className="field-body">
                            <div className="field file">
                                <label className="upload control">
                                <a className="button blue">
                                    Upload
                                </a>
                                {/* <input type="file"/> */}
                                </label>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input type="text" autoComplete="on" className="input" required
                                        name='name' value={ data.name } onChange={ handleChange }/>
                                </div>
                                <p className="help">Required. Your name</p>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">E-mail</label>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input type="email" autoComplete="on" className="input" required
                                        name='email' value={ data.email } onChange={ handleChange }/>
                                </div>
                                <p className="help">Required. Your e-mail</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
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
    )
}
