import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";
import "./nav.css";
import { NavLink } from "react-router";

const menuItems = [
    { label: "Home", id: "homw" },
    { label: "About", id: "about" },
    { label: "Tech Stack", id: "tech-stack" },
    { label: "Projects", id: "projects" },
    { label: "Certification", id: "certification" },
    { label: "Get In Touch", id: "contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(!isOpen);
    const total = menuItems.length;

    return (
        <div className="main-container">
            <div className="nav-container">
                <div className={`outer-ring ${isOpen ? "open" : ""}`}>
                    <div className="sub-menu">
                        <ul>
                            {menuItems.map((item, i) => {
                                const angle =
                                    -90 + (180 / total) * i + (180 / total) / 2;

                                return (
                                    <li
                                        key={item.label}
                                        className="menu-item"
                                        style={{
                                            "--angle": `${angle}deg`,
                                            "--i": i,
                                        }}
                                    >
                                        <NavLink
                                            to={item.id}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="main-btn" onClick={handleOpen}>
                    {isOpen ? (
                        <IoMdCloseCircle className="icons" />
                    ) : (
                        <GiHamburgerMenu className="icons" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;