import { useContext } from "react"
import CertificationProvider from "../authcontext/CertificatoinProvider"


const useCertification = () =>{
    const ctx = useContext(CertificationProvider);
    if(!ctx){
        throw new Error(
            "useCertification must be used within a certificationprovider."
        );
    };
};

export default useCertification;