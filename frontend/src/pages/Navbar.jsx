import { useState } from "react";
import "./nav.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { NavLink } from "react-router";

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const links = (
        <>
            <li><NavLink>Home</NavLink></li>
            <li><NavLink>About</NavLink></li>
            <li><NavLink>Services</NavLink></li>
            <li><NavLink>Projects</NavLink></li>
            <li><NavLink>Skills</NavLink></li>
            <li><NavLink>Get In Touch</NavLink></li>
        </>
    )
    return (
         <div className="navbar" onClick={() => setOpenNav(!openNav)}>
            {
                openNav 
                ? <IoIosCloseCircle className="menu" />
                : <GiHamburgerMenu className="menu" />
            }
        </div>
    );
};

export default Navbar;