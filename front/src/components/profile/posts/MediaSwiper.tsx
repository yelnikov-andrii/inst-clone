import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const MediaSwiper = ({ files }: { files: File[] }) => {
    return (
        <Swiper 
            slidesPerView={1}
            spaceBetween={10}
        >
            {files.map(file => (
                <SwiperSlide>
                    <img src={URL.createObjectURL(file)} className='object-cover mx-auto' />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default MediaSwiper