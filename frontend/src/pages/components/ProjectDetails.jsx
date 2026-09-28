import { useParams, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../axios/useAxios";

const PARTICLE_COUNT = 400;

// turns the description string into an array of list items
const getDescriptionItems = (text) => {
    if (!text) return [];

    // first try line breaks
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) return lines;

    // single paragraph: split into sentences
    return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
};

const ProjectDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const [slideIndex, setSlideIndex] = useState(0);
    const containerRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const [riseDistance, setRiseDistance] = useState(2000);

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ["my-projects"],
        queryFn: async () => {
            try {
                const res = await axios.get("/projects");
                return res.data;
            } catch (error) {
                if (error.response?.status === 404) return [];
                throw error;
            }
        },
    });

    const project = projects.find((p) => p._id === id);

    // generate particles once
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(
            Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                duration: 20 + Math.random() * 20,
                delay: Math.random() * 10,
                size: 1 + Math.random() * 2,
            }))
        );
    }, []);

    // re-measure page height whenever the content changes (loading -> loaded)
    useEffect(() => {
        if (containerRef.current) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRiseDistance(containerRef.current.scrollHeight + 40);
        }
    }, [isLoading, project]);

    const withProtocol = (url) => (url?.startsWith("http") ? url : `https://${url}`);

    const slides = project?.screenshots?.length > 0
        ? project.screenshots
        : project?.thumbNail
            ? [project.thumbNail]
            : [];

    const descriptionItems = getDescriptionItems(project?.description);

    const goPrev = () => setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    const goNext = () => setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

    return (
        <div ref={containerRef} className="w-full min-h-screen overflow-hidden relative bg-black">

            <style>
                {
                    `
                        @keyframes rise{
                            0% {transform: translateY(0); opacity: 0;}
                            10%{opacity: 0.8;}
                            90%{opacity: 0.8;}
                            100%{transform: translateY(-${riseDistance}px); opacity: 0;}
                        }

                        .particle{
                            position: absolute;
                            bottom: 0;
                            border-radius: 50%;
                            background: #00EA50;
                            box-shadow: 0 0 6px 1px rgba(0, 229, 160, 0.6);
                            animation-name: rise;
                            animation-timing-function: linear;
                            animation-iteration-count: infinite;
                        }
                    `
                }
            </style>

            {/* Particle background layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="particle"
                        style={{
                            left: `${p.left}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animation: `rise ${p.duration}s linear ${p.delay}s infinite`
                        }}
                    ></span>
                ))}
            </div>

            {/* Foreground content */}
            <div className="relative z-10">
                {isLoading ? (
                    <p className="text-[#00E5A0] font-bold text-center py-20">Loading...</p>
                ) : !project ? (
                    <div className="text-center py-20">
                        <p className="text-[#E8FDF3] font-bold text-xl mb-3">Project not found</p>
                        <Link to="/projects" className="text-[#00E5A0] underline text-sm">
                            back to projects
                        </Link>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto px-4 py-10">
                        <Link to="/" className="text-xs text-[#7FA895] hover:text-[#00E5A0] mb-6 inline-block capitalize">
                            &larr; back to projects
                        </Link>

                        <div className="rounded-xl bg-[rgba(6,20,15,0.55)] border border-[rgba(0,229,160,0.35)] shadow-[0_0_24px_rgba(0,229,160,0.1)] overflow-hidden">
                            <div className="flex gap-1.5 px-5 pt-4">
                                <span className="w-2 h-2 rounded-full bg-[rgba(0,229,160,0.3)]" />
                                <span className="w-2 h-2 rounded-full bg-[rgba(0,229,160,0.3)]" />
                                <span className="w-2 h-2 rounded-full bg-[rgba(0,229,160,0.3)]" />
                            </div>

                            <h1 className="font-bold text-2xl text-[#E8FDF3] px-5 pt-3">{project.name}</h1>

                            {slides.length > 0 && (
                                <div className="relative mt-4 px-5">
                                    <img
                                        src={slides[slideIndex]}
                                        alt={`${project.name} screenshot ${slideIndex + 1}`}
                                        className="w-full h-72 object-cover rounded-lg border border-[rgba(0,229,160,0.2)]"
                                    />

                                    {slides.length > 1 && (
                                        <>
                                            <button
                                                onClick={goPrev}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-[#00E5A0] flex items-center justify-center"
                                                aria-label="previous screenshot"
                                            >
                                                &#8249;
                                            </button>
                                            <button
                                                onClick={goNext}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-[#00E5A0] flex items-center justify-center"
                                                aria-label="next screenshot"
                                            >
                                                &#8250;
                                            </button>

                                            <div className="flex justify-center gap-1.5 mt-2">
                                                {slides.map((_, i) => (
                                                    <span
                                                        key={i}
                                                        onClick={() => setSlideIndex(i)}
                                                        className={`w-1.5 h-1.5 rounded-full cursor-pointer ${i === slideIndex ? "bg-[#00E5A0]" : "bg-[rgba(0,229,160,0.25)]"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {descriptionItems.length > 0 && (
                                <ol className="list-decimal list-outside pl-10 pr-5 mt-5 space-y-2 text-sm text-gray-300 leading-relaxed marker:text-[#00E5A0] marker:font-bold">
                                    {descriptionItems.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ol>
                            )}

                            {project.teckStack && (
                                <div className="px-5 mt-4">
                                    <p className="text-xs text-[#7FA895] mb-1">Technologies:</p>
                                    <ul className="flex flex-wrap gap-1.5">
                                        {project.teckStack.split(",").map((tech, index) => (
                                            <li
                                                key={index}
                                                className="text-xs px-2 py-0.5 rounded-full border border-[rgba(0,229,160,0.35)] text-[#00E5A0]"
                                            >
                                                {tech.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="flex gap-4 px-5 py-6">
                                {project.livelink && (
                                    <a
                                        href={withProtocol(project.livelink)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm px-4 py-2 rounded-md bg-[#00E5A0] text-[#04150F] font-medium uppercase"
                                    >
                                        live site
                                    </a>
                                )}
                                {project.gitLink && (
                                    <a
                                        href={withProtocol(project.gitLink)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm px-4 py-2 rounded-md border border-[rgba(0,229,160,0.35)] text-[#00E5A0] uppercase"
                                    >
                                        github
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;