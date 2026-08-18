// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import useAxios from '../../axios/useAxios';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import axios from 'axios';



const Feedback = () => {
    const axiosinstance = useAxios();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [feedForm, setFeedForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const {register, reset, handleSubmit,formState: {errors}} = useForm();

    useEffect(() => {
        axiosinstance.get('/feedback').then(res => {
            setFeedback(res.data || []);
            setLoading(false);
        }).catch(err => {
            if (err) {
                toast.error("Something went wrong!");
            }
        })
    }, [axiosinstance]);

    // single toggler for both open + close
    const toggleFeedForm = () => {
        setFeedForm(prev => !prev);
    };

    //handle form submission:
    const handleFormSubmit = (data) =>{
        console.log(data);
        const profileImg = data.image[0];
        setSubmitting(true);

        //uploading image to imgbb:
        const formData = new FormData();
        formData.append('image', profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`
        axios.post(image_API_URL, formData).then(res =>{
            const photoURL = res.data.data.url;

            //feedback payload:
            const feedbackInfo = {
                name: data.name,
                email: data.email,
                feedback: data.feedback,
                photoURL: photoURL,
            };

            axiosinstance.post('/feedback', feedbackInfo).then(res =>{
                toast.success(res.data.message);
                reset();
                setFeedForm(false);
                setSubmitting(false);
            }).catch((err)=>{
                toast.error(err.data.message);
            });
        }).catch(()=>{
            toast.error("Unable to upload your photo.");
        })
    }

    if (loading) return <p className='text-center italic text-[#005A00] font-bold'>Loading.....</p>


    return (
        <div className='relative w-full overflow-hidden'>
            <div className='flex items-center justify-center flex-col gap-10'>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper md:max-w-5xl mx-auto"
                >
                    {
                        feedback.length === 0 ? <p className='font-bold text-xl text-center text-[#00E5A0]'>No Feedbacks yet!</p>
                            :
                            feedback.map((f) => (
                                <SwiperSlide key={f._id} className="w-150! h-80! rounded-xl border-2 border-[#00E5A0] shadow-[inset_0_0_40px_rgba(0,229,160,0.15)] bg-white/4">
                                    <div className='p-8 flex items-center w-full justify-center flex-col gap-2'>
                                        <img src={f.photoURL} alt={f.name} className='rounded-full w-20 h-20 border-3 border-[#00E5A0]' />
                                        <div>
                                            <h1 className='font-bold text-[20px] text-[#00E5A0] pt-5'>{f.name}</h1>
                                            <p className='text-sm'>{f.email}</p>
                                            <p className='text-wrap pt-2 text-[18px]'>{f.feedback}</p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>

                <button className='font-bold 
                                text-[#00E5A0] 
                                p-4 
                                rounded-3xl 
                                shadow-[inset_0_0_40px_rgba(0,229,160,0.15)] 
                                cursor-pointer 
                                bg-white/5 
                                uppercase 
                                border 
                                border-[#00EA50]
                                hover:bg-[#00ea5276]
                                hover:text-white
                                transition-all
                                duration-400
                                linear'
                                onClick={toggleFeedForm}>Provide Feedback</button>
            </div>

            {/* backdrop - click outside to close */}
            <div
                onClick={toggleFeedForm}
                className={`fixed inset-0 bg-black/50 z-90 transition-opacity duration-500 ease-linear
                    ${feedForm ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* sliding panel - always mounted, transform-driven */}
            <div
                className={`border-0 border-l border-[#00EA50] rounded-2xl fixed right-0 top-50 w-130! z-100
                    bg-black shadow-[0_0_40px_rgba(0,229,160,0.18)]
                    transition-transform duration-500 ease-linear
                    ${feedForm ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <form className='w-full' onSubmit={handleSubmit(handleFormSubmit)}>
                    <fieldset className="fieldset gap-3 p-5">
                        <label className="label md:text-xl text-[#00EA50]">Name</label>
                        <input type="text" className="input bg-white/4 border-0 border-b-2 border-[#00EA50] w-full" placeholder="Your Name" {...register("name", {required: true})} />
                        {errors.name?.type === "required" && <p className='text-red-500 p-2 '>Name field is required.</p>}

                        <input type="file" className="file-input w-full border-0 border-b border-[#00EA50] mt-2" {...register("image", {required: true, validate: files=> files[0]?.size <= 2 * 1024 * 1024 || "Image must be under 2MB"})}/>
                        <label className="label">Max size 2MB</label>
                        {errors.image?.type === "required" && <p className='text-red-500 p-2'>You must provide an image</p>}
                        {errors.image?.type === 'validate' && <p className='text-red-500 p-2'>Image must be under 2MB</p>}

                        <label className="label md:text-xl text-[#00EA50]">Email</label>
                        <input type="email" className="input bg-white/4 border-0 border-b-2 border-[#00EA50] w-full" placeholder="Email" {...register("email", {required: true})} />
                        {errors.email?.type === "required" && <p className='text-red-500 p-2'>Please provide your email.</p>}

                        <label className='label md:text-xl text-[#00EA50]'>Feedback</label>
                        <textarea placeholder="Your feedback" className="textarea textarea-accent bg-white/4 border-0 border-b-2 border-[#00EA50] w-full" {...register("feedback", {required: true, maxLength: 130})}></textarea>
                        {errors.feedback?.type === "required" && <p className='font-bold text-red-500 uppercase'>You forgot the most important thing...!!</p>}
                        {errors.feedback?.type === "maxLength" && <p className='font-bold text-red-500'>Please keep it under 130 character</p>}

                        <button type='submit'
                                disabled={submitting}
                                className="btn btn-neutral mt-4 shadow-[inset_0_0_40px_rgba(0,229,160,0.15)] 
                                cursor-pointer 
                                bg-white/5 
                                uppercase 
                                border 
                                border-[#00EA50]
                                hover:bg-[#00ea5276]
                                hover:text-white
                                transition-all
                                duration-400
                                linear">{submitting ? 'Submitting......' : 'Submit'}</button>
                    </fieldset>
                </form>
                <button
                    type="button"
                    onClick={toggleFeedForm}
                    className='font-bold text-[#00EA50] top-3 right-5 cursor-pointer absolute'>X</button>
            </div>
        </div>
    );
};

export default Feedback;