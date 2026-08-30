import { useContext, useState } from "react";
import { Link } from "react-router";
import "../../all-css/logbutton.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";
import { Authcontext } from "../../authcontext/Authcontxt";

const Logbutton = () => {
    const [logOpen, setLogOpen] = useState(false);
    const {user} = useContext(Authcontext);

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
                {
                    user && <Link to="/dashboard" className="log-link" onClick={()=> setLogOpen(false)}>Dashboard</Link>
                }
            </div>
        </div>
    );
};

export default Logbutton;