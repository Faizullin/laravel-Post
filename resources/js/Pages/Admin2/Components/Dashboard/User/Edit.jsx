import { useForm } from '@inertiajs/inertia-react'
import React, { useEffect } from 'react'
import CreateModal from '../Model/CreateModal';

export default function EditUser({model}) {

    const {data, setData, put, reset, errors} = useForm({ name: model.name, email: model.email, username: model.username, address: model.address, password: model.password, });

    const onChange = (e) => setData({ ...data, [e.target.id]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        put(route('admin.user.update', model.id), {
            data,
            onSuccess: () => {
                reset(),
                close()
            },
        });
    }

    useEffect(() => {
        setData({...data,
            name: model.name, email: model.email, username: model.username, address: model.address, password: model.password
        });
    }, [model]);

    return (
        <CreateModal onSubmit={onSubmit}>
            <form onSubmit={onSubmit}>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label">Name:</label>
                        <input type="text" className="form-control" name='name' value={data.name} onChange={onChange} id="name"/>
                        {errors && <div className='text-danger mt-1'>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="col-form-label">Username:</label>
                        <input type="text" className="form-control" name='username' value={data.username} onChange={onChange} id="username"/>
                        {errors && <div className='text-danger mt-1'>{errors.username}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label">Email:</label>
                        <input type="email" className="form-control" name='email' value={data.email} onChange={onChange} id="email"/>
                        {errors && <div className='text-danger mt-1'>{errors.email}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn bg-gradient-primary">Update</button>
                </div>
            </form>
        </CreateModal>

    )
}
