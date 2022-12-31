import { Link } from "@inertiajs/inertia-react";

export default function Breadcrumb({links}) {
	return (
        <section className="is-title-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                    <li>
                        <Link href={route(`admin.dashboard`)}>
                            Admin
                        </Link>
                    </li>
                    { links.map((link,index) => (
                        <li key={index}>
                            { link.href ? (
                                <Link href={link.href}>
                                    { link.label }
                                </Link>
                            ) : (
                                link.label
                            ) }
                        </li>
                    )) }
                </ul>
                <a href="https://github.com/justboil/admin-one-tailwind" target="_blank" className="button blue">
                <span className="icon"><i className="mdi mdi-github-circle"></i></span>
                <span>GitHub</span>
                </a>
            </div>
        </section>
    );
}
