import { useForm } from "@inertiajs/inertia-react"
import { useEffect } from "react";
import Layout from "../../Layouts/Layout";
import EditPasswordForm from "./EditPasswordForm";
import EditProfileForm from "./EditProfileForm";

export default function Profile(props){
    const { user } = props.auth;
    return (
        <Layout linkTitle="Profile">
            <section className="section main-section">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account"></i></span>
                            Profile
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="image w-48 h-48 mx-auto">
                                <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" className="rounded-full"/>
                            </div>
                            <hr/>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" readOnly className="input is-static"
                                        value={ user.name }/>
                                </div>
                            </div>
                            <hr/>
                            <div className="field">
                                <label className="label">E-mail</label>
                                <div className="control">
                                    <input type="text" readOnly className="input is-static"
                                        value={ user.email } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditProfileForm />

                </div>
            <EditPasswordForm />
            </section>
        </Layout>
    )
}
