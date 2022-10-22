import { Link } from "@inertiajs/inertia-react";


export default function Aside(){
    const handleDropdownClick = (e) => {
        event.preventDefault();
        console.log("Click dropwdow")
        if (e.currentTarget.classList.contains('navbar-item')) {
            e.currentTarget.classList.toggle('active');
        } else {
            var dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1];
            e.currentTarget.parentNode.classList.toggle('active');
            dropdownIcon.classList.toggle('mdi-plus');
            dropdownIcon.classList.toggle('mdi-minus');
        }
    }
    return (
        <aside className="aside is-placed-left is-expanded">
        <div className="aside-tools">
            <div>
                Admin <b className="font-black">One</b>
            </div>
        </div>
        <div className="menu is-menu-main">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li className={`${route().current('admin.dashboard') && 'active'}`}>
                    <Link href={route('admin.dashboard')}>
                        <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
                        <span className="menu-item-label">Dashboard</span>
                    </Link>
                </li>
                <li className="--set-active-tables-html">{/* className="" */}
                    <a className="dropdown" onClick={handleDropdownClick}>
                        <span className="icon"><i className="mdi mdi-table"></i></span>
                        <span className="menu-item-label">Tables</span>
                        <span className="icon"><i className="mdi mdi-plus"></i></span>
                    </a>
                    <ul>
                        <li>
                            <a href="#void">
                                <span>Sub-item One</span>
                            </a>
                        </li>
                        <li>
                            <a href="#void">
                                <span>Sub-item Two</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li className={`${route().current('admin.profile.index') && 'active'}`}>
                    <Link href={route("admin.profile.index")}>
                        <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                        <span className="menu-item-label">Profile</span>
                    </Link>
                </li>
            </ul>
            <p className="menu-label">Tables</p>
            <ul className="menu-list">
                <li className={`${route().current('admin.role.index') && 'active'}`}>
                    <Link href={ route("admin.role.index") }>
                        <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                        <span className="menu-item-label">Role</span>
                    </Link>
                </li>
                <li className={`${route().current('admin.post.index') && 'active'}`}>
                    <Link href={ route("admin.post.index") }>
                        <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                        <span className="menu-item-label">Post</span>
                    </Link>
                </li>
                <li className={`${route().current('admin.permission.index') && 'active'}`}>
                    <Link href={ route("admin.permission.index") }>
                        <span className="icon"><i className="mdi mdi-square-edit-outline"></i></span>
                        <span className="menu-item-label">Permission</span>
                    </Link>
                </li>
            </ul>
            <p className="menu-label">About</p>
            <ul className="menu-list">
                <li>
                    <Link href="login.html">
                        <span className="icon"><i className="mdi mdi-lock"></i></span>
                        <span className="menu-item-label">Login</span>
                     </Link>
                </li>
                <li>
                    <Link href="https://justboil.me/tailwind-admin-templates/free-dashboard/" className="has-icon">
                        <span className="icon"><i className="mdi mdi-help-circle"></i></span>
                        <span className="menu-item-label">About</span>
                    </Link>
                </li>
                <li>
                    <Link href="https://github.com/justboil/admin-one-tailwind" className="has-icon">
                        <span className="icon"><i className="mdi mdi-github-circle"></i></span>
                        <span className="menu-item-label">GitHub</span>
                    </Link>
                </li>
            </ul>
        </div>
        </aside>
    );
}
