import useAxios from "../../axios/useAxios";
import { useQuery } from '@tanstack/react-query';

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
            };
        }
    });


    return (
        <div>
            <div className="md:max-w-7xl mx-auto z-10">
                {
                    projects.length === 0 ? 
                    <div className="bg-gray-900 text-center w-full rounded-md h-180 flex items-center justify-center mx-auto">
                        <h1 className="font-bold text-gray-400 opacity-30 text-xl">No Projects to Show Yet</h1>
                    </div> 
                    : 
                    <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                        {
                            projects.map((project) => (
                                <div key={project._id} className="rounded-xl">
                                    <h1 className="font-bold text-xl p-2">{project.title}</h1>
                                    <div className="w-full p-2">
                                        <p className="text-sm text-grey-500">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Technologies:</p>
                                        {
                                            project.teckStack?.map((p, index) =>{
                                                <li key={index}>
                                                    {p}
                                                </li>
                                            })
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Projects;