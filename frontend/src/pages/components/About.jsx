import proImg from "../../assets/Profileimg.jpg";
import { FaCode } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { SiDavinciresolve } from "react-icons/si";


const About = () => {
    return (
        <div className="bg-[#010202] h-full flex items-center sm:flex-row about">
            <div className="md:max-w-6xl mx-auto flex items-center gap-32">
                <div className="">
                    <img src={proImg} alt="Profile" className="w-full h-full rounded-xl" />
                </div>
                <div>
                    <div className="flex items-start md:flex-col gap-15">
                        <h1 className="font-bold text-2xl font-sans">A passionate <span className="text-[#00E5A0]">MERN</span> developer based in Bangladesh</h1>
                        <p className="font-sans text-white">I'm Fahim Shareear, a dedicated web developer with a love for building modern, scalable, and beautiful web applications. With a strong foundation in both front-end and back-end technologies, I bring ideas to life with clean code and thoughtful design. <br /> <br />When I'm not coding, I'm exploring new technologies, contributing to open source, or enjoying a good cup of coffee while reading tech blogs.</p>
                    </div>
                    <div className="mt-10">
                        <h1 className="font-bold text-[#00E5A0] text-xl capitalize py-2 underline">what I offer:</h1>
                        <div className="grid grid-rows-1 gap-10">
                            <div className="w-full h-20 rounded-xl bg-[#161313] p-5">
                                <h1 className="font-bold capitalize text-[15px] font-sans flex items-center gap-2"><span className="w-7 h-7 flex items-center justify-center text-[15px] rounded-md text-[#00E5A0] bg-[#000000]"><FaCode /></span>clean code</h1>
                                <p className="text-[13px] text-gray-400 px-9">I write readable, maintainable code following modern best practices.</p>
                            </div>
                            <div className="w-full h-20 rounded-xl bg-[#161313] p-5">
                                <h1 className="font-bold capitalize text-[15px] font-sans flex items-center gap-2"><span className="w-7 h-7 flex items-center justify-center text-[15px] rounded-md text-[#00E5A0] bg-[#000000]"><FaLightbulb /></span>creative problem solving</h1>
                                <p className="text-[13px] text-gray-400 px-9">I tackle complex problems with innovative and elegant solutions.</p>
                            </div>
                            <div className="w-full h-20 rounded-xl bg-[#161313] p-5">
                                <h1 className="font-bold capitalize text-[15px] font-sans flex items-center gap-2"><span className="w-7 h-7 flex items-center justify-center text-[15px] rounded-md text-[#00E5A0] bg-[#000000]"><SiDavinciresolve /></span>easy & maintable code</h1>
                                <p className="text-[13px] text-gray-400 px-9">I prefer to maintain a easy accessable code base</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default About;