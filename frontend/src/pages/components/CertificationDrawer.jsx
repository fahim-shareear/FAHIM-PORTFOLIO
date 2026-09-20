import { IoMdCloseCircle } from "react-icons/io";
import useCertification from "../../authcontext/hooks/useCertification";
import "../../all-css/certification.css";
import useAxios from "../../axios/useAxios";
import { useQuery } from "@tanstack/react-query";

const CertificationDrawer = () => {
    const { isCertOpen, closeCertifcationDrawer } = useCertification();
    const axiosSecure = useAxios();

    const { data: certifications = [], isLoading, isError } = useQuery({
        queryKey: ["my-certification"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/certification");
                return res.data;
            } catch (error) {
                if (error.response?.status === 400) return [];
                throw error;
            }
        }
    });


    const { data: career = [] } = useQuery({
        queryKey: ["my-career"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/career");
                return res.data;
            } catch (error) {
                if (error.response?.stauts === 400) return [];
                throw error;
            }
        }
    })

    return (
        <>
            <div
                className={`cert-backdrop ${isCertOpen ? "show" : ""}`}
                onClick={closeCertifcationDrawer}
            />
            <div className={`cert-drawer ${isCertOpen ? "open" : ""}`}>
                <button className="cert-close" onClick={closeCertifcationDrawer}>
                    <IoMdCloseCircle className="icons" />
                </button>
                <div className="cert-content">
                    <div className="md:max-w-7xl mx-auto">
                        <h1 className="font-bold text-xl text-[#00ea50] underline p-2">Certifications:</h1>

                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 p-2">
                            {!isLoading && !isError && certifications.map((cert) => (
                                <div
                                    key={cert._id}
                                    className="group flex flex-col gap-3 border border-[#00ea50]/40 rounded-xl p-4 bg-white/5 backdrop-blur-sm hover:border-[#00ea50] hover:shadow-[0_0_20px_rgba(0,234,80,0.35)] transition-all duration-300">
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:max-w-7xl mx-auto mt-10">
                        <h1 className="font-bold text-xl text-[#00ea50] underline">Career:</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 p-2">
                            {!isLoading && !isError && career.map((car) => (
                                <div key={car._id} className="group flex flex-col gap-2 border border-[#00ea50]/40 rounded-xl p-4 bg-white/5 backdrop-blur-sm hover:border-[#00ea50]">
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
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CertificationDrawer;