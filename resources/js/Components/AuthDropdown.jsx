import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useRef, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

export default function AuthDropdown({auth}) {
    const ref = useRef(null);
    const [openDropdown,setOpenDropdown] = useState(false);
    useEffect(function(){
        const el = ref.current;
        if(el) {
            el.addEventListener('click', function(event) {
                if (document.querySelector('.mobile-nav-active')) {
                    event.preventDefault();
                    this.classList.toggle('active')
                    this.nextElementSibling.classList.toggle('dropdown-active');
                    setOpenDropdown(openDropdown => !openDropdown);
                }
            });
        }


    }, [])
    const handleLogout = (e) => {
        e.preventDefault()
        Inertia.post(route(`logout`))
    }
    return (
        <li className="dropdown">
            { (auth.user) ? (

                <a ref={ref}>
                    <span>{ auth.user.name }</span>
                    { openDropdown ? (
                        <ChevronUpIcon className="h-5 w-5 md:hidden" />
                    ) : (
                        <ChevronDownIcon className="h-5 w-5 md:hidden" />
                    ) }
                </a>
            ) : (
                <Link href={route('login')}>
                    <span>Log In</span>
                </Link>
            ) }
            <ul>
                { (auth.user) ?
                    (
                        <>
                            <li>
                                <Link href={ route(`dashboard.profile.edit`) }>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={ route(`dashboard.index`)  }>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <a href="#" onClick={ handleLogout }>
                                    Log out
                                </a>
                            </li>
                        </>
                    ) : ""
                }

            </ul>
        </li>
    )
}
