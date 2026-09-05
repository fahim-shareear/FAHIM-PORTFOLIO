

const ProjectsPost = () => {
    return (
        <div>
            <h1 className="font-bold text-2xl text-[#00EA50]">Projects:</h1>
            <div className="w-full">
                <form>
                    <fieldset className="fieldset flex items-center justify-center gap-5">
                        <label className="label text-2xl font-bold">Title:</label>
                        <input type="text" className="input" placeholder="Title of the Project" />
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="Password" />
                        {/* <div><a className="link link-hover">Forgot password?</a></div> */}
                        <button className="btn btn-neutral mt-4">Post</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default ProjectsPost;