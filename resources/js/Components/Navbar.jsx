import useDidMountEffect from "@/Pages/Admin/Hooks/useDidMountEffect";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";


export default function Navbar({auth}){
    const [isOpenNavbar,setIsOpenNavbar] = useState(false);
    const handleMobileToggle = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }

    return (
        <div className="container mx-auto flex items-center justify-between px-4">
            <Link href={route('pages.home')} className="logo flex items-center">
                {/* <!-- <img src="assets/img/logo.png" alt=""> --> */}
                <h1>Impact<span>.</span></h1>
            </Link>
            <div className={`${ isOpenNavbar ? "" : "hidden" } fixed inset-0 mobile-nav-bg`}>

            </div>
            <nav id="navbar" className={` navbar ease-out duration-300
                ${ isOpenNavbar ? "translate-x-0 " : "translate-x-full" }  md:transform-none md:transition-none`} >
                <ul className="flex flex-col p-4 mt-4 md:flex-row m-bg-green-basic">
                    <li>
                        <a href="#hero">Home</a>
                    </li>
                    <li>
                        <Link href={route('pages.about')}>About</Link>
                    </li>
                    <li>
                        <Link href={route('post.index')}>Posts</Link>
                    </li>
                    <li>
                        <Link href={route('pages.contact.index')}>Contact</Link>
                    </li>
                    <li>
                        <Dropdown className={ (!auth.user) ? "hidden" : "" }>
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                    >
                                        {auth.user?.name}

                                        <svg
                                            className="ml-2 -mr-0.5 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                        <Link className={ (auth.user) ? "hidden" : "" } href={route('login')}>
                            Log In
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="block md:hidden">
                <i className={`mobile-nav-toggle mobile-nav-show bi bi-list ${isOpenNavbar ? "hidden" : ""} m-0`} onClick={handleMobileToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </i>
                <i className={`mobile-nav-toggle mobile-nav-hide bi bi-x ${!isOpenNavbar ? "hidden" : ""} m-0`} onClick={handleMobileToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </i>
            </div>
        </div>
    );
}
