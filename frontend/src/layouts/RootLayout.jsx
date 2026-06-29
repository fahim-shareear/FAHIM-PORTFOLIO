import { Outlet } from "react-router";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
import BottomNav from "../pages/BottomNav";

const RootLayout = () =>{
    return (
        <>
            <div className="relative">
                <Navbar></Navbar>
                <BottomNav></BottomNav>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </>
    )
};

export default RootLayout;