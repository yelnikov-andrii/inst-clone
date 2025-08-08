import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { url } from '../../../utils/url';

const MediaSwiper = ({ files, postToUpdate }: { files: File[], postToUpdate?: PostI }) => {
    if (postToUpdate) {
        return (
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
            >
                {postToUpdate.post_media.map((image: PostMediaI) => (
                    <SwiperSlide>
                        <img src={`${url}/${image.filename}`} className='object-cover mx-auto' />
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    }
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