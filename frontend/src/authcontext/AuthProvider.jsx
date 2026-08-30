import { useEffect, useState } from "react";
import { Authcontext } from "./Authcontxt";
import useAxios from "../axios/useAxios";


const AuthProvider = ({children}) =>{
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState(null);
    const axiosSecure = useAxios();

    const logInUser = async (email, password) =>{
        setLoader(true);
        const res = await axiosSecure.post("/login", {email, password});
        setUser({email});
        setLoader(false);
        return res;
    };

    const logOutUser = async () =>{
        await axiosSecure.post("/logout");
        setUser(null);
    };

    useEffect(()=> {
        axiosSecure.get("/me").then((res) =>{
            setUser(res.data);
        }).catch(()=> setUser(null)).finally(()=> setLoader(false));
    }, [axiosSecure]);

    const authInfo = {
        logInUser,
        logOutUser,
        loader,
        user,
    }

    return <Authcontext value={authInfo}>
        {children}
    </Authcontext>
}


export default AuthProvider;