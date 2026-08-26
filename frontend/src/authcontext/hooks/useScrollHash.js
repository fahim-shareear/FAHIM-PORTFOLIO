import { useEffect } from "react";
import { useLocation } from "react-router";


const useScrollHash = () => {
    const location = useLocation();

    useEffect(()=>{
        if(location.hash){
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if(element){
                element.scrollIntoView({bahaviour: "smooth"});
            }
        }
    }, [location])
};

export default useScrollHash;