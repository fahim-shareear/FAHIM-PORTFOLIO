import { IoMdCloseCircle } from "react-icons/io";
import useCertification from "../../authcontext/hooks/useCertification";
import "../../all-css/certification.css";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../axios/useAxios";

const CertificationDrawer = () => {
    const { isCertOpen, closeCertifcationDrawer } = useCertification();
    const axiosSecure = useAxios();


    const { data: certification = [], isLoading, isError } = useQuery({
        queryKey: ["my-certifications"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/certification");
                // console.log(res.data);
                return res.data;
            } catch (error) {
                if (error.response?.status === 400) return [];
                throw error;
            }
        }
    });

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
                    {/* certification cards go here */}
                    {
                        !isLoading && !isError && certification.map((cert) => (
                            <div key={cert._id} className="md:max-w-7xl mx-auto">
                                <div className="">
                                    <h1 className="text-[#00ea50] font-bold text-xl underline">Certifications:</h1>
                                    <div>
                                        <h1 className="font-bold text-[#00ea50]">{cert.courseTitle}</h1>
                                        <h1>{cert.instituteName}</h1>
                                        <h1>{cert.duration}</h1>
                                        {
                                            cert.image && (
                                                <img src={cert.image} alt={cert.courseTitle} />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default CertificationDrawer;