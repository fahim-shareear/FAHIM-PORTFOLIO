import { useContext, useState } from "react";
import "../../all-css/login.css";
import { Authcontext } from "../../authcontext/Authcontxt";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
    const { logInUser } = useContext(Authcontext);
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors }, } = useForm();
    const [eye, setEye] = useState(false);

    const handleEye = (e) => {
        e.preventDefault();
        setEye(!eye)
    }

    const handleLogin = (data) =>{
        logInUser(data.email, data.password)
            .then(()=>{
                navigate(location.state?.from?.pathname || "/dashboard");
                toast.success("Welcome Back", {
                    position: "top-right",
                    duration: 3000,
                    style:{
                        background: "#00EA50",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "18px",
                    }
                })
            }).catch(()=>{
                setError("root", {message: "invalid email or password"});
            })
    };

    return (
        <div className="login_container">
            <div className="auth-card">
                <div className="auth-card__chrome">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>

                <h2 className="auth-card__title">
                    <span className="prompt">&gt;</span> access_terminal<span className="cursor">_</span>
                </h2>

                <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
                    <label className="field-label" htmlFor="email">
                        <span className="prompt">$</span> email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="field-input"
                        placeholder="name@domain.com"
                        autoComplete="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <p className="auth-error p-2 capitalize text-sm text-red-500">email is required</p>}

                    <div className="relative">
                        <label className="field-label" htmlFor="password">
                            <span className="prompt">$</span> password
                        </label>
                        <input
                            id="password"
                            type={eye ? "text" : "password"}
                            className="field-input"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            {...register("password", { required: true })}
                        />
                        <button className="top-9 right-5 absolute text-xl text-[#00EA50] cursor-pointer" onClick={handleEye}>
                            {eye ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <p className="auth-error p-2 capitalize text-sm text-red-500">password is required</p>}
                        { }
                    </div>

                    <div className="auth-form__meta">
                        <a className="auth-link">forgot password?</a>
                    </div>
                    {errors.root && <p className="auth-error text-sm uppercase text-red-500">{errors.root.message}</p>}
                    <button type="submit" className="auth-btn">
                        log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;