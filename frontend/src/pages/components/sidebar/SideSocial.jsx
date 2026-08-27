import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const SideSocial = () => {
    return (
        <div className="fixed right-0 bottom-60 w-10 mr-1 z-60">
            <div className="flex items-center justify-center flex-col gap-2">
                <a className="cursor-pointer text-3xl text-[#00EA50] p-2" rel="noopener noreferrer" target="_blank" href="https://github.com/fahim-shareear"><FaGithub /></a>
                <a className="cursor-pointer text-3xl text-[#00EA50] p-2" rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/fahim-shareear"><FaLinkedin /></a>
                <a className="cursor-pointer text-3xl text-[#00EA50] p-2" rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/shareear"><FaFacebook /></a>
            </div>
        </div>
    );
};

export default SideSocial;