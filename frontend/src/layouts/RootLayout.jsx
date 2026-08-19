import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import { CertificationProvider } from "../authcontext/context/CertificationContext";

const RootLayout = () => {
    return (
        <>
            <div className="relative">
                <CertificationProvider>
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </CertificationProvider>
            </div>
        </>
    )
};

export default RootLayout;