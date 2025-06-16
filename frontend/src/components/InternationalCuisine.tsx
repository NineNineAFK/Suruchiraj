import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Swiper as SwiperType } from 'swiper/types';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';

const cuisines = [
  {
    name: 'American',
    image: '/international cuisine/American Cuisine.png',
    description: 'Bold flavors, comforting classics, and culinary adventure in every bite!',
  },
  {
    name: 'Thai',
    image: '/international cuisine/Thai Cuisine1.png',
    description: 'Experience a vibrant dance of sweet, spicy, sour, and savory!',
  },
  {
    name: 'Mexican',
    image: '/international cuisine/Mexican Cuisine.png',
    description: 'Zesty tacos, fresh salsa, and spicy traditions.',
  },
  {
    name: 'Italian',
    image: '/international cuisine/Italian Cuisine.png',
    description: 'Savory pastas, cheesy pizzas, and rich sauces.',
  },
  {
    name: 'Chinese',
    image: '/international cuisine/Chinese Cuisine.png',
    description: 'Explore ancient traditions and dynamic flavors in every delicious dish!',
  },
  {
    name: 'Other',
    image: '/international cuisine/American Cuisine.png',
    description: 'Discover a world of flavors beyond the ordinary!',
  },
];

const InternationalCuisine: React.FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <section id="international" className="-mt-5 px-4 md:px-8 text-center relative font-heading">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        International <span className="text-yellow-400">Cuisine</span>
      </h2>

      {/* Navigation Buttons (only show on md and above) */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`hidden md:block absolute left-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
          isBeginning
            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
            : 'bg-white/20 text-white hover:bg-yellow-400 hover:text-black'
        }`}
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={`hidden md:block absolute right-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
          isEnd
            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
            : 'bg-white/20 text-white hover:bg-yellow-400 hover:text-black'
        }`}
      >
        <FiChevronRight className="text-2xl" />
      </button>

      <div className="relative max-w-5xl mx-auto overflow-visible">
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerGroup={1}
          grabCursor={false}
          lazy={true}
          loop={false}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Navigation, Pagination]}
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="pb-10"
        >
          {cuisines.map((cuisine, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full overflow-visible transition-transform duration-300 hover:scale-[1.03]"
            >
              <div
                onClick={() => navigate(`/cuisine/${cuisine.name.toLowerCase()}`)}
                className="relative cursor-pointer 
                  h-36 w-28 md:h-[240px] md:w-[180px] 
                  bg-transparent backdrop-blur-md rounded-3xl 
                  overflow-hidden shadow-lg transition-transform duration-300 
                  hover:scale-[1.03] border border-white/10"
              >
                {/* Image */}
                <div
                  className="absolute -top-[6vw] -left-[5vw] w-[28vw] h-[28vw] md:w-52 md:h-52 md:-top-6 md:-left-10
                    rounded-full overflow-hidden transition-all duration-300 
                    hover:scale-105 hover:opacity-90"
                >
                  <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Label */}
                <div className="absolute bottom-3 right-3 text-white text-sm md:text-lg font-semibold font-body text-right opacity-90">
                  {cuisine.name}
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default InternationalCuisine;
