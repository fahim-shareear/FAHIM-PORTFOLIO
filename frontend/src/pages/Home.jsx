import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Banner from "./components/Banner";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import TeckStack from "./components/TeckStack";
import Feedback from "./components/Feedback";
import useScrollHash from "../authcontext/hooks/useScrollHash";
import SideSocial from "./components/sidebar/SideSocial";
import CertificationDrawer from "./components/CertificationDrawer";

const PARTICLE_COUNT = 400;

const Home = () => {
    const containerRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const [riseDistance, setRiseDistance] =useState(2000);
    useScrollHash();


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(
            Array.from({ length: PARTICLE_COUNT }, (_, i) => (
                {
                    id: i,
                    left: Math.random() * 100,
                    duration: 20 + Math.random() * 20,
                    delay: Math.random() * 10,
                    size: 1 + Math.random() * 2,
                }
            ))
        );

        if (containerRef.current) {
            setRiseDistance(containerRef.current.scrollHeight + 40);
        };
    }, []);





    return (
        <main className="w-full" id="home">
            <section id="home" className="min-h-screen">
                <Banner />
            </section>

            <section ref={containerRef} className="w-full overflow-hidden relative">
                <style>
                    {`
                        @keyframes dots {
                            0% {transform: translateY(0); opacity: 0;}
                            10% {opacity: 0.8;}
                            90% {opacity: 0.8;}
                            100% {transform: translateY(-${riseDistance}px); opacity: 0}
                        }

                        .particle {
                            position: absolute;
                            bottom: 0;
                            border-radius: 50%;
                            background: #00EA50;
                            box-shadow: 0 0 6px 1px rgba(0, 229, 160, 0.6);
                            animation-name: dots;
                            animation-timing-function: linear;
                            animation-itiration-count: infinite;
                        }
                    `}
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
                                    animation: `dots ${p.duration}s linear ${p.delay}s infinite`
                                }}>

                            </span>
                        ))
                    }
                </div>



                <section id="about" className="w-full h-200 bg-[#000000]">
                    <About></About>
                </section>

                <section id="tech-stack" className="w-full h-150 flex items-center  bg-[#000000]">
                    <TeckStack></TeckStack>
                </section>

                <section className="w-full h-200 bg-[#000000]" id="projects">
                    <Projects></Projects>
                </section>

                <section className="w-full h-170 bg-[#000000] flex items-center justify-center">
                    <Feedback></Feedback>
                </section>

                <section id="contact" className="w-full h-200 bg-[#010202]">
                    <Contact></Contact>
                </section>
                <section>
                    <SideSocial></SideSocial>
                </section>
                <section>
                    <CertificationDrawer></CertificationDrawer>
                </section>
            </section>
        </main>
    );
};

export default Home;