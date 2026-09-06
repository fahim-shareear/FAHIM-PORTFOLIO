import { useParams, Link } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../axios/useAxios";

const ProjectDetails = () => {
    const { id } = useParams();
    const axios = useAxios();
    const [slideIndex, setSlideIndex] = useState(0);

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

    const withProtocol = (url) => (url?.startsWith("http") ? url : `https://${url}`);

    if (isLoading) {
        return <p className="text-[#00E5A0] font-bold text-center py-20">Loading...</p>;
    }

    if (!project) {
        return (
            <div className="text-center py-20">
                <p className="text-[#E8FDF3] font-bold text-xl mb-3">Project not found</p>
                <Link to="/projects" className="text-[#00E5A0] underline text-sm">
                    back to projects
                </Link>
            </div>
        );
    }

    const slides = project.screenshots?.length > 0
        ? project.screenshots
        : project.thumbNail
        ? [project.thumbNail]
        : [];

    const goPrev = () => setSlideIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
    const goNext = () => setSlideIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
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
                                            className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                                                i === slideIndex ? "bg-[#00E5A0]" : "bg-[rgba(0,229,160,0.25)]"
                                            }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                <p className="text-sm text-gray-300 px-5 mt-5 leading-relaxed">
                    {project.description}
                </p>

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
    );
};

export default ProjectDetails;