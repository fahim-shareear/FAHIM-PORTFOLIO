import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import {Link} from "react-router";

const Footer = () => {
    return (
        <div className="w-full bg-[#000000]">
            <footer className="max-w-4xl mx-auto p-5">
                <div className="w-full h-full flex items-center justify-center flex-col gap-3 p-3">
                    <h1 className="capitalize text-2xl text-[#00EA50] pt-5">fahim shareear</h1>
                    <p className="text-[#03ce4a]">Providing reliable service at will.</p>
                    <h1 className="uppercase text-[#00EA50]">follow us:</h1>
                    <div className="flex items-center justify-center gap-5">
                        <Link className="text-2xl text-[#00EA50] cursor-pointer" to="https://www.facebook.com/shareear/"><FaFacebook /></Link>
                        <Link className="text-2xl text-[#00EA50] cursor-pointer" to="https://www.instagram.com/shareearyt/"><FaInstagram /></Link>
                        <Link className="text-2xl text-[#00EA50] cursor-pointer" to="www.linkedin.com/in/fahim-shareear"><FaLinkedin /></Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;