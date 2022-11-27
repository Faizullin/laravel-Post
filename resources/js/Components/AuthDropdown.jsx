import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { useRef, useEffect } from "react";


export default function AuthDropdown({auth}) {
    const ref = useRef(null);
    useEffect(function(){
        const el = ref.current;
        if (auth.user) {

        }
        el.addEventListener('click', function(event) {
            console.log("Click",auth)
            // if (document.querySelector('.mobile-nav-active')) {
            //     event.preventDefault();
            //     this.classList.toggle('active');
            //     this.nextElementSibling.classList.toggle('dropdown-active');

            //     let dropDownIndicator = this.querySelector('.dropdown-indicator');
            //     dropDownIndicator.classList.toggle('bi-chevron-up');
            //     dropDownIndicator.classList.toggle('bi-chevron-down');
            // }
        });
    }, [])
    const handleLogout = (e) => {
        e.preventDefault()
        Inertia.post(route(`logout`))
    }
    return (
        <li className="dropdown"
            ref={ref}>
            <a href="#">
                <span>
                    { (auth.user) ? auth.user.name : (
                        <li>
                            <Link href={route('login')}>
                                Log In
                            </Link>
                        </li>
                     ) }
                </span>
                <i className="bi bi-chevron-down dropdown-indicator"></i>
            </a>
            <ul>
                { (auth.user) ?
                    (
                        <>
                            <li><a href="#">Profile</a></li>
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
