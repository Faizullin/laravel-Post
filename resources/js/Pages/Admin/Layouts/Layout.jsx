import Aside from "../Components/Dashboard/Aside";
import Footer from "../Components/Dashboard/Footer";
import Navbar from "../Components/Dashboard/Navbar";

export default function Layout({children}){
    return (
        <>
            <Navbar />
            <Aside />

            { children }

            <Footer />
        </>
    );
}
