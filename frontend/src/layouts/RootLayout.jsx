import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import CertificationProvider from "../authcontext/CertificationProvider";
import CertificationDrawer from "../pages/components/CertificationDrawer";

const RootLayout = () => {
    return (
        <>
            <CertificationProvider>
                <div className="relative">
                    <Navbar></Navbar>
                    <Outlet></Outlet>
                    <Footer></Footer>
                    <CertificationDrawer></CertificationDrawer>
                </div>
            </CertificationProvider>
        </>
    )
};

export default RootLayout;