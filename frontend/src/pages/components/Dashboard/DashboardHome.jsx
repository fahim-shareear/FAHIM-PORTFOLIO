import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../axios/useAxios";
import { useContext } from "react";
import { Authcontext } from "../../../authcontext/Authcontxt";


const DashboardHome = () => {
    const axiosSecure = useAxios();
    const { loading } = useContext(Authcontext);

    const { data: certifications = [] } = useQuery({
        queryKey: ['certifications'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/certification");
                return res.data
            } catch (error) {
                if (error.response?.status === 400) return [];
                throw error;
            };
        }
    });

    const { data: career = [] } = useQuery({
        queryKey: ['career'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/career");
                return res.data;
            } catch (error) {
                if (error.response?.status === 400) return [];
            };
        }
    });

    if (loading) return <p className="font-bold text-xl text-[#00ea50] text-center">Loading.........</p>


    return (
        <div>
            <div className="w-full text-center mt-4">
                <h1 className="font-bold text-xl text-[#00ea50] uppercase">welcome to the dashboard homepage</h1>
            </div>
            <div className="w-full certification-container">
                <div className="w-[90%] m-3">
                    <div className="ml-3">
                        <h2 className="font-bold text-xl text-[#00ea50] p-1">Certification Posts:</h2>
                    </div>
                    <div className="grid grid-cols-5 gap-3 ml-3">
                        {
                            certifications.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="group relative flex flex-col gap-3 border border-[#00ea50]/40 rounded-xl p-4 bg-white/5 backdrop-blur-sm hover:border-[#00ea50] hover:shadow-[0_0_20px_rgba(0,234,80,0.35)] transition-all duration-300">
                                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/40">
                                        {cert.image ? (
                                            <img
                                                src={cert.image}
                                                alt={cert.courseTitle}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#00ea50]/40 text-xs">
                                                No image
                                            </div>
                                        )}
                                    </div>

                                    <h1 className="font-bold text-base text-[#00ea50]">{cert.courseTitle}</h1>
                                    <p className="text-sm text-white/70">{cert.instituteName}</p>
                                    <p className="text-xs text-[#00ea50] opacity-40">{cert.duration} months</p>

                                    {cert.topics?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {cert.topics.map((topic, idx) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2 py-1 rounded-full border border-[#00ea50]/50 text-[#00ea50] bg-[#00ea50]/5"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="absolute top-0 right-5">
                                        <button className="font-bold text-[#00ea50] mt-3 border border-[#00ea50] rounded-md p-1 cursor-pointer">Edit</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="career-container w-full">
                <div className="w-[90%] m-3">
                    <div className="ml-3">
                        <h1 className="font-bold text-xl text-[#00ea50]">Career posts:</h1>
                    </div>
                    <div className="grid grid-cols-5 gap-3 ml-3">
                        {
                            career.map((car) => (
                                <div key={car._id} className="group relative flex flex-col gap-2 border border-[#00ea50]/40 rounded-xl p-4 bg-white/5 backdrop-blur-sm hover:border-[#00ea50]">
                                    <h1 className="font-bold text-xl text-[#00ea50]">{car.companyName}</h1>
                                    <h1 className="text-sm">{car.position}</h1>
                                    <h1 className="text-[#53f900]">{car.duration}</h1>
                                    <h1>{car.address}</h1>
                                    {
                                        car.responsibilities?.length > 0 && (
                                            <div className="flex flex-col gap-2 px-2 py-2">
                                                {
                                                    car.responsibilities.map((res, id) => (
                                                        <li key={id} className="text-xs px-2 text-[#00ea50]">
                                                            {res}
                                                        </li>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }

                                    <div className="absolute top-0 right-4">
                                        <button className="font-bold text-[#00ea50] p-1 border border-[#00ea50] rounded-md mt-2 cursor-pointer">Edit</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;