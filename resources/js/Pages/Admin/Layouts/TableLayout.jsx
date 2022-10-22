import Layout from "./Layout";
import { Link } from "@inertiajs/inertia-react";
import GlobalFilter from "../Components/Table/GlobalFilter";

export default function TableLayout({children,linkTitle,paginationItems,THead,TBody}){
    const getItems = (query) => {
        if(!query){
            return;
        }
        Inertia.get(route(route().current()), { search:query }, {
            preserveState: true,
            replace: true,
        });
    }
    return (
        <Layout LinkTitle={linkTitle}>
            <section className="section main-section">
                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
                            Roles
                        </p>
                        <Link href="#" className="card-header-icon">
                            <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </Link>
                    </header>
                    <div className="card-content">
                        <GlobalFilter callback={ getItems } />
                        <table>
                            <thead>
                                <tr>
                                    <THead />
                                </tr>
                            </thead>
                            <tbody>
                                <TBody />
                            </tbody>
                        </table>
                        <div className="table-pagination">
                            <div className="flex items-center justify-between">
                                <div className="buttons">
                                    { paginationItems.links.map((link, k) => (
                                        <Link key={k} href={link.url || ''} type="button"
                                            disabled={link.url == null ? true : false} className={`${ link.active && 'active' }  ${link.url == null && ''} button`}>{link.label}</Link>
                                        // <li key={k} className="page-item">
                                        //     <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                                        // </li>
                                    ))}
                                </div>
                                <small>Page { paginationItems.current_page } of { paginationItems.last_page }</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
