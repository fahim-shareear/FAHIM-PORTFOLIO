import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";

const PARTICLE_COUNT = 400;

const Authlayout = () => {
    const containerRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const [riseDistance, setRiseDistance] = useState(2000);


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

            if(containerRef.current){
                setRiseDistance(containerRef.current.scrollHeight + 40);
            }
        }, []);


    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center bg-black overflow-hidden relative">
            <style>
                {`
                    @keyframes rise{
                        0% {transform: translateY(0); opacity: 0;}
                        10% {opacity: 0.8;}
                        90% {opacity: 0.8;}
                        100% {transform: translateY(-${riseDistance}px); opacity: 0;}
                    }

                    .particle{
                        position: absolute;
                        bottom: 0;
                        border-radius: 50%;
                        background: #00EA50;
                        box-shadow: 0 0 6px 1px rgba(0 229, 160, 0.6);
                        animation-name: rise;
                        animation-timing-function: linear;
                        animation-ititration-count: infinite;
                    }
                
                `}
            </style>

            <div className="absolute inset-0 pointer-events-none z-0">
                {
                    particles.map((p)=>(
                        <span key={p.id}
                            className="particle"
                            style={{
                                left: `${p.left}%`,
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                animation: `rise ${p.duration}s linear ${p.delay}s infinite`
                            }}>

                        </span>
                    ))
                }
            </div>
            <div className="md:max-w-7xl mx-auto h-screen">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Authlayout;