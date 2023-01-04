import { Link } from "@inertiajs/inertia-react";

export default function Footer(){
    return (
        <footer className="footer">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                <div className="flex items-center justify-start space-x-3">
                    <div>
                        © 2022, Faizullin.me
                    </div>
                </div>
            </div>
        </footer>
    );
}
