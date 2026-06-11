import { useState } from "react";
import './nav.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () =>{
    const [navOpen, setNavOpen] = useState(false);

    const links = (
        <>
            <li><Navbar>Home</Navbar></li>
            <li><Navbar>About</Navbar></li>
            <li><Navbar>Skills</Navbar></li>
            <li><Navbar>Projects</Navbar></li>
            <li><Navbar>Certificatoin</Navbar></li>
            <li><Navbar>Hire Me</Navbar></li>
        </>
    );
    
    return (
        <div className="nav-container">
            <div className="navbar" onClick={()=> setNavOpen(!navOpen)}>
                {
                    navOpen ? <IoIosCloseCircle className="menu"/> : <GiHamburgerMenu className="menu"/>
                }
            </div>

            
        </div>
    )
};

export default Navbar;