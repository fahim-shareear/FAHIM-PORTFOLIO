import { useForm } from "react-hook-form";
import useAxios from "../../../axios/useAxios";
import Swal from "sweetalert2"


const CertificationPost = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxios();


    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("courseTitle", data.courseTitle);
        formData.append("duration", data.duration);
        formData.append("instituteName", data.instituteName);
        formData.append("topics", data.topics);
        if(data.image && data.image[0]){
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
                            reset();
                        }
                    })
            }
        });
    };

    return (
        <div className="">
            <div className="p-4">
                <h1 className="font-bold text-xl">Post Certifications:</h1>
            </div>
            <div className="md:max-w-7xl mx-auto">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <fieldset className="fieldset">
                        <div className="grid grid-cols-3 gap-5">
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Course Name:</label>
                                <input type="text" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="Course Name" {...register("courseTitle", { required: true })} />
                                {errors.courseTitle && <p className="font-bold text-sm text-[#00ea50]">Please enter the coure title</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Duration:</label>
                                <input type="number" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="months" {...register("duration", { required: true })} />
                                {errors.duration && <p className="font-bold text-sm text-[#00ea50]">Please enter the course period</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Institutions Name:</label>
                                <input type="text" className="input bg-white/5 border-0 border-b border-[#00EA50]" placeholder="Institutions Name" {...register("instituteName", { required: true })} />
                                {errors.instituteName && <p className="font-bold text-sm text-[#00EA50]">Please enter the Institutions name</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Course Topics:</label>
                                <textarea placeholder="Success" className="textarea textarea-success bg-white/5 border-0 border-b border-[#00EA50]" {...register("topics", { required: true })}></textarea>
                                {errors.topics && <p className="font-bold text-sm text-[#00EA50]">Please enter the course topics</p>}
                            </div>
                            <div className="flex flex-col gap-3">
                                <label className="label font-bold text-xl text-white">Upload certificate:</label>
                                <input type="file" className="bg-white/5 border-0 border-b border-[#00EA50] text-xl" {...register("image")} />
                            </div>
                        </div>
                        <button className="btn bg-white/4 border-[#00ea50] cursor-pointer mt-4">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default CertificationPost;
