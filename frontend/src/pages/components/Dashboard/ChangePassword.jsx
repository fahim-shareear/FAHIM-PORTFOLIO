import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../axios/useAxios";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";


const ChangePassword = () => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });


    const axiosSecure = useAxios();


    const handleEye = (field) => (e) => {
        e.preventDefault();
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    }

    // eslint-disable-next-line react-hooks/incompatible-library
    const newPassword = watch("newPassword");

    const handlePassworSubmitForm = async (data) => {
        setMessage(null);
        setLoading(true);

        try {
            const res = await axiosSecure.patch("/change-password", {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }, {
                withCredentials: true
            });
            setMessage({ type: "success", text: res.data.message || "Password Updated" });
            reset();
        } catch (error) {
            setMessage({
                type: "error",
                text: error?.response?.data?.message || "Something went wrong, please try again!"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <div className="md:max-w-7xl mx-auto relative min-h-screen">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <form onSubmit={handleSubmit(handlePassworSubmitForm)}>
                        <fieldset className="fieldset">
                            <div className="w-120 flex items-left flex-col gap-4">
                                <div className="p-2 relative">
                                    <label className="label font-bold text-xl text-[#00ea50] py-2">Current Password:</label>
                                    <input type={showPassword.currentPassword ? "text" : "password"} placeholder="Current Password" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" {...register("currentPassword", { required: true })} />
                                    <button 
                                    onClick={handleEye("currentPassword")}
                                    className="absolute top-15 right-5 text-[20px] text-[#00ea50] cursor-pointer">{showPassword.currentPassword ? <IoMdEyeOff /> : <IoEye />}</button>
                                    {errors.currentPassword && <p className="font-bold text-sm text-[#00ea50]">Please don't miss your Current Password!</p>}
                                </div>
                                <div className="p-2 relative">
                                    <label className="label font-bold text-xl text-[#00ea50] py-2">New Password:</label>
                                    <input type={showPassword.newPassword ? "text" : "password"} placeholder="New Password" className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" {...register("newPassword", { required: true, minLength: 8 })} />
                                    <button 
                                    onClick={handleEye("newPassword")}
                                    className="absolute top-15 right-5 text-[20px] text-[#00ea50] cursor-pointer">{showPassword.newPassword ? <IoMdEyeOff /> : <IoEye />}</button>
                                    {errors.newPassword?.type === "required" && <p className="font-bold text-sm text-[#00ea50]">Please Enter your New Password!</p>}
                                    {errors.newPassword?.type === "minLength" && <p className="font-bold text-sm text-[#00ea50]">Password must be 8 character long!</p>}
                                </div>
                                <div className="p-2 relative">
                                    <label className="label font-bold text-xl text-[#00ea50] py-2">Confirm Password:</label>
                                    <input type={showPassword.confirmPassword ? "text" : "password"} className="input w-full bg-white/5 border-0 border-b border-[#00ea50]" placeholder="Confirm Password" {...register("confirmPassword", { required: true, validate: (value) => value === newPassword || "Password do not match" })} />
                                    <button 
                                    onClick={handleEye("confirmPassword")}
                                    className="absolute top-15 right-5 text-[20px] text-[#00ea50] cursor-pointer">{showPassword.confirmPassword ? <IoMdEyeOff /> : <IoEye />}</button>
                                    {errors.confirmPassword && <p className="font-bold text-sm text-[#00ea50]">{errors.confirmPassword.message || "Please Confirm Your Password!"}</p>}
                                </div>
                            </div>
                            {
                                message && (
                                    <p className={`p-2 font-semibold text-sm capitalize ${message.type === "success" ? "text-[#00ea50]" : "text-red-500"}`}>{message.text}</p>
                                )
                            }
                            <button disabled={loading} className="btn bg-white/5 border cursor-pointer border-[#00ea50] py-5">{loading ? "Updating......" : "Change Password"}</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;