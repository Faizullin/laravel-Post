import { useEffect, useState } from "react";
import { useForm } from '@inertiajs/inertia-react';
import Breadcrumb from "@/Components/Breadcrumb";
import { Multiselect } from 'react-widgets';
import CropprtInput from '@/Components/Post/CopperInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function Index({auth,tags,categories}){
    let { data:tags } = tags;
    let { data:categories } = categories;
    const {data,setData,errors,post,progress } = useForm({
        title:"",
        description:"",
        body:"",
        user:null,
        category:null,
        tags:[],
        image_path: null,
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    useEffect(()=>console.log("Data => ",data),[data])
    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    };
    const setQuillText = (value,column) => {
        handleChange({target:{name:column,value,}});
    };

    function handleSubmit(e){
        e.preventDefault()
        post(route('post.store'),data);
    }
    return (
        <Layout>
            {/* errors={ errors } */}
            <Head title={"Posts"} />
            <Breadcrumb title="Posts">
                <h2>Post</h2>
                <p>Odio et unde deleniti. Deserunt numquam exercitationem. Officiis quo odio sint voluptas consequatur ut a odio voluptatem. Sit dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit quaerat ipsum dolorem.</p>
            </Breadcrumb>
            {/* <section id="blog" className="blog">
                <div className="container mx-auto" data-aos="fade-up">
                    <Sidebar.TriggerButton onClick={ () => setFiltersSidebarOpen(!filtersSidebarOpen) } />
                    <div className="flex">
                        <div className="md:w-2/3 ">
                            <PostItem post={post} />
                        </div>
                        <Sidebar open={filtersSidebarOpen}/>
                    </div>
                </div>
            </section> */}
            <section id="blog" className="blog">
                <div className="container mx-auto sm:px-4" data-aos="fade-up">
                    <div className="flex flex-wrap  g-5">
                        <div className="lg:w-2/3 pr-4 pl-4">
                            <form onSubmit={handleSubmit}>
                            <div className="mb-10">
                                <label className="text-xl text-gray-600 block mb-2"
                                        htmlFor='title'>Title</label>
                                    <input type="text" className="border-2 border-gray-300 p-2 w-full"
                                        name="title" id="title"
                                        value={data.title} onChange={handleChange}/>
                                    { errors.title ? <p className="text-red-500 text-xs italic mt-2">{ errors.title }</p> : "" }
                                </div>

                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2">Description</label>
                                    <ReactQuill theme="snow" value={data.description} onChange={(value) => setQuillText(value,'description')} />
                                    { errors.description ? <p className="text-red-500 text-xs  italic mt-2">{ errors.description }</p> : "" }
                                </div>

                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2">Body</label>
                                    <ReactQuill theme="snow" value={data.body} onChange={(value) => setQuillText(value,'body')} />
                                    { errors.body ? <p className="text-red-500 text-xs  italic mt-2">{ errors.body }</p> : "" }
                                </div>

                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2"
                                        htmlFor="category">Category</label>
                                    <select className='block'
                                        name="category" id="category" onChange={handleChange} defaultValue={''}>
                                        <option value={''} disabled={true}>Choose category</option>
                                        { categories.map((category,index) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        )) }
                                    </select>
                                    { errors.category ? <p className="text-red-500 text-xs  italic mt-2">{ errors.category }</p> : "" }
                                </div>
                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2"
                                        htmlFor="user">Author(user)</label>
                                    <select className='block'
                                        name="user" id="user" onChange={handleChange} defaultValue={''}>
                                        <option value={''} disabled={true}>Choose Author</option>
                                        { users.map((user,index) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        )) }
                                    </select>
                                    { errors.user ? <p className="text-red-500 text-xs  italic mt-2">{ errors.user }</p> : "" }
                                </div>

                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2"
                                        htmlFor="tags">
                                        Tags
                                    </label>
                                    <div className="relative">
                                        <Multiselect
                                            id='tags'
                                            dataKey="id"
                                            textField="title"
                                            data={ tags }
                                            filter='contains'
                                            onChange={value => setTags(value)}
                                        />
                                    </div>
                                    { errors.tags ?
                                        <p className="text-red-500 text-xs  italic mt-2">{ errors.tags }</p>
                                        :
                                        <p className="text-gray-600 text-xs  italic mt-2">Select Tags</p>
                                    }
                                </div>

                                <div className="mb-10">
                                    <label className="text-xl text-gray-600 block mb-2"
                                        htmlFor="logo-image">
                                        Logo Image
                                    </label>
                                    <CropprtInput id="logo-image" onChange={(file) => setData(data => ({
                                        ...data,
                                        image_path:file,
                                    }))}/>
                                    { errors.image_path ?
                                        <p className="text-red-500 text-xs  italic mt-2">{ errors.image_path }</p>
                                        :
                                        <p className="text-gray-600 text-xs  italic mt-2">Upload Logo Image</p>
                                    }
                                        {progress && (
                                        <progress value={progress.percentage} max="100">
                                            {progress.percentage}%
                                        </progress>
                                        )}
                                </div>

                                <div className="flex p-1">
                                    {/* <select className="border-2 border-gray-300 border-r p-2" name="action">
                                        <option>Save and Publish</option>
                                        <option>Save Draft</option>
                                    </select> */}
                                    <button role="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                                        type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                        <Sidebar />
                    </div>
                </div>
            </section>
        </Layout>
    )
}
