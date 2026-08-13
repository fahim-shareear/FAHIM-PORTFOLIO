import { useEffect, useRef, useState } from "react";


const PARTICLE_COUNT = 40;


const Contact = () => {
    const containerRef = useRef(null);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(
            Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                duration: 6 + Math.random() * 6,
                delay: Math.random() * 10,
                size: 1 + Math.random() * 2,
            }))
        );
    }, [])


    return (
        <div ref={containerRef} className="w-full h-200 overflow-hidden relative bg-[#000000]">

            <style>
                {
                    `@keyframes rise{
                    0%{transform: translateY(0); opacity: 0;}
                    10%{opacity: 0.8;}
                    90%{opacity: 0.8;}
                    100%{transform: translateY(-820px); opacity: 0}
                }

                .particle{
                    position: absolute;
                    bottom: 0;
                    border-radius: 50%;
                    background: #00E5A0;
                    box-shadow: 0 0 6px 1px rgba(0, 229, 160, 0.6);
                    animation-name: rise;
                    animation-timing-function: linear;
                    animation-itiration-count: infinite;
                }
                `
                }
            </style>


            <div className="absolute inset-0 pointer-events-none z-0">
                {
                    particles.map((p) => (
                        <span key={p.id}
                            className="particle"
                            style={{
                                left: `${p.left}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                animation: `rise ${p.duration}s linear ${p.delay}s infinite`
                            }}
                        >

                        </span>
                    ))
                }
            </div>


            <div className="w-full h-200 z-10 relative">
                <div className="md:max-w-4xl mx-auto h-full">
                    <h1 className="text-4xl mt-10 ml-10">Get In <span className="uppercase font-bold text-[#00E5A0]">touch:</span></h1>
                    <div className="flex items-center w-200 mx-auto h-170 justify-center mt-5">
                        <form className="bg-white/3 border border-[#00EA50]/20 rounded-2xl p-10 h-full shadow-[inset_0_0_20px_rgba(0,229,160,0.15)]">
                            <fieldset className="fieldset gap-5">
                                <label className="label w-full text-[#00E5A0] text-2xl font-bold">Name</label>
                                <input type="text" className="input w-120 bg-white/7 border-0! border-b! border-[#00EA50]! text-white focus:outline-none" placeholder="Your Name" name="user_name" />
                                <label className="label text-2xl font-bold text-[#00E5A0]">Subject</label>
                                <input type="text" className="input w-120 bg-white/7 border-0! border-b! border-[#00EA50]! text-white focus:outline-none" placeholder="Subject" name="subject" />
                                <label className="label text-2xl font-bold text-[#00E5A0]">Email</label>
                                <input type="email" className="input w-120 bg-white/7 border-0! border-b! border-[#00EA50]! text-white focus:outline-none" placeholder="Email" name="user_email" />
                                <label className="label text-2xl font-bold text-[#00E5A0]">Message</label>
                                <textarea className="textarea h-24 w-120 bg-white/7 border-0! border-b! border-[#00EA50]! text-white focus:outline-none" placeholder="Your Message"></textarea>
                                <button className="btn btn-neutral mt-4">Send Mail</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;