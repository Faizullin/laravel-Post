import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";


export default function Layout({children}){
    const { auth, props: flash } = usePage().props;
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);
    return (
        <>
            <Header>
                <Navbar auth={auth}/>
            </Header>
            {/* { flash.error !== null && <div className='message is-danger'><div className="message-body">{ flash.error}</div></div>}
            { flash.warning !== null && <div className='message is-warning'><div className="message-body">{ flash.warning}</div></div>}
            { flash.success !== null && <div className='message is-success'><div className="message-body">{ flash.success}</div></div>} */}
            {children}
            <Footer />
        </>
    );
}
