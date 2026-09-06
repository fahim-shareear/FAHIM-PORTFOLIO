import { useState } from "react";
import "../../../all-css/projects-post.css";
import { useForm } from "react-hook-form";
import useAxios from "../../../axios/useAxios";
import { toast } from "react-toastify";

const MAX_SCREENSHOTS = 5;

const ProjectsPost = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [screenshotPreviews, setScreenshotPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
    const axiosSecure = useAxios();

    const handleFormSubmit = (data) => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", data.projectTitle);
        formData.append("description", data.description);
        formData.append("livelink", data.liveLink);
        formData.append("gitLink", data.gitlink);
        formData.append("teckStack", data.teckStack);
        formData.append("image", data.thumbnail[0]);

        Array.from(data.screenshots).forEach((file) => {
            formData.append("screenshots", file);
        });

        axiosSecure.post("/projects", formData)
            .then((res) => {
                toast.success(res.data.message);
                reset();
                setImagePreview(null);
                setScreenshotPreviews([]);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Something went wrong");
            })
            .finally(() => {
                setSubmitting(false);
            });
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

                <form className="post-form" onSubmit={handleSubmit(handleFormSubmit)}>
                    <label className="field-label"><span className="prompt">$</span> title</label>
                    <input type="text" className="field-input" placeholder="Project title" {...register("projectTitle", { required: true })} />
                    {errors.projectTitle && <p className="text-[#00EA50] font-bold">Project name is missing.</p>}

                    <label className="field-label"><span className="prompt">$</span> description</label>
                    <textarea className="field-input field-textarea" placeholder="Short description" rows="3" {...register("description", { required: true })}></textarea>
                    {errors.description && <p className="text-[#00EA50] font-bold">Description of the project is required</p>}

                    <div className="post-form__row">
                        <div className="post-form__col">
                            <label className="field-label"><span className="prompt">$</span> live_url</label>
                            <input type="text" className="field-input" placeholder="https://..." {...register("liveLink", { required: true })} />
                            {errors.liveLink && <p className="text-[#00EA50] font-bold">Please input the live link</p>}
                        </div>
                        <div className="post-form__col">
                            <label className="field-label"><span className="prompt">$</span> github_url</label>
                            <input type="text" className="field-input" placeholder="https://github.com/..." {...register("gitlink", { required: true })} />
                            {errors.gitlink && <p className="text-[#00EA50] font-bold">Please input the github link</p>}
                        </div>
                    </div>

                    <label className="field-label"><span className="prompt">$</span> tech_stack</label>
                    <input type="text" className="field-input" placeholder="React, Node.js, MongoDB (comma separated)" {...register("teckStack", { required: true })} />
                    {errors.teckStack && <p className="text-[#00EA50] font-bold">Please input which tech stack has been used on this project</p>}

                    <label className="field-label"><span className="prompt">$</span> thumbnail</label>
                    <label className="dropzone">
                        {imagePreview ? (
                            <img src={imagePreview} alt="preview" className="dropzone__preview" />
                        ) : (
                            <span className="dropzone__text">drop or click to upload thumbnail</span>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            {...register("thumbnail", {
                                required: true,
                                onChange: (e) => {
                                    const file = e.target.files[0];
                                    if (file) setImagePreview(URL.createObjectURL(file));
                                },
                            })}
                        />
                    </label>
                    {errors.thumbnail && <p className="text-[#00EA50] font-bold">Thumbnail is missing.</p>}

                    <label className="field-label"><span className="prompt">$</span> screenshots</label>
                    <label className="dropzone">
                        <span className="dropzone__text">
                            {screenshotPreviews.length > 0
                                ? `${screenshotPreviews.length} screenshot(s) selected`
                                : "drop or click to upload screenshots (up to 5)"}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            hidden
                            {...register("screenshots", {
                                required: true,
                                validate: (files) =>
                                    files.length <= MAX_SCREENSHOTS || `max ${MAX_SCREENSHOTS} screenshots allowed`,
                                onChange: (e) => {
                                    const files = Array.from(e.target.files);
                                    if (files.length > MAX_SCREENSHOTS) {
                                        setError("screenshots", { message: `max ${MAX_SCREENSHOTS} screenshots allowed` });
                                        setScreenshotPreviews([]);
                                        return;
                                    }
                                    clearErrors("screenshots");
                                    setScreenshotPreviews(files.map((file) => URL.createObjectURL(file)));
                                },
                            })}
                        />
                    </label>
                    {errors.screenshots && <p className="text-[#00EA50] font-bold">{errors.screenshots.message || "Screenshots are missing."}</p>}

                    {screenshotPreviews.length > 0 && (
                        <div className="screenshot-grid">
                            {screenshotPreviews.map((src, i) => (
                                <img key={i} src={src} alt={`screenshot ${i + 1}`} className="screenshot-grid__item" />
                            ))}
                        </div>
                    )}

                    <button type="submit" className="post-btn uppercase font-bold" disabled={submitting}>
                        {submitting ? "posting..." : "post project"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectsPost;