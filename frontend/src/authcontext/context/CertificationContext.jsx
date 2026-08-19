import { createContext, useContext, useState } from "react";

const CertificationContext = createContext(null);

export const CertificationProvider = ({children}) =>{
    const [isCertOpen, setIsCertOpen] = useState(false);

    const openCertification = () => setIsCertOpen(true);
    const closeCertification = () => setIsCertOpen(false);

    return (
        <CertificationContext.Provider value={{isCertOpen, openCertification, closeCertification}}>
            {children}
        </CertificationContext.Provider>
    )
};


// eslint-disable-next-line react-refresh/only-export-components
export const useCertification = () =>{
    const ctx = useContext(CertificationContext);
    if(!ctx){
        throw new Error("useCertification must be used within a CertificationProvider");
    }
    return ctx;
};