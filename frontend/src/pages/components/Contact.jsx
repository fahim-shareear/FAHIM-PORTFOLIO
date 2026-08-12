

const Contact = () => {
    return (
        <div className="border border-red-500 md:max-w-4xl mx-auto h-full">
            <h1>Get In Touch With Me:</h1>
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

export default Contact;