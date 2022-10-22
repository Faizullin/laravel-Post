export default function TitleBar({LinkTitle}){
    return (
        <section className="is-title-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <ul>
            <li>Admin</li>
            <li>{ LinkTitle }</li>
            </ul>
            <a href="https://github.com/justboil/admin-one-tailwind" target="_blank" className="button blue">
            <span className="icon"><i className="mdi mdi-github-circle"></i></span>
            <span>GitHub</span>
            </a>
        </div>
        </section>
    )
}
