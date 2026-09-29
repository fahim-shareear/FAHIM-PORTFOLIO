import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxios from "../../../axios/useAxios";

const ManageResume = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxios();

    const { data: resume, isLoading, refetch } = useQuery({
        queryKey: ["resume"],
        queryFn: async () => {
            const res = await axiosSecure.get("/resume");
            return res.data;
        },
    });

    const handleUpload = async (data) => {
        if (!data.resume || !data.resume[0]) {
            toast.error("Please select a PDF file first", {
                position: "bottom-center",
                autoClose: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append("resume", data.resume[0]);

        try {
            const res = await axiosSecure.post("/resume", formData);
            toast.success(res.data.message || "Resume uploaded", {
                position: "bottom-center",
                autoClose: 2000,
            });
            reset();
            refetch();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to upload resume", {
                position: "bottom-center",
                autoClose: 3000,
            });
        }
    };

    const handleDelete = async () => {
        const confirmation = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete your current resume.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00ea50",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!confirmation.isConfirmed) return;

        try {
            const res = await axiosSecure.delete("/resume");
            Swal.fire({
                title: "Deleted.",
                text: res.data.message || "Resume has been deleted",
                icon: "success",
            });
            refetch();
        } catch (error) {
            Swal.fire({
                title: "Failed",
                text: error?.response?.data?.message || "Unable to delete resume",
                icon: "error",
            });
        }
    };

    return (
        <div className="w-full min-h-screen">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-[#00ea50] mb-8">Manage Resume</h1>

                {/* Current resume card */}
                <div className="border border-[#00ea50]/40 rounded-xl p-6 mb-10 bg-white/5">
                    <h2 className="text-lg font-bold text-[#00ea50] mb-4">Current Resume</h2>

                    {isLoading ? (
                        <p className="text-gray-400 text-sm">Loading...</p>
                    ) : resume?.url ? (
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <p className="text-white font-medium">{resume.fileName || "resume.pdf"}</p>
                                {resume.uploadedAt && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        Uploaded {new Date(resume.uploadedAt).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <a
                                    href={resume.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm rounded border border-[#00ea50] text-[#00ea50] hover:bg-[#00ea50] hover:text-black transition-all cursor-pointer"
                                >
                                    View
                                </a>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 text-sm rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm">No resume uploaded yet.</p>
                    )}
                </div>

                {/* Upload / replace form */}
                <div className="border border-[#00ea50]/40 rounded-xl p-6 bg-white/5">
                    <h2 className="text-lg font-bold text-[#00ea50] mb-4">
                        {resume?.url ? "Replace Resume" : "Upload Resume"}
                    </h2>

                    <form onSubmit={handleSubmit(handleUpload)}>
                        <fieldset className="fieldset flex flex-col gap-4">
                            <div>
                                <label className="label font-bold text-[#00ea50] py-2">PDF File (max 4MB):</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="file-input w-full file-input-success bg-black/5 border-0 border-b border-[#00ea50]"
                                    {...register("resume", { required: true })}
                                />
                                {errors.resume?.type === "required" && (
                                    <p className="font-bold text-sm text-[#00ea50] mt-1">Please select a PDF file.</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn w-full mt-2 cursor-pointer bg-black/5 border border-[#00ea50] text-lg hover:bg-[#00ea50] hover:text-black transition-all"
                            >
                                {resume?.url ? "Replace Resume" : "Upload Resume"}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageResume;