import { useContext } from "react";
import { Authcontext } from "../../../authcontext/Authcontxt";
import "../../../all-css/profile.css";


const Profile = () => {
    const { user, logOutUser } = useContext(Authcontext);

    const useSignOut = () =>{
        logOutUser();
    };


    return (
        <div className="w-full z-10 main-container">
            <div className="border-[#00ea50] rounded-xl shadow-md profile-container">
                <div className="md:max-w-7xl mx-auto profile-top">
                    <img src={user.image} alt={user.name} className="w-30 h-30 rounded-full border border-[#00ea50]" />
                    <div>
                        <h1>{user.email}</h1>
                    </div>
                    <div>
                        <button onClick={useSignOut} className="signOutButton">Sign Out</button>
                    </div>
                </div>
                <div className="password p-3">
                    <button>Change Password</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;