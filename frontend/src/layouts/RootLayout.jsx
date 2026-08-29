import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import CertificationProvider from "../authcontext/CertificationProvider";
import Logbutton from "../pages/logbutton/Logbutton";

const RootLayout = () => {
    return (
        <>
            <CertificationProvider>
                <div className="relative">
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                    <Logbutton></Logbutton>
                </div>
            </CertificationProvider>
        </>
    )
};

export default RootLayout;