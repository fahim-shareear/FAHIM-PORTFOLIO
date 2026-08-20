import { useState } from "react";
import { CertificationContext } from "./CertificationContext"



const CertificationProvider = ({children}) => {
    const [isCertOpen, setIsCertOpen] = useState();
    
    const openCertificationDrawer = () => setIsCertOpen(true);
    const closeCertifcationDrawer = () => setIsCertOpen(false);

    const contextInfo = {
        isCertOpen,
        openCertificationDrawer,
        closeCertifcationDrawer,
    }

    return(
        <CertificationContext.Provider value={contextInfo}>
            {children}
        </CertificationContext.Provider>
    )
};


export default CertificationProvider;