import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import StoryItem from './StoryItem';
import { Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';

const Stories = () => {
    const [slidesCount, setSlideCount] = useState(6);
    const [spaceBetween, setSpaceBetween] = useState(32);
    const gapCount = slidesCount - 1;
    const [width, setWidth] = useState(630);
    const itemWidth = (width - (gapCount * spaceBetween)) / slidesCount;
    const swiperRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const allSlidesCount = 10;

    const pagesCount = Math.ceil(allSlidesCount / slidesCount);

    useEffect(() => {
        function handleResize() {
            if (swiperRef?.current) {
                const offsetWidth = swiperRef?.current.offsetWidth;
                setWidth(offsetWidth);
            }

            if (window.innerWidth <= 425) {
                setSlideCount(4);
                setSpaceBetween(16);
                return;
            }

            if (window.innerWidth <= 600) {
                setSlideCount(5);
                setSpaceBetween(16);
                return;
            }

            setSlideCount(6);
            setSpaceBetween(32);
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div className='relative' ref={swiperRef}>
            <Swiper
                spaceBetween={spaceBetween}
                slidesPerView={slidesCount}
                slidesPerGroup={slidesCount}
                modules={[Navigation]}
                navigation={{
                    nextEl: '.swiper-button-next-custom-stories',
                    prevEl: '.swiper-button-prev-custom-stories',
                }}
                onSlideChange={() => setCurrentPage(page => page + 1)}
            >
                <SwiperSlide>
                    <StoryItem
                        isWatched={false}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={false}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={false}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <StoryItem
                        isWatched={true}
                        itemWidth={itemWidth}
                    />
                </SwiperSlide>
            </Swiper>
            <button 
                className="swiper-button-prev-custom-stories absolute top-1/2 left-[5px] -translate-y-1/2 text-white bg-ig-secondary-background/50 rounded-full group-hover:opacity-100 transition z-10 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
            >
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M15 18l-6-6 6-6" stroke="#262626" strokeWidth="2" fill="none" />
                </svg>
            </button>
            <button 
                className="swiper-button-next-custom-stories absolute top-1/2 right-[5px] -translate-y-1/2 text-white bg-ig-secondary-background/50 rounded-full group-hover:opacity-100 transition z-10 disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={currentPage === pagesCount}
            >
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M9 6l6 6-6 6" stroke="#262626" strokeWidth="2" fill="none" />
                </svg>
            </button>
        </div>
    );
};

export default Stories