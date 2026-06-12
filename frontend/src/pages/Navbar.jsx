import { useState } from "react";
import { NavLink } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import './nav.css';

const LINKS = ['Home', 'About', 'Skills', 'Projects', 'Certification', 'Contact Me'];
const OUTER_R = 155;
const INNER_R = 48;
const GAP_DEG = 3;

function polarToXY(deg, r) {
    const rad = (deg * Math.PI) / 180;
    return [r * Math.cos(rad), r * Math.sin(rad)];
}

function slicePath(startDeg, endDeg, inner, outer, gap) {
    const s = startDeg + gap / 2;
    const e = endDeg - gap / 2;
    const [ox1, oy1] = polarToXY(s, outer);
    const [ox2, oy2] = polarToXY(e, outer);
    const [ix1, iy1] = polarToXY(e, inner);
    const [ix2, iy2] = polarToXY(s, inner);
    const large = e - s > 180 ? 1 : 0;
    return `M${ox1} ${oy1} A${outer} ${outer} 0 ${large} 1 ${ox2} ${oy2} L${ix1} ${iy1} A${inner} ${inner} 0 ${large} 0 ${ix2} ${iy2}Z`;
}

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [hovered, setHovered] = useState(null);

    const count = LINKS.length;
    const sliceDeg = 180 / count; // spread across right semicircle
    const labelR = (INNER_R + OUTER_R) / 2;

    return (
        <div className="nav-container">
            <div className="nav-circle">
                <div className="border-ring" />

                {/* SVG Wheel */}
                <svg
                    className={`nav-wheel ${navOpen ? 'open' : ''}`}
                    width="320" height="320"
                    viewBox="-160 -160 320 320"
                >
                    {LINKS.map((label, i) => {
                        const startDeg = -90 + i * sliceDeg;
                        const endDeg = startDeg + sliceDeg;
                        const midDeg = (startDeg + endDeg) / 2;
                        const [lx, ly] = polarToXY(midDeg, labelR);
                        const isHovered = hovered === i;

                        return (
                            <NavLink
                                key={label}
                                to={`/${label.toLowerCase().replace(' ', '-')}`}
                            >
                                <g
                                    onMouseEnter={() => setHovered(i)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    <path
                                        d={slicePath(startDeg, endDeg, INNER_R, OUTER_R, GAP_DEG)}
                                        className={`slice ${isHovered ? 'slice--active' : ''}`}
                                    />
                                    <text
                                        x={lx} y={ly}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className="slice-label"
                                        transform={`rotate(${midDeg}, ${lx}, ${ly})`}
                                    >
                                        {label.toUpperCase()}
                                    </text>
                                </g>
                            </NavLink>
                        );
                    })}
                </svg>

                {/* Center button — on top of SVG */}
                <div className="navbar" onClick={() => setNavOpen(!navOpen)}>
                    {navOpen
                        ? <IoIosCloseCircle className="menu" />
                        : <GiHamburgerMenu className="menu" />
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;