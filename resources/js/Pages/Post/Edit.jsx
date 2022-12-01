import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";

import { useForm } from '@inertiajs/inertia-react';
import { Multiselect } from 'react-widgets';
import CropperInput from "@/Components/Post/Create/CopperInput";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Breadcrumb from "@/Components/Breadcrumb";
import { Inertia } from "@inertiajs/inertia";



export default function Edit({tags,categories,post}){
    tags = tags.data;
    categories = categories.data;
    post = post.data

    const {data,setData,errors,patch,progress } = useForm({
        title: post.title || "",
        description: post.description || "",
        body: post.body || "",
        category: post.category?.id || null,
        tags: post.tags?.map(item => item.id),
        image_path: post.imageUrl || null,
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    };
    const setQuillText = (value,column) => {
        console.log("CHange quill",value,column)
        handleChange({target:{name:column,value,}});
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log("Submit",data)
        patch(route(`post.update`,post), data);
    }


    const convertToPreviewPost = () => {
        console.log("Convert to postt")
        const tmpPost = {...data};
        tmpPost.imageUrl = tmpPost.image_path;
        tmpPost.tags = [];
        tmpPost.category = {id:tmpPost.category}

        return tmpPost
    }


    useEffect(()=>{console.log(data)},[data])
    return (
        <Layout linkTitle="Post">
            <Head title={"Create New Post"} />
            <Breadcrumb title={`Posts`} />
            <section className="">
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="card w-full lg:w-1/2 md:2/3 ">
                        <header className="card-header">
                            <p className="card-header-title">
                                <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                                Create New Post
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden">
                                    <form onSubmit={handleSubmit}
                                        className="p-6 w-full">
                                        <div className="mb-10">
                                            <label className="text-xl text-gray-600 block mb-2"
                                                htmlFor='title'>Title</label>
                                            <input type="text" className="border-2 border-gray-300 p-2 w-full"
                                                name="title" id="title"
                                                value={data.title} onChange={handleChange}/>
                                            { errors.title && <p className="text-red-500 text-xs italic mt-2">{ errors.title }</p> }
                                        </div>

                                        <div className="mb-10">
                                            <label className="text-xl text-gray-600 block mb-2">Description</label>
                                            <ReactQuill theme="snow" name="description"
                                                defaultValue={data.description} onChange={(value) => setQuillText(value,'description')} />
                                            { errors.description && <p className="text-red-500 text-xs  italic mt-2">{ errors.description }</p> }
                                        </div>

                                        <div className="mb-10">
                                            <label className="text-xl text-gray-600 block mb-2">Body</label>
                                            <ReactQuill theme="snow" name="body"
                                                defaultValue={data.body} onChange={(value) => setQuillText(value,'body')} />
                                            { errors.body && <p className="text-red-500 text-xs  italic mt-2">{ errors.body }</p> }
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
                                            <CropperInput id="logo-image"
                                                defaultValue={post.imageUrl}
                                                onChange={(file) => setData(data => ({
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

                                        <div className="flex justify-start p-1">
                                            <button role="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                                                type='submit'>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
