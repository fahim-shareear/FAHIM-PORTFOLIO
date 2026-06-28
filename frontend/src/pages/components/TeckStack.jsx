import { FaCss, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa6";
import { IoLogoJavascript } from "react-icons/io5";
import { RiNextjsLine } from "react-icons/ri";
import { SiExpress, SiFirebase, SiMongodb, SiPostman, SiVite } from "react-icons/si";
import { FaGitAlt, FaFigma } from "react-icons/fa";
import "../../all-css/teckstack.css";

const TeckStack = () => {
    const frontEnd = [
        { icon: <FaHtml5 />,        label: "html5" },
        { icon: <FaCss />,          label: "css3" },
        { icon: <IoLogoJavascript />, label: "js" },
        { icon: <FaReact />,        label: "react" },
        { icon: <RiNextjsLine />,   label: "next" },
    ];

    const backEnd = [
        { icon: <FaNodeJs />,   label: "node" },
        { icon: <SiExpress />,  label: "express" },
        { icon: <SiMongodb />,  label: "mongo" },
        { icon: <SiFirebase />, label: "firebase" },
    ];

    const tools = [
        { icon: <FaGitAlt />,   name: "Git",     percent: 85 },
        { icon: <FaFigma />,    name: "Figma",   percent: 72 },
        { icon: <SiPostman />,  name: "Postman", percent: 80 },
        { icon: <SiVite />,     name: "Vite",    percent: 78 },
    ];

    return (
        <div className="techstack-section md:max-w-7xl mx-auto">
            <p className="section-label">// skills & tools</p>

            <div className="w-full max-w-6xl mx-auto grid grid-cols-3 items-center gap-9 px-4">

                {/* ── Frontend Orbit ── */}
                <div className="flex flex-col items-center">
                    <p className="section-title">Frontend</p>
                    <ul
                        className="orbit-ring"
                        style={{ "--radius": "100px", "--total": frontEnd.length }}
                    >
                        {frontEnd.map((item, i) => (
                            <li key={i} style={{ "--i": i }}>
                                <div
                                    className="icon-wrap"
                                    style={{ "--i": i, "--total": frontEnd.length }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Tools Panel ── */}
                <div className="flex flex-col">
                    <p className="section-title">Tools</p>
                    <div className="tools-panel">
                        {tools.map((t, i) => (
                            <div key={i} className="tool-row">
                                <span className="tool-icon">{t.icon}</span>
                                <span className="tool-name">{t.name}</span>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${t.percent}%` }}
                                    />
                                </div>
                                <span className="tool-percent">{t.percent}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Backend Orbit ── */}
                <div className="flex flex-col items-center">
                    <p className="section-title">Backend</p>
                    <ul
                        className="orbit-ring"
                        style={{ "--radius": "100px", "--total": backEnd.length }}
                    >
                        {backEnd.map((item, i) => (
                            <li key={i} style={{ "--i": i }}>
                                <div
                                    className="icon-wrap"
                                    style={{ "--i": i, "--total": backEnd.length }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default TeckStack;