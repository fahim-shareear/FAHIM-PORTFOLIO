import useAxios from "../../axios/useAxios";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router";

const Projects = () => {
    const axios = useAxios();

    const { data: projects = [] } = useQuery({
        queryKey: ['my-projects'],
        queryFn: async () => {
            try {
                const res = await axios.get('/projects');
                return res.data;
            } catch (error) {
                if (error.response?.status === 404) return [];
                throw error;
            }
        }
    });

    return (
        <div>
            <div className="md:max-w-7xl mx-auto z-10">
                {projects.length === 0 ? (
                    <div className="bg-gray-900 text-center w-full rounded-md h-180 flex items-center justify-center mx-auto">
                        <h1 className="font-bold text-gray-400 opacity-30 text-xl">No Projects to Show Yet</h1>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                        {projects.map((project) => (
                            <Link
                                to={`/projects/${project._id}`}
                                key={project._id}
                                className="block rounded-xl overflow-hidden bg-[rgba(6,20,15,0.55)] border border-[rgba(0,229,160,0.25)] hover:border-[#00E5A0] transition-colors"
                            >
                                {project.thumbNail && (
                                    <img
                                        src={project.thumbNail}
                                        alt={project.name}
                                        className="w-full h-40 object-cover"
                                    />
                                )}

                                <h1 className="font-bold text-xl p-2 text-[#E8FDF3]">{project.name}</h1>

                                <div className="w-full p-2">
                                    <p className="text-sm text-gray-400">
                                        {project.description}
                                    </p>
                                </div>

                                {project.teckStack && (
                                    <div className="p-2">
                                        <p className="text-xs text-[#7FA895] mb-1">Technologies:</p>
                                        <ul className="flex flex-wrap gap-1">
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

                                {project.screenshots?.length > 0 && (
                                    <div className="grid grid-cols-3 gap-1 p-2">
                                        {project.screenshots.slice(0, 3).map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`${project.name} screenshot ${i + 1}`}
                                                className="w-full h-16 object-cover rounded"
                                            />
                                        ))}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;