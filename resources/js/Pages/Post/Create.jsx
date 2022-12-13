import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import { useForm } from '@inertiajs/inertia-react';

import { Multiselect } from 'react-widgets';
import CropprtInput from "@/Components/Post/Form/CopperInput";
import InputBlock from "@/Components/Post/Form/InputBlock";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Breadcrumb from "@/Components/Breadcrumb";



export default function Create({tags,categories}){
    tags = tags.data;
    categories = categories.data;
    const {data,setData,post,errors,progress } = useForm({
        title:"",
        description:"",
        body:"",
        category:null,
        tags:[],
        image_path: null,
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    };
    const setQuillText = (value,column) => handleChange({target:{name:column,value,}});

    function handleSubmit(e){
        e.preventDefault();
        post(route(`post.store`), {
           // method: 'post',
            data,
        })
    }

    useEffect(()=>{
        console.log("Effect Error",errors)
    },[errors]);

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
                                        <InputBlock
                                            label="Title"
                                            value={data.title}
                                            name="title"
                                            handleChange={handleChange}
                                            error={errors.title}/>
                                        <InputBlock
                                            label="Description"
                                            value={data.description}
                                            name="description"
                                            error={errors.description}>
                                            <ReactQuill theme="snow" value={data.description} onChange={(value) => setQuillText(value,'description')} />
                                        </InputBlock>
                                        <InputBlock
                                            label="Body"
                                            value={data.body}
                                            name="body"
                                            error={errors.body}>
                                            <ReactQuill theme="snow" value={data.body} onChange={(value) => setQuillText(value,'body')} />
                                        </InputBlock>
                                        <InputBlock
                                            label="Category"
                                            value={data.category}
                                            name="category"
                                            error={errors.category}>
                                            <select className='block'
                                                name="category" id="input-category" onChange={handleChange} defaultValue={''}>
                                                <option value={''} disabled={true}>Choose category</option>
                                                { categories.map((category,index) => (
                                                    <option key={category.id} value={category.id}>{category.title}</option>
                                                )) }
                                            </select>
                                        </InputBlock>
                                        <InputBlock
                                            label="Tags"
                                            name="tags"
                                            error={errors.tags}>
                                            <div className="relative">
                                                <Multiselect
                                                    id='input-tags'
                                                    dataKey="id"
                                                    textField="title"
                                                    data={ tags }
                                                    filter='contains'
                                                    onChange={value => setTags(value)}
                                                />
                                            </div>
                                            { !errors.tags && <p className="text-gray-600 text-xs  italic mt-2">Select Tags</p> }
                                        </InputBlock>
                                        <InputBlock
                                            label="Logo Image"
                                            name="image_path"
                                            error={errors.image_path}>
                                            <CropprtInput id="logo-image" onChange={(file) => setData(data => ({
                                                ...data,
                                                image_path:file,
                                            }))}/>
                                            { !errors.image_path && <p className="text-gray-600 text-xs  italic mt-2">Upload Logo Image</p> }
                                            { progress && (
                                                <progress value={progress.percentage} max="100">
                                                    {progress.percentage}%
                                                </progress>
                                            )}
                                        </InputBlock>
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
