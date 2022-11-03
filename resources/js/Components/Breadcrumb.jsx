import { Link } from "@inertiajs/inertia-react";


export default function Breadcrumb({children,title}) {
	<div className="breadcrumbs" aria-label="Breadcrumb">
        <div className={`page-header flex items-center ${ !children ? "hidden" : "" }`} style={{backgroundImage: '',}}>
            <div className="container mx-auto relative">
	            <div className="row flex justify-center">
	                <div className="lg:w-1/2 text-center">
	                	{ children }
	                </div>
	            </div>
            </div>
        </div>
        <nav>
            <div className="container mx-auto px-4">
                <ol>
                    <li><Link href={ route(`pages.home`) }>Home</Link></li>
                    <li>{ title }</li>
                </ol>
            </div>
        </nav>
    </div>
}
