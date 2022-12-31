import { useForm } from '@inertiajs/inertia-react';
import { Multiselect } from 'react-widgets';
import Layout from '../../Layouts/Layout';
import CropperInput from '../../Components/Form/CopperInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputBlock from '../../Components/Form/InputBlock';
import HeroBar from '../../Components/Dashboard/HeroBar';
import Breadcrumb from '../../Components/Dashboard/Breadcrumb';



export default function Create({tags,categories,users}){
    tags = tags.data;
    categories = categories.data;
    users = users.data;
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
        post(route('admin.post.store'),{
            data,
        });
    }
    return (
        <Layout>
            <Breadcrumb links={[{label:"Post"}]}/>
            <HeroBar title="Post"/>
             <section className="section main-section">
                <div className="card has-table w-full lg:w-1/2 md:2/3 ">
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
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        error={errors.title}
                                        />

                                    <InputBlock
                                        label="Description"
                                        name="description"
                                        error={errors.description}>
                                        <ReactQuill theme="snow" id="input-description"
                                            defaultValue={data.description} onChange={(value) => setQuillText(value,'description')} />
                                    </InputBlock>

                                    <InputBlock
                                        label="Body"
                                        name="body"
                                        error={errors.body}>
                                        <ReactQuill theme="snow" id="input-body"
                                            defaultValue={data.body} onChange={(value) => setQuillText(value,'body')} />
                                    </InputBlock>

                                    <InputBlock
                                        label="Category"
                                        name="category"
                                        error={errors.category}
                                        >
                                        <select className='block'
                                            id="input-category" name="category" onChange={handleChange} defaultValue={""}>
                                            <option value={""} disabled={true}>Choose category</option>
                                            { categories.map((category,index) => (
                                                <option key={category.id} value={category.id}>{category.title}</option>
                                            )) }
                                        </select>
                                    </InputBlock>
                                    <InputBlock
                                        label="Author(user)"
                                        name="user"
                                        error={errors.user}
                                        >
                                        <select className='block'
                                            id="input-user" name="user" onChange={handleChange} defaultValue={""}>
                                            <option value={""} disabled={true}>Choose Author</option>
                                            { users.map((user,index) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            )) }
                                        </select>
                                    </InputBlock>

                                    <InputBlock
                                        label="Tags"
                                        name="tags"
                                        error={errors.tags}
                                        >
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
                                        { !errors.tags && (
                                            <p className="text-gray-600 text-xs  italic mt-2">Select Tags</p>
                                        ) }
                                    </InputBlock>


                                    <InputBlock
                                        label="Logo Image"
                                        name="image_path"
                                        error={errors.image_path}
                                        >
                                        <CropperInput id="input-image_path"
                                            title={`Crop Logo Image`}
                                            defaultValue={data.image_path}
                                            onChange={(file) => setData(data => ({
                                                ...data,
                                                image_path:file,
                                            }))}/>
                                        { !errors.image_path && <p className="text-gray-600 text-xs  italic mt-2">Upload Logo Image</p> }
                                        { progress && (
                                            <progress value={progress.percentage} max="100">
                                                {progress.percentage}%
                                            </progress>
                                        ) }
                                    </InputBlock>

                                    <div className="flex p-1">
                                        <button role="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400"
                                            type='submit'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

