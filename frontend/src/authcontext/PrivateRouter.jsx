import { useContext } from "react"
import { Authcontext } from "./Authcontxt"
import { Navigate } from "react-router";



const PrivateRouter = ({children}) =>{
    const {user, loader} = useContext(Authcontext);

    if(loader){
        return <>
            <div className="flex items-center justify-center h-screen">
                <span className="loading loading-infinity loading-xl"></span>
            </div>
        </>
    }

    if(!user){
        return <Navigate to="/login" state={{from: location.pathname}} replace></Navigate>
    }

    return children;
};

export default PrivateRouter