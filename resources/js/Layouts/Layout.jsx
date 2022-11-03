import Header from "@/Components/Header";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { usePage } from "@inertiajs/inertia-react";


export default function Layout({children}){
    const auth = usePage().props.auth;
    console.log("AUTH:",auth)
    return (
        <>
            <Header>
                <Navbar auth={auth}/>
            </Header>
            {children}
            <Footer />
        </>
    );
}
