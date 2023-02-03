import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { usePage } from "@inertiajs/inertia-react";
import { useEffect } from "react";


const FlashMessage = ({className}) => {
    return (
        <div className={`message ${className}`}><div className="message-body">{ children }</div></div>
    )
}


export default function Layout({children}){
    const { auth } = usePage().props;
    const flash = usePage().props.flash || null
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
            <div id="flash-message">
                { flash?.error &&
                    <FlashMessage className="is-danger">
                        { flash.error }
                    </FlashMessage>
                }
                { flash?.warning &&
                    <FlashMessage className="is-warning">
                        { flash.warning }
                    </FlashMessage>
                }
                { flash?.success  &&
                    <FlashMessage className="is-success">
                        { flash.success }
                    </FlashMessage>
                }
            </div>

            {children}
            <Footer />
        </>
    );
}
