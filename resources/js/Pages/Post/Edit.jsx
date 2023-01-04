import { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import { useForm } from '@inertiajs/inertia-react';

import { DeleteConfirmModal } from "@/Components/Dialog/DeleteConfirmModal";

import { Multiselect } from 'react-widgets';
import CropprtInput from "@/Components/Post/Form/CopperInput";
import InputBlock from "@/Components/Post/Form/InputBlock";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Breadcrumb from "@/Components/Breadcrumb";
import { useModal } from "@ebay/nice-modal-react";
import { Inertia } from "@inertiajs/inertia";



export default function Edit({tags,categories,post}){
    tags = tags.data;
    categories = categories.data;
    post = post.data

    const {data,setData,errors,progress,post: postRequest } = useForm({
        _method: "PATCH",
        title: post.title || "",
        description: post.description || "",
        body: post.body || "",
        category: post.category?.id || null,
        tags: post.tags?.map(item => item.id),
        image_path: post.imageUrl || null,
    });
    const modal = useModal(DeleteConfirmModal);

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    };
    const setQuillText = (value,column) => handleChange({target:{name:column,value,}})

    function handleSubmit(e){
        e.preventDefault();
        postRequest(route(`post.update`,post), data);
    }
    const handleDeleteConfirm = () => {
        Inertia.delete(route('post.destroy',post),{
            onSuccess: () => modal.hide()
        });
    }
    const handleDelete = (item) => {
        modal.show({ onConfirm: handleDeleteConfirm, });
    }

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
                                Edit Post #{post.id}
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
                                            onChange={handleChange}
                                            error={errors.title}/>
                                        <InputBlock
                                            label="Description"
                                            name="description"
                                            error={errors.description}>
                                            <ReactQuill theme="snow"
                                                defaultValue={data.description} onChange={(value) => setQuillText(value,'description')} />
                                        </InputBlock>
                                        <InputBlock
                                            label="Body"
                                            name="body"
                                            error={errors.body}>
                                            <ReactQuill theme="snow"
                                                defaultValue={data.body} onChange={(value) => setQuillText(value,'body')} />
                                        </InputBlock>
                                        <InputBlock
                                            label="Category"
                                            name="category"
                                            error={errors.category}>
                                            <select className='block'
                                                name="category" id="input-category" onChange={handleChange} defaultValue={data.category}>
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
                                                    defaultValue={data.tags}
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
                                            <CropprtInput id="logo-image"
                                                defaultValue={post.imageUrl} onChange={(file) => setData(data => ({
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
                                            <button role="delete" className="p-3 bg-red-500 text-white hover:bg-red-400 ml-3"
                                                type='button' onClick={handleDelete}>Delete</button>
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
