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



const Feedback = () => {
    const axiosinstance = useAxios();
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axiosinstance.get('/feedback').then(res =>{
            setFeedback(res.data || []);
            setLoading(false);
        }).catch(err =>{
            if(err){
                toast.error("Something went wrong!");
            }
        })
    }, [axiosinstance]);

    if(loading) return <p className='text-center italic text-[#005A00] font-bold'>Loading.....</p>


    return (
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
                        <div className='p-8 flex items-left justify-center flex-col gap-3'>
                            <img src="#" alt="#" className='rounded-full w-20 h-20 border-3 border-[#00E5A0]' />
                            <div>
                                <h1 className='font-bold text-[20px] text-[#00E5A0] pt-5'>{f.name}</h1>
                                <p className='text-wrap pt-2'>{f.feedback}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
                }
            </Swiper>

            <button className='font-bold text-[#00E5A0] p-4 rounded-3xl shadow-[inset_0_0_40px_rgba(0,229,160,0.15)] cursor-pointer bg-white/5 uppercase border border-[#00EA50]'>Provide Feedback</button>
        </div>
    );
};

export default Feedback;