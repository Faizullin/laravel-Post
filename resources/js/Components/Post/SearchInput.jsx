import useDidMountEffect from "@/Pages/Admin/Hooks/useDidMountEffect";
import { Link, usePage } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";


export default function SearchInput(){
    const { filters} = usePage().props;
    const [value,setValue] = useState("");
    const [isResultOpen,setIsResultOpen] = useState(false)
    const [searchResult,setSearchResult] = useState({
        tags:[],posts:[],
    });

    const getSearchResult = () => {
        axios.get(route(`api.search`),{
            params:{
                keyword:value,
            }
        }).then(response=>{
            const {posts,tags} = response.data;
            setSearchResult(requestResults => ({
                tags,posts,
            }));
            setIsResultOpen(!(posts.length == 0 && tags.length == 0));
        }).catch(()=>{
            setIsResultOpen(false);
        });
    }

    const handleChange = (e) => setValue(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(()=>{
        setValue(filters?.filter?.search || "")
    },[]);
    useDidMountEffect(() => {
        if(value){
            getSearchResult();
        }else{
            setIsResultOpen(false);
        }
    },[value])
    return (
        <div className="sidebar-item search-form relative">
            <h3 className="sidebar-title">Search</h3>
            <form className="mt-3" onSubmit={handleSubmit}>
                <input type="text"
                    value={value} onChange={ handleChange } className="border-none focus:ring-0"/>
                <button type="submit">
                    <i className="bi bi-search">
                    </i>
                </button>
            </form>
            <div className={`${ isResultOpen ? "" : "hidden" } w-full absolute top-full left-0 `}>
                <div className="w-full px-5 py-4 bg-green-basic">
                    <div className="h-[100px] bg-white">
                        <ul>
                            { searchResult.posts.map((post,i)=>{
                                return (
                                    <li key={post.id}>
                                        <Link href={route(`post.show`,post)}>{ post.title }</Link>
                                    </li>
                                )
                            }) }
                        </ul>
                        <ul>
                            { searchResult.tags.map((tag,i)=>{
                                return (
                                    <li key={tag.id}>
                                        <Link href={``}>#{ tag.title }</Link>
                                    </li>
                                )
                            }) }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
