import { useContext } from "react"
import { CertificationContext } from "../CertificationContext"


const useCertification = () =>{
    const ctx = useContext(CertificationContext);

    if(!ctx){
        throw new Error("useCertification must be used within a CertificationProvider");
    }
    return ctx;
};

export default useCertification;