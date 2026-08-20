import { IoMdCloseCircle } from "react-icons/io";
import useCertification from "../../authcontext/hooks/useCertification";
import "../../all-css/certification.css";

const CertificationDrawer = () => {
    const { isCertOpen, closeCertifcationDrawer } = useCertification();

    return (
        <>
            <div
                className={`cert-backdrop ${isCertOpen ? "show" : ""}`}
                onClick={closeCertifcationDrawer}
            />
            <div className={`cert-drawer ${isCertOpen ? "open" : ""}`}>
                <button className="cert-close" onClick={closeCertifcationDrawer}>
                    <IoMdCloseCircle className="icons" />
                </button>
                <div className="cert-content">
                    {/* certification cards go here */}
                </div>
            </div>
        </>
    );
};

export default CertificationDrawer;