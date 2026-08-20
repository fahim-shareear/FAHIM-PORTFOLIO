import { useState } from "react";
import { CertificationContext } from "./CertificationContext"


const CertificationProvider = ({children}) =>{
    const [isCertOpen, setIsCertOpen] = useState(false);

    const openCertification = () => setIsCertOpen(true);
    const closeCertification = () => setIsCertOpen(false);


    const contextInfo = {
        isCertOpen,
        openCertification,
        closeCertification,
    }

    return(
        <CertificationContext value={contextInfo}>
            {children}
        </CertificationContext>
    )
};


export default CertificationProvider;