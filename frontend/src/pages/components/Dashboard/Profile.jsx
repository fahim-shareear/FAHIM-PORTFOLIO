import { useContext } from "react";
import { useNavigate } from "react-router";
import { Authcontext } from "../../../authcontext/Authcontxt";
import "../../../all-css/profile.css";


const Profile = () => {
    const { user, logOutUser } = useContext(Authcontext);
    const navigate = useNavigate();

    const useSignOut = () => {
        logOutUser();
    };

    const hadnleNavigate = () => {
        navigate("/dashboard/change-password")
    };

    const updateProfile = () => {
        navigate("/dashboard/update-profile")
    }

    const manageResume = () =>{
        navigate("/dashboard/manage-resume");
    };


    return (
        <div className="w-full z-10 main-container relative">
            <div className="border-[#00E5A0] rounded-xl shadow-md profile-container">
                <div className="md:max-w-7xl mx-auto profile-top">
                    <img src={user.image} alt={user.name} className="w-30 h-30 rounded-full border border-[#00E5A0]" />
                    <div>
                        <h1 className="font-bold text-xl text-[#00E5A0]">{user.name}</h1>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-[#00E5A0]">{user.email}</h1>
                    </div>
                    <div>
                        <button onClick={useSignOut} className="signOutButton font-bold">Sign Out</button>
                    </div>
                </div>
                <div className="password p-3">
                    <button onClick={hadnleNavigate} className="c-change">Change Password</button>
                </div>
                <div className="p-3">
                    <button onClick={updateProfile} className="border cursor-pointer border-[#00E5A0] rounded-xl p-2 text-[#00E5A0] font-bold">Update Profile</button>
                </div>
                <div className="p-3">
                    <button onClick={manageResume} className="border cursor-pointer border-[#00E5A0] rounded-xl p-2 text-[#00E5A0] font-bold">Manage Resume</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;