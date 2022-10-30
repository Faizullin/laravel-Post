import { useEffect, useState } from "react";

export default function Header({children}){
    const [isSticked,setIsSticked] = useState(false);
    const [headerValue,setHeaderValue] = useState({
        headerOffset:null,nextElement:null,
    });

    const isSticky = () => {
        if ((headerValue.headerOffset - window.scrollY) < 0) {
            setIsSticked(true);
            //if (headerValue.nextElement) headerValue.nextElement.classList.add('sticked-header-offset');
        } else {
            setIsSticked(false);
            //if (headerValue.nextElement) headerValue.nextElement.classList.remove('sticked-header-offset');
        }
    };
    useEffect(() => {
        const selectHeader = document.querySelector('#header');
        setHeaderValue(data => ({
            headerOffset: selectHeader.offsetTop,
           // nextElement: selectHeader.nextElementSibling,
        }));

    }, []);
    useEffect(()=>{
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    },[headerValue])
    return (
        <header id="header" className={`header flex items-center ${isSticked? "sticked" : ""}`}>
            { children }
        </header>
    );
}
