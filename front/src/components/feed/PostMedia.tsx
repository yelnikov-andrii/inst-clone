import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';

interface PostI {
    images: string[];
}

const PostMedia = ({ post }: { post: PostI }) => {
    const postImagesCount = post.images.length;
    const [currentPage, setCurrentPage] = useState(1);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className='w-full mb-5 max-h-[585px] h-[585px] relative'>
            <Swiper
                slidesPerView={1}
                className="h-full"
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation!.prevEl = prevRef.current;
                        swiper.params.navigation!.nextEl = nextRef.current;
                    }
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom'
                }}
                onSlideChange={(swiper) => { setCurrentPage(swiper.realIndex + 1) }}
            >
                {post.images?.map(imageSrc => (
                    <SwiperSlide className='h-full'>
                        <img
                            src={imageSrc}
                            alt='iamge alt'
                            className='w-full h-full object-cover object-center'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            {currentPage !== 1 && (
                <button className="swiper-button-prev-custom absolute p-1 top-1/2 left-[5px] -translate-y-1/2 rounded-full group-hover:opacity-100 transition z-10 flex justify-center items-center" ref={prevRef}>
                    <div className='w-[24px] h-[24px] text-white bg-ig-secondary-background/50 rounded-full'>
                        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M15 18l-6-6 6-6" stroke="#262626" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </button>
            )}
            {currentPage !== postImagesCount && (
                <button className="swiper-button-next-custom absolute  p-1 top-1/2 right-[5px] -translate-y-1/2  rounded-full z-10 flex justify-center items-center" ref={nextRef}>
                    <div className='w-[24px] h-[24px] text-white bg-ig-secondary-background/50 rounded-full'>
                        <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M9 6l6 6-6 6" stroke="#262626" strokeWidth="2" fill="none" />
                        </svg>
                    </div>
                </button>
            )}
        </div>
    )
}

export default PostMedia