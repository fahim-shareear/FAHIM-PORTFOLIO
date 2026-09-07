import { useForm } from "react-hook-form";


const CertificationPost = () => {
    const { register, handleSubmit, reset } = useForm();



    return (
        <div>
            <div>
                <h1>Certification and Career timeline post dashboard:</h1>
            </div>
            <div>
                <form>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" className="input" placeholder="Email" />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" />
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default CertificationPost;