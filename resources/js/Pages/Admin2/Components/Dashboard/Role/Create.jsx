import { useForm } from '@inertiajs/inertia-react'
import CreateModal from '../Model/CreateModal';
import React from 'react'

export default function CreateUser({close}) {

    const {data, setData, post, reset, errors} = useForm({ name: '', email: '', password: '',role:null });
    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });
    const onSubmit = (e) => {
        e.preventDefault();
        post(route(`admin.user.store`), {
            data,
            onSuccess: () => {
                reset(),
                handleClose(false)
            },
        });
    }


    return (
        <CreateModal modelName="user" onSubmit={onSubmit}>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="col-form-label">Name:</label>
                    <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name"/>
                    {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="username" className="col-form-label">Role:</label>
                    <input type="text" className="form-control" name='username' value={data.role} onChange={onChange} id="username"/>
                    {errors && <div className='text-danger mt-1'>{errors.username}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="col-form-label">Email:</label>
                    <input type="email" className="form-control" name='email' value={data.email} onChange={onChange} id="email"/>
                    {errors && <div className='text-danger mt-1'>{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="col-form-label">Password:</label>
                    <input type="password" className="form-control" name='password' value={data.password} onChange={onChange} id="password"/>
                    {errors && <div className='text-danger mt-1'>{errors.password}</div>}
                </div>
            </form>
        </CreateModal>
    )
}
