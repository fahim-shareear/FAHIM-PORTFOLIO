import { useState } from "react";
import { Link } from "react-router";
import "../../all-css/logbutton.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";

const Logbutton = () => {
    const [logOpen, setLogOpen] = useState(false);

    const handleLogButton = () => {
        setLogOpen(!logOpen);
    };

    return (
        <div className={`log-panel ${logOpen ? "open" : ""}`}>
            <div className="log-icon" onClick={handleLogButton}>
                {logOpen ? <IoCloseCircle /> : <GiHamburgerMenu />}
            </div>

            <div className="log-links">
                <Link
                    to="/login"
                    className="log-link"
                    onClick={() => setLogOpen(false)}
                >
                    Log In
                </Link>
            </div>
        </div>
    );
};

export default Logbutton;