import { useForm } from "react-hook-form";
import useAxios from "../../../axios/useAxios";
import Swal from "sweetalert2"


const CertificationPost = () => {
    const { register: registerCert, handleSubmit: handleSubmitCert, reset: resetCert, formState: { errors: certErrors } } = useForm();
    const { register: registerCareer, handleSubmit: handleSubmitCareer, reset: resetCareer, formState: { errors: careerErrors } } = useForm();
    const axiosSecure = useAxios();


    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("courseTitle", data.courseTitle);
        formData.append("duration", data.duration);
        formData.append("instituteName", data.instituteName);
        formData.append("topics", data.topics);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        };

        // console.log([...formData.entries()]);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, post it!"
        }).then((result) => {

            if (result.isConfirmed) {
                axiosSecure.post("/certification", formData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Posted!",
                                text: "Your entry has been posted.",
                                icon: "success"
                            });
                            resetCert();
                        }
                    })
            }
        });
    };

    const handleCareerFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("companyName", data.companyName);
        formData.append("position", data.position);
        formData.append("duration", data.duration);
        formData.append("address", data.address);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: "#d33",
            confirmButtonText: "Yes, post it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post("/career", formData)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Posted!",
                                text: "Your entry has been posted.",
                                icon: "sucess",
                            });
                            resetCareer();
                        }
                    })
            }
        });
    };

    return (
        <div className="">
            <div className="p-4">
                <h1 className="font-bold text-2xl text-[#00ea50]">Post Certifications:</h1>
            </div>
            <div className="md:max-w-7xl mx-auto">
                <form onSubmit={handleSubmitCert(handleFormSubmit)}>
                    <fieldset className="fieldset">
                        <div className="grid grid-cols-3 gap-5">
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Course Name:</label>
                                <input type="text" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="Course Name" {...registerCert("courseTitle", { required: true })} />
                                {certErrors.courseTitle && <p className="font-bold text-sm text-[#00ea50]">Please enter the coure title</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Duration:</label>
                                <input type="number" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="months" {...registerCert("duration", { required: true })} />
                                {certErrors.duration && <p className="font-bold text-sm text-[#00ea50]">Please enter the course period</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Institutions Name:</label>
                                <input type="text" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="Institutions Name" {...registerCert("instituteName", { required: true })} />
                                {certErrors.instituteName && <p className="font-bold text-sm text-[#00EA50]">Please enter the Institutions name</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Course Topics:</label>
                                <textarea placeholder="Success" className="textarea textarea-success bg-white/5 border-0 border-b border-[#00EA50]" {...registerCert("topics", { required: true })}></textarea>
                                {certErrors.topics && <p className="font-bold text-sm text-[#00EA50]">Please enter the course topics</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Upload certificate:</label>
                                <input type="file" className="bg-white/5 border-0 border-b border-[#00EA50] text-xl" {...registerCert("image")} />
                            </div>
                        </div>
                        <button className="btn bg-white/4 border-[#00ea50] cursor-pointer mt-4">Submit</button>
                    </fieldset>
                </form>
            </div>

            <div className="mt-10">
                <h1 className="font-bold text-2xl text-[#00ea50] p-4">Post Career:</h1>
                <div className="md:max-w-8xl mx-auto">
                    <form onSubmit={handleSubmitCareer(handleCareerFormSubmit)}>
                        <fieldset className="fieldset">
                            <div className="mx-auto grid grid-cols-4 gap-4">
                                <div className="flex flex-col gap-3 w-100">
                                    <label className="label font-bold text-[15px]">Company Name</label>
                                    <input type="text" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" placeholder="Company Name" {...registerCareer("companyName", { required: true })} />
                                    {careerErrors.companyName && <p className="font-bold text-sm text-[#00ea50]">Please enter the company name</p>}
                                </div>
                                <div className="flex flex-col gap-3 w-100">
                                    <label className="label font-bold text-[15px]">Designation</label>
                                    <input type="text" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" placeholder="Designation" {...registerCareer("position", { required: true })} />
                                    {careerErrors.position && <p className="font-bold text-sm text-[#00ea50]">Please enter your designation</p>}
                                </div>
                                <div className="flex flex-col gap-3 w-100">
                                    <label className="label font-bold text-[15px]">Duration</label>
                                    <input type="text" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" placeholder="Duratoin" {...registerCareer("duration", {required: true})} />
                                    {careerErrors.duration && <p className="text-sm font-bold text-[#00ea50]">Please input your employment history</p>}
                                </div>
                                <div className="flex flex-col gap-3 w-100">
                                    <label className="label font-bold text-[15px]">Address</label>
                                    <input type="text" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" placeholder="Address" {...registerCareer("address", {required: true})} />
                                    {careerErrors.address && <p className="font-bold text-sm text-[#00ea50]">Please input your office address</p>}
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button className="text-xl font-bold text-[#00ea50] rounded-md bg-white/5 border border-[#00ea50] cursor-pointer w-50 p-2">Submit</button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CertificationPost;