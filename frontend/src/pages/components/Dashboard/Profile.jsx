import { useContext } from "react";
import { Authcontext } from "../../../authcontext/Authcontxt";


const Profile = () => {
    const {user} = useContext(Authcontext);

    console.log(user);


    return (
        <div>
            
        </div>
    );
};

export default Profile;