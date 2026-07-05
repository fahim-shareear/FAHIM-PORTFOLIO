import { useState } from "react";
import "../all-css/b-nav.css"
import { CgMenuMotion } from "react-icons/cg";
import { IoCloseCircle } from "react-icons/io5";
import "../all-css/nav.css"

const bottomList = [
        {label: "login", to: "/login"},
        {label: "registration", to: "/registration"},
    ];

const BottomNav = () => {
    const [isOpen, setIsOpen] = useState(false);



    const handleOpen = () => setIsOpen(!isOpen);
    const total = bottomList.length;


    return (
        <div className="b-nav">
            <div className={`outer-ring ${isOpen ? "open" : ""}`}>
                {
                    bottomList.map((item, i) => {
                        const angle = 90 + (180 /total) * i + (180 / total) /2;

                        return (
                            <li key={item.label}
                            className="menu-item"
                                style={{
                                    "--angle": `${angle}deg`,
                                    "--i": i
                                }}
                            >
                                <a href={item.to} onClick={() =>setIsOpen(false)}>
                                    {item.label}
                                </a>
                            </li>
                        )
                    })
                }
            </div>
            <div className="b-center" onClick={handleOpen}>
                {
                    isOpen ? <span><CgMenuMotion /></span> : <span><IoCloseCircle /></span>
                }
            </div>
        </div>
    );
};

export default BottomNav;