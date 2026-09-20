import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import useAxios from "../../../axios/useAxios";
import { Authcontext } from "../../../authcontext/Authcontxt";
import Swal from "sweetalert2";


const DashboardHome = () => {
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();
    const { loading } = useContext(Authcontext);

    // which post is currently open in each modal (null = none)
    const [selectedCert, setSelectedCert] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const certForm = useForm();
    const careerForm = useForm();

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

    // whenever a different certification is selected, refill the form with its data
    useEffect(() => {
        if (selectedCert) {
            certForm.reset({
                courseTitle: selectedCert.courseTitle,
                duration: selectedCert.duration,
                instituteName: selectedCert.instituteName,
                topics: selectedCert.topics?.join(", "),
            });
        }
    }, [selectedCert, certForm]);

    // whenever a different career entry is selected, refill that form too
    useEffect(() => {
        if (selectedCareer) {
            careerForm.reset({
                companyName: selectedCareer.companyName,
                position: selectedCareer.position,
                duration: selectedCareer.duration,
                address: selectedCareer.address,
                responsibilities: selectedCareer.responsibilities?.join(", "),
            });
        }
    }, [selectedCareer, careerForm]);

    // ---------- certification modal handlers ----------

    const openCertModal = (cert) => {
        setSelectedCert(cert);
        document.getElementById('edit_cert_modal').showModal();
    };

    const closeCertModal = () => {
        document.getElementById('edit_cert_modal').close();
        setSelectedCert(null);
    };

    const onUpdateCert = (data) => {
        const formData = new FormData();
        formData.append("courseTitle", data.courseTitle);
        formData.append("duration", data.duration);
        formData.append("instituteName", data.instituteName);
        formData.append("topics", data.topics);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        axiosSecure.patch(`/certification/${selectedCert._id}`, formData)
            .then((res) => {
                Swal.fire({
                    title: "Updated!",
                    text: res.data.message,
                    icon: "success",
                    target: "#edit_cert_modal",
                }).then(() => closeCertModal());
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Unable to update certification.",
                    icon: "error",
                    target: "#edit_cert_modal",
                });
            })
            .finally(() => {
                queryClient.invalidateQueries(["certifications"]);
            });
    };

    const handleDeleteCert = () => {
        // a native <dialog> renders in the browser's "top layer", which sits above
        // regular fixed-position content no matter the z-index. SweetAlert2's popup
        // is just a fixed div, so it would be invisible/unclickable behind an open
        // dialog. Pointing `target` at the dialog makes Swal render as its
        // descendant instead, so it stays part of the same top layer and is visible.
        Swal.fire({
            title: "Are you sure?",
            text: "This certification will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            target: "#edit_cert_modal",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/certification/${selectedCert._id}`)
                    .then((res) => {
                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success",
                            target: "#edit_cert_modal",
                        }).then(() => closeCertModal());
                        queryClient.invalidateQueries(["certifications"]);
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Unable to delete certification.",
                            icon: "error",
                            target: "#edit_cert_modal",
                        });
                    });
            }
        });
    };

    // ---------- career modal handlers ----------

    const openCareerModal = (car) => {
        setSelectedCareer(car);
        document.getElementById('edit_career_modal').showModal();
    };

    const closeCareerModal = () => {
        document.getElementById('edit_career_modal').close();
        setSelectedCareer(null);
    };

    const onUpdateCareer = (data) => {
        axiosSecure.patch(`/career/${selectedCareer._id}`, data)
            .then((res) => {
                Swal.fire({
                    title: "Updated!",
                    text: res.data.message,
                    icon: "success",
                    target: "#edit_career_modal",
                }).then(() => closeCareerModal());
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Unable to update career entry.",
                    icon: "error",
                    target: "#edit_career_modal",
                });
            })
            .finally(() => {
                queryClient.invalidateQueries(["career"]);
            });
    };

    const handleDeleteCareer = () => {
        // same native <dialog> top-layer issue as certification delete — render
        // Swal inside the open dialog instead of closing it first
        Swal.fire({
            title: "Are you sure?",
            text: "This career entry will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            target: "#edit_career_modal",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/career/${selectedCareer._id}`)
                    .then((res) => {
                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success",
                            target: "#edit_career_modal",
                        }).then(() => closeCareerModal());
                        queryClient.invalidateQueries(["career"]);
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Unable to delete career entry.",
                            icon: "error",
                            target: "#edit_career_modal",
                        });
                    });
            }
        });
    };

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
                                        <button
                                            onClick={() => openCertModal(cert)}
                                            className="font-bold text-[#00ea50] mt-3 border border-[#00ea50] rounded-md p-1 cursor-pointer"
                                        >
                                            Edit
                                        </button>
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
                                        <button
                                            onClick={() => openCareerModal(car)}
                                            className="font-bold text-[#00ea50] p-1 border border-[#00ea50] rounded-md mt-2 cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* certification edit/delete modal */}
            <dialog id="edit_cert_modal" className="modal" onClose={() => setSelectedCert(null)}>
                <div className="modal-box">
                    {selectedCert && (
                        <>
                            <h3 className="font-bold text-lg text-[#00ea50]">Edit Certification</h3>

                            <form onSubmit={certForm.handleSubmit(onUpdateCert)} className="flex flex-col gap-3 mt-4">
                                <div>
                                    <label className="text-sm font-bold">Course Name</label>
                                    <input className="input w-full" {...certForm.register("courseTitle", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Duration (months)</label>
                                    <input type="number" className="input w-full" {...certForm.register("duration", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Institution Name</label>
                                    <input className="input w-full" {...certForm.register("instituteName", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Topics (comma separated)</label>
                                    <textarea className="textarea w-full" {...certForm.register("topics", { required: true })}></textarea>
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Replace Image (optional)</label>
                                    <input type="file" className="w-full" {...certForm.register("image")} />
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button type="button" onClick={handleDeleteCert} className="btn btn-error">
                                        Delete
                                    </button>

                                    <div className="flex gap-2">
                                        <button type="button" onClick={closeCertModal} className="btn">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* career edit/delete modal */}
            <dialog id="edit_career_modal" className="modal" onClose={() => setSelectedCareer(null)}>
                <div className="modal-box">
                    {selectedCareer && (
                        <>
                            <h3 className="font-bold text-lg text-[#00ea50]">Edit Career Entry</h3>

                            <form onSubmit={careerForm.handleSubmit(onUpdateCareer)} className="flex flex-col gap-3 mt-4">
                                <div>
                                    <label className="text-sm font-bold">Company Name</label>
                                    <input className="input w-full" {...careerForm.register("companyName", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Designation</label>
                                    <input className="input w-full" {...careerForm.register("position", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Duration</label>
                                    <input className="input w-full" {...careerForm.register("duration", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Address</label>
                                    <input className="input w-full" {...careerForm.register("address", { required: true })} />
                                </div>

                                <div>
                                    <label className="text-sm font-bold">Responsibilities (comma separated)</label>
                                    <textarea className="textarea w-full" {...careerForm.register("responsibilities", { required: true })}></textarea>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <button type="button" onClick={handleDeleteCareer} className="btn btn-error">
                                        Delete
                                    </button>

                                    <div className="flex gap-2">
                                        <button type="button" onClick={closeCareerModal} className="btn">
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-success">
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default DashboardHome;