import { useState } from "react";
import "../../../all-css/projects-post.css"
import { useForm } from "react-hook-form";

const ProjectsPost = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagePreview(URL.createObjectURL(file));
    };

    return (
        <div className="projects-post">
            <h1 className="projects-post__title">
                <span className="prompt">&gt;</span> projects
            </h1>

            <div className="post-card">
                <div className="post-card__chrome">
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                </div>
                <h2 className="post-card__heading">add project</h2>

                <form className="post-form" onSubmit={handleSubmit}>
                    <label className="field-label"><span className="prompt">$</span> title</label>
                    <input type="text" className="field-input" placeholder="Project title" {...register("projectTitle", {required: true})} />
                    {errors.projectTitle && <p className="text-[#00EA50] font-bold">Project name is missing.</p>}

                    <label className="field-label"><span className="prompt">$</span> description</label>
                    <textarea className="field-input field-textarea" placeholder="Short description" rows="3" {...register("description", {required: true})}></textarea>
                    {errors.description && <p className="text-[#00EA50] font-bold">Description of the project is required</p>}

                    <div className="post-form__row">
                        <div className="post-form__col">
                            <label className="field-label"><span className="prompt">$</span> live_url</label>
                            <input type="text" className="field-input" placeholder="https://..." {...register("liveLink", {required: true})}/>
                            {errors.liveLink && <p className="text-[#00EA50] font-bold">Please input the live link</p>}
                        </div>
                        <div className="post-form__col">
                            <label className="field-label"><span className="prompt">$</span> github_url</label>
                            <input type="text" className="field-input" placeholder="https://github.com/..." {...register("gitlink", {required: true})}/>
                            {errors.gitlink && <p className="text-[#00EA50] font-bold">Please input the git hub link</p>}
                        </div>
                    </div>

                    <label className="field-label"><span className="prompt">$</span> tech_stack</label>
                    <input type="text" className="field-input" placeholder="React, Node.js, MongoDB (comma separated)" {...register("teckStack", {required: true})} />
                    {errors.teckStak && <p className="text-[#00EA50] font-bold">Please input which tech stack has been used on this project</p>}

                    <label className="field-label"><span className="prompt">$</span> thumbnail</label>
                    <label className="dropzone">
                        {imagePreview ? (
                            <img src={imagePreview} alt="preview" className="dropzone__preview" />
                        ) : (
                            <span className="dropzone__text">drop or click to upload image</span>
                        )}
                        <input type="file" accept="image/*" onChange={handleImageChange} hidden {...register("thumbnail", {required: true})} />
                        {errors.thumbnail && <p className="text-[#00EA50] font-bold">Thumbnail is missing.</p>}
                    </label>

                    <button type="submit" className="post-btn">post project</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectsPost;