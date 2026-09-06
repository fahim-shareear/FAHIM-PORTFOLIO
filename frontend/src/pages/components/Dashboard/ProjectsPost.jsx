import { useState } from "react";
import "../../../all-css/projects-post.css";
import { useForm } from "react-hook-form";
import useAxios from "../../../axios/useAxios";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MAX_SCREENSHOTS = 5;

const ProjectsPost = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [screenshotPreviews, setScreenshotPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const { register, handleSubmit, formState: { errors }, reset, setError, clearErrors } = useForm();
    const axiosSecure = useAxios();
    const queryClient = useQueryClient();

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ["my-projects"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get("/projects");
                return res.data;
            } catch (error) {
                if (error.response?.status === 404) return [];
                throw error;
            }
        },
    });

    const isEditing = Boolean(editingId);

    const startEdit = (project) => {
        setEditingId(project._id);
        reset({
            projectTitle: project.name,
            description: project.description,
            liveLink: project.livelink,
            gitlink: project.gitLink,
            teckStack: project.teckStack,
        });
        setImagePreview(project.thumbNail || null);
        setScreenshotPreviews(project.screenshots || []);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset({
            projectTitle: "",
            description: "",
            liveLink: "",
            gitlink: "",
            teckStack: "",
        });
        setImagePreview(null);
        setScreenshotPreviews([]);
    };

    const handleDelete = (id, name) => {
        const confirmed = window.confirm(`Delete "${name}"? This can't be undone.`);
        if (!confirmed) return;

        axiosSecure.delete(`/projects/${id}`)
            .then((res) => {
                toast.success(res.data.message);
                queryClient.invalidateQueries({ queryKey: ["my-projects"] });
                if (editingId === id) cancelEdit();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Unable to delete project");
            });
    };

    const handleFormSubmit = (data) => {
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", data.projectTitle);
        formData.append("description", data.description);
        formData.append("livelink", data.liveLink);
        formData.append("gitLink", data.gitlink);
        formData.append("teckStack", data.teckStack);

        if (data.thumbnail?.[0]) {
            formData.append("image", data.thumbnail[0]);
        }
        if (data.screenshots?.length > 0) {
            Array.from(data.screenshots).forEach((file) => {
                formData.append("screenshots", file);
            });
        }

        const request = isEditing
            ? axiosSecure.patch(`/projects/${editingId}`, formData)
            : axiosSecure.post("/projects", formData);

        request
            .then((res) => {
                toast.success(res.data.message);
                queryClient.invalidateQueries({ queryKey: ["my-projects"] });
                cancelEdit();
                reset();
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
                <h2 className="post-card__heading">{isEditing ? "edit project" : "add project"}</h2>

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
                            <input
                                type="text"
                                className="field-input"
                                placeholder="https://..."
                                {...register("liveLink", {
                                    required: true,
                                    pattern: { value: /^https?:\/\/.+/, message: "must start with http:// or https://" },
                                })}
                            />
                            {errors.liveLink && <p className="text-[#00EA50] font-bold">{errors.liveLink.message || "Please input the live link"}</p>}
                        </div>
                        <div className="post-form__col">
                            <label className="field-label"><span className="prompt">$</span> github_url</label>
                            <input
                                type="text"
                                className="field-input"
                                placeholder="https://github.com/..."
                                {...register("gitlink", {
                                    required: true,
                                    pattern: { value: /^https?:\/\/.+/, message: "must start with http:// or https://" },
                                })}
                            />
                            {errors.gitlink && <p className="text-[#00EA50] font-bold">{errors.gitlink.message || "Please input the github link"}</p>}
                        </div>
                    </div>

                    <label className="field-label"><span className="prompt">$</span> tech_stack</label>
                    <input type="text" className="field-input" placeholder="React, Node.js, MongoDB (comma separated)" {...register("teckStack", { required: true })} />
                    {errors.teckStack && <p className="text-[#00EA50] font-bold">Please input which tech stack has been used on this project</p>}

                    <label className="field-label">
                        <span className="prompt">$</span> thumbnail
                        {isEditing && <span className="field-hint"> (leave empty to keep current)</span>}
                    </label>
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
                                required: !isEditing,
                                onChange: (e) => {
                                    const file = e.target.files[0];
                                    if (file) setImagePreview(URL.createObjectURL(file));
                                },
                            })}
                        />
                    </label>
                    {errors.thumbnail && <p className="text-[#00EA50] font-bold">Thumbnail is missing.</p>}

                    <label className="field-label">
                        <span className="prompt">$</span> screenshots
                        {isEditing && <span className="field-hint"> (leave empty to keep current)</span>}
                    </label>
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
                                required: !isEditing,
                                validate: (files) =>
                                    !files || files.length <= MAX_SCREENSHOTS || `max ${MAX_SCREENSHOTS} screenshots allowed`,
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

                    <div className="post-form__actions">
                        <button type="submit" className="post-btn uppercase font-bold" disabled={submitting}>
                            {submitting ? "saving..." : isEditing ? "save changes" : "post project"}
                        </button>
                        {isEditing && (
                            <button type="button" className="post-btn post-btn--ghost uppercase font-bold" onClick={cancelEdit}>
                                cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="manage-section">
                <h2 className="manage-section__title">
                    <span className="prompt">$</span> existing_projects
                </h2>

                {isLoading ? (
                    <p className="manage-empty">Loading...</p>
                ) : projects.length === 0 ? (
                    <p className="manage-empty">No projects posted yet.</p>
                ) : (
                    <div className="manage-grid">
                        {projects.map((project) => (
                            <div key={project._id} className="manage-card">
                                {project.thumbNail && (
                                    <img src={project.thumbNail} alt={project.name} className="manage-card__thumb" />
                                )}
                                <div className="manage-card__body">
                                    <p className="manage-card__title">{project.name}</p>
                                    <p className="manage-card__stack">{project.teckStack}</p>
                                </div>
                                <div className="manage-card__actions">
                                    <button className="manage-btn manage-btn--edit" onClick={() => startEdit(project)}>
                                        edit
                                    </button>
                                    <button
                                        className="manage-btn manage-btn--delete"
                                        onClick={() => handleDelete(project._id, project.name)}
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPost;