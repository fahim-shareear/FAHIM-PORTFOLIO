import { FaCss3Alt, FaFigma, FaGitAlt, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa6";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiFirebase, SiMongodb, SiPostman } from "react-icons/si";

const TeckStack = () => {
    const frontEnd = [
        {id: 1, name: "html", icon: <FaHtml5 />},
        {id: 2, name: "css", icon: <FaCss3Alt />},
        {id: 3, name: "css", icon: <FaJs></FaJs>},
        {id: 4, name: "css", icon: <FaReact />},
        {id: 5, name: "css", icon: <RiNextjsFill />},
        {id: 6, name: "css", icon: <RiTailwindCssFill />},
    ];

    const backEnd = [
        {id: 1,name: "node.js", icon: <FaNodeJs/>},
        {id: 2,name: "express.js", icon: <SiExpress/>},
        {id: 3,name: "mongo db", icon: <SiMongodb/>},
        {id: 4,name: "firebase", icon: <SiFirebase/>},
    ];

    const tools = [
        {id: 1, name: "git", icon: <FaGitAlt></FaGitAlt>},
        {id: 2, name: "figma", icon: <FaFigma />},
        {id: 3, name: "postman", icon: <SiPostman />},
    ]
    return (
        <div className="md:max-w-5xl mx-auto border border-red-500">
            <div className="flex flex-col gap-10">
                <div className="grid md:grid-cols-6 gap-10 border border-red-500">
                    {
                        frontEnd.map(f => (
                            <div key={f.id} className="w-30 h-30 rounded-md flex items-center justify-center flex-col bg-[#141010]">
                                <span className="text-3xl">{f.icon}</span>
                                <p>{f.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="grid md:grid-cols-6 gap-10 border border-red-500">
                    {
                        backEnd.map(b => (
                            <div key={b.id} className="w-30 h-30 rounded-md flex items-center justify-center flex-col bg-[#141010]">
                                <span className="text-3xl">{b.icon}</span>
                                <p>{b.name}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="grid md:grid-cols-6 gap-10 border border-red-500">
                    {
                        tools.map(t =>(
                            <div key={t.id} className="w-30 h-30 rounded-md flex items-center justify-center flex-col bg-[#141010]" >
                                <span className="text-3xl">{t.icon}</span>
                                <p>{t.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default TeckStack;