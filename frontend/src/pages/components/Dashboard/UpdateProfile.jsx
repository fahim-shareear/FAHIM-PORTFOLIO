import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxios from "../../../axios/useAxios";


const UpdateProfile = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const axiosSecure = useAxios();

    const handleUpdateProfileUpdateForm = (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, post it!"
        }).then(res => {
            if(res.isConfirmed){
                axiosSecure.post("/update-profile", formData)
                    .then(res =>{
                        if(res.updatedCount === 1){
                            Swal.fire({
                                title: "Updated.",
                                text: "Profile Has been updated",
                                icon: "success"
                            });
                            reset()
                        }
                    })
            };
        }).catch(err => {
            Swal.fire({
                title: "Failed",
                text: err?.response?.data?.message || "Unable to update profile.",
                icon: "error"
            })
        })

    }


    return (
        <div>
            <div className="w-200 md:max-w-5xl mx-auto mt-100 flex items-center justify-center">
                <form onSubmit={handleSubmit(handleUpdateProfileUpdateForm)}>
                    <fieldset className="fieldset flex items-start flex-col w-110 gap-5">
                        <div className="w-full">
                            <label className="label font-bold text-xl opacity-100 text-[#00E5A0] py-2">Name:</label>
                            <input type="text" placeholder="Name" className="input bg-black/5 w-full border-0 border-b border-[#00E5A0]" {...register("name", { required: true })} />
                            {errors.name?.type === "required" && <p className="font-bold text-sm text-[300ea50]">Please input your name.</p>}
                        </div>
                        <div className="w-full">
                            <label className="label font-bold text-xl text-[#00E5A0] py-2">Profile Image:</label>
                            <input type="file" className="file-input w-full file-input-success bg-black/5 border-0 border-b border-[#00E5A0]" />
                        </div>
                    </fieldset>
                    <button className="btn w-full mt-5 cursor-pointer bg-black/5 border border-[#00E5A0] text-xl hover:bg-[#00E5A0] transition-all linear" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;