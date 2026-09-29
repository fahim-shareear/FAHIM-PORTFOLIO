import { useState } from "react";
import "../../all-css/banner.css";
import profilebg from "../../assets/profilebg.png"
import useAxios from "../../axios/useAxios";
import { toast } from "react-toastify";

const Banner = () => {
    const axiosSecure = useAxios();
    const [downloading, setDownloading] = useState(false);

    const handleResumeDownload = async () =>{
        setDownloading(true);
        try{
            const res = await axiosSecure.get("/resume");
            if(!res.data?.url){
                toast.error("Resume not available right now", {
                    position: "bottom-center",
                    autoClose: 3000,
                });
                return;
            };

            const downloadUrl = res.data.url.replace("/upload", "/upload/fl_attachement/")

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = res.data.fileName || "fahim-shareear.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }catch(error){
            toast.error(error?.response?.data?.message || "Unable to download resume", {
                position: "bottom-center",
                autoClose: 3000,
            });
        }finally{
            setDownloading(false);
        };

    };


    return (
        <div className="main-hero relative">
            <div className="secondary" style={{ backgroundImage: `url(${profilebg})` }}>

                <div className="absolute inset-0" style={{
                    background: `radial-gradient(
                ellipse 55% 75% at 50% 45%,
                transparent 20%,
                rgba(0,0,0, 0.6) 50%,
                rgba(0,0,0, 0.97) 100%
            )`
                }}></div>

                <div className="absolute inset-0" style={{
                    background: `radial-gradient(
                ellipse 40% 50% at 50% 40%,
                rgba(0, 229, 160, 0.12) 0%,
                transparent 55%
            )`
                }}></div>
            
            <div className="absolute inset-0 flex items-center z-10">
                <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">

                    {/* Left — headline */}
                    <div className="flex flex-col">
                        <h1 className="text-7xl font-black text-white leading-tight">Build</h1>
                        <h1
                            className="text-7xl font-black leading-tight"
                            style={{ color: 'transparent', WebkitTextStroke: '2px #00e5a0' }}
                        >
                            Creative
                        </h1>
                        <h1 className="text-7xl font-black text-white leading-tight">Solutions</h1>
                    </div>

                    {/* Right — tagline + body + buttons */}
                    <div className="flex flex-col max-w-xs gap-4">
                        <h2 className="text-xl font-bold text-white leading-snug">
                            Design. Develop.<br />Deploy. Fast.
                        </h2>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Full-stack developer crafting high-performance web apps
                            with clean code and pixel-perfect UI.
                        </p>
                        <div className="flex gap-3 mt-2">
                            <button
                                className="px-5 py-2 text-sm rounded transition cursor-pointer"
                                style={{ border: '1px solid #00e5a0', color: '#00e5a0' }}
                                onClick={handleResumeDownload}
                                disabled={downloading}
                            >
                                {downloading ? "Preparing" : "Resume"}
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom center name label */}
                <div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xl tracking-widest"
                    style={{ color: '#00e5a0' }}
                >
                    ● Fahim Shareear — <span className="font-bold">MERN</span> Developer
                </div>
            </div>
            </div>
        </div>
    )
};


export default Banner;