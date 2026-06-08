import { useEffect, useState } from "react";
import { Authcontext } from "./Authcontxt";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {auth} from "../firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) =>{
    const [loader, setLoader] = useState(true);
    const [user, setUser] = useState(null);

    const popUpLogin = () =>{
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };

    const registerUser = (email, password) =>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            setLoader(false);
        });

        return () => unsubscribe();
    }, []);


    const authInfo = {
        popUpLogin,
        loader,
        registerUser,
        user
    }
    return (
        <Authcontext value={authInfo}>
            {children}
        </Authcontext>
    );
};

export default AuthProvider;