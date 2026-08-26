import { Link } from "react-router";
import "../../all-css/logbutton.css";
import { useState } from "react";

const Logbutton = () => {
    const [logOpen, setLogOpen] = useState(false);

    const handleLogButton = () => {
        setLogOpen(!logOpen);
    };

    return (
        <>
            <div className="log-handle" onClick={handleLogButton}>
                {logOpen ? "✕" : "☰"}
            </div>
            <div className={`log ${logOpen ? "open" : ""}`}>
                <button><Link to="/login">log in</Link></button>
                <button><Link to="/registration">register</Link></button>
            </div>
        </>
    );
};

export default Logbutton;