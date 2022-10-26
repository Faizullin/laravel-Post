import { useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { Multiselect } from "react-widgets";
import Layout from "../../Layouts/Layout";
import CropprtInput from "../../Components/Post/CopperInput";



export default function Edit(props){
    const { data:post } = props.post;
    const { data:tags } = props.tags;
    const { data:users } = props.users;
    const { data:categories } = props.categories;
    const {data,setData,errors,patch} = useForm({
        title: post.title || "",
        description: post.description || "",
        body: post.body || "",
        author:post.author || null,
        category:post.category || null,
        tags: post.tags || [],
        imageUrl: post.file_path || "",
    });

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const setTags = (values) => {
        setData(data => ({
            ...data,
            tags: values.map(item => item.id)
        }));
    }
    useEffect(()=>{
        if(post){
            console.log(post)
            setData(data => ({
                ...post,
                tags: post.tags.map(item => item.id)
            }));
        }
    },[post]);
    function handleSubmit(e){
        e.preventDefault()
        patch(route('admin.post.update',post),data);
    }
    return (
        <Layout linkTitle="Post">
             <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                            <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Edit Post #{post.id}
                        </p>
                    </header>
                    <div className="card-content">
                        <div className="py-12">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6 bg-white border-b border-gray-200">
                                        <form onSubmit={handleSubmit}
                                            className="max-w-lg">
                                            <div className="mb-4">
                                                <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br/>
                                                <input type="text" className="border-2 border-gray-300 p-2 w-full"
                                                    name="title" id="title" required
                                                    value={data.title} onChange={handleChange}/>
                                            </div>

                                            <div className="mb-4">
                                                <label className="text-xl text-gray-600">Description</label><br/>
                                                <textarea className="border-2 border-gray-500 w-full"
                                                    name="description" id="description" placeholder="(Optional)"
                                                    value={data.description} onChange={handleChange}/>
                                            </div>

                                            <div className="mb-4">
                                                <label className="text-xl text-gray-600">Content <span className="text-red-500">*</span></label><br/>
                                                <textarea name="body"  className="border-2 border-gray-500 w-full"
                                                    value={data.body} onChange={handleChange} />
                                            </div>

                                            <div className="mb-4">
                                                <select name="user" id="" onChange={handleChange}>
                                                    { categories.map((category,index) => (
                                                        <option value={category.id}>{category.title}</option>
                                                    )) }
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <select name="user" id="">
                                                    { users.map((user,index) => (
                                                        <option value={user.id}>{user.name}</option>
                                                    )) }
                                                </select>
                                            </div>

                                            <div className="mb-4">
                                                <label className="text-xl text-gray-600"
                                                    htmlFor="tags">
                                                    Tags
                                                </label>
                                                <div className="relative">
                                                    <Multiselect
                                                        id='tags'
                                                        dataKey="id"
                                                        textField="title"
                                                        defaultValue={data.tags}
                                                        data={ tags }
                                                        filter='contains'
                                                        onChange={value => setTags(value)}
                                                    />
                                                </div>
                                                { errors.tags ?
                                                    <p className="text-red-500 text-xs italic">{ errors.tags }</p>
                                                    :
                                                    <p className="text-gray-600 text-xs italic">Select Tags</p>
                                                }
                                            </div>

                                            <div className="mb-8">
                                                <CropprtInput defaultValue={data.imageUrl}/>
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
                                </div>
                            </div>

                            <script src="https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js"></script>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>

    );
}
