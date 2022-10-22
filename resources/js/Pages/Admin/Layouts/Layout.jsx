import Aside from "../Components/Dashboard/Aside";
import Footer from "../Components/Dashboard/Footer";
import HeroBar from "../Components/Dashboard/HeroBar";
import Navbar from "../Components/Dashboard/Navbar";
import SampleModal from "../Components/Dashboard/SampleModal";
import TitleBar from "../Components/Dashboard/TitleBar";

export default function Layout({children,linkTitle}){
    return (
        <>
            <Navbar />
            <Aside />
            <TitleBar LinkTitle={linkTitle} />
            <HeroBar LinkTitle={linkTitle}/>

            { children }

            <Footer />

            <SampleModal />
        </>
    );
}
