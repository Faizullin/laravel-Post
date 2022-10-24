import { Link } from "@inertiajs/inertia-react";


export default function Navbar(){
    const handleNavBarMenuClick = (e)=>{
        var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
        document.getElementById(e.currentTarget.getAttribute('data-target')).classList.toggle('active');
        dropdownIcon.classList.toggle('mdi-dots-vertical');
        dropdownIcon.classList.toggle('mdi-close');
    }
    const handleMobileAsideBtnClick = (e) => {
        var dropdownIcon = e.currentTarget.getElementsByClassName('icon')[0].getElementsByClassName('mdi')[0];
        document.documentElement.classList.toggle('aside-mobile-expanded');
        dropdownIcon.classList.toggle('mdi-forwardburger');
        dropdownIcon.classList.toggle('mdi-backburger');
    }
    const handleDropdownClick = (e) => {
        if (e.currentTarget.classList.contains('navbar-item')) {
            e.currentTarget.classList.toggle('active');
        } else {
            var dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1];
            e.currentTarget.parentNode.classList.toggle('active');
            dropdownIcon.classList.toggle('mdi-plus');
            dropdownIcon.classList.toggle('mdi-minus');
        }
    }
    const DropDown = (props) => {
        return (
            <div onClick={handleDropdownClick} className={props.className}>{props.children}</div>
        );
    }
    return (
        <nav id="navbar-main" className="navbar is-fixed-top">
            <div className="navbar-brand">
                <a className="navbar-item mobile-aside-button" onClick={handleMobileAsideBtnClick}>
                <span className="icon"><i className="mdi mdi-forwardburger mdi-24px"></i></span>
                </a>
                <div className="navbar-item">
                <div className="control"><input placeholder="Search everywhere..." className="input"/></div>
                </div>
            </div>
            <div className="navbar-brand is-right">
                <a className="navbar-item --jb-navbar-menu-toggle" data-target="navbar-menu" onClick={handleNavBarMenuClick}>
                <span className="icon"><i className="mdi mdi-dots-vertical mdi-24px"></i></span>
                </a>
            </div>
            <div className="navbar-menu" id="navbar-menu">
                <div className="navbar-end">
                    <DropDown className="navbar-item dropdown has-divider">
                        <a className="navbar-link">
                        <span className="icon"><i className="mdi mdi-menu"></i></span>
                        <span>Sample Menu</span>
                        <span className="icon">
                            <i className="mdi mdi-chevron-down"></i>
                        </span>
                        </a>
                        <div className="navbar-dropdown">
                        <a href={route('admin.profile.index')} className="navbar-item">
                            <span className="icon"><i className="mdi mdi-account"></i></span>
                            <span>My Profile</span>
                        </a>
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-settings"></i></span>
                            <span>Settings</span>
                        </a>
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-email"></i></span>
                            <span>Messages</span>
                        </a>
                        <hr className="navbar-divider"/>
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span>Log Out</span>
                        </a>
                        </div>
                    </DropDown>
                    <DropDown className="navbar-item dropdown has-divider has-user-avatar">
                        <a className="navbar-link">
                        <div className="user-avatar">
                            <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" className="rounded-full"/>
                        </div>
                        <div className="is-user-name"><span>John Doe</span></div>
                        <span className="icon"><i className="mdi mdi-chevron-down"></i></span>
                        </a>
                        <div className="navbar-dropdown">
                        <Link href={ route('admin.profile.index') } className="navbar-item --set-active-profile-html">
                            <span className="icon"><i className="mdi mdi-account"></i></span>
                            <span>My Profile</span>
                        </Link>
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-settings"></i></span>
                            <span>Settings</span>
                        </a>
                        <a className="navbar-item">
                            <span className="icon"><i className="mdi mdi-email"></i></span>
                            <span>Messages</span>
                        </a>
                        <hr className="navbar-divider"/>
                        <Link className="navbar-item" href={ route('logout') }>
                            <span className="icon"><i className="mdi mdi-logout"></i></span>
                            <span>Log Out</span>
                        </Link>
                        </div>
                    </DropDown>
                    <Link href="https://github.com/Faizullin/laravel-Post" className="navbar-item has-divider desktop-icon-only">
                        <span className="icon"><i className="mdi mdi-github-circle"></i></span>
                        <span>GitHub</span>
                    </Link>
                    <Link title="Log out" className="navbar-item desktop-icon-only" href={ route('logout') }>
                        <span className="icon"><i className="mdi mdi-logout"></i></span>
                        <span>Log out</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
