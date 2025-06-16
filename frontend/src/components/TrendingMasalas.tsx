import React, { useEffect, useRef, useState } from 'react';
import {
  FiHeart,
  FiPlus,
  FiMinus,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';

interface Product {
  id: number;
  name: string;
  image: string;
  bgColor: string;
}

const products: Product[] = [
  { id: 1, name: 'Turmeric Powder', image: '/trending masalas/turmeric.png', bgColor: 'bg-[#FFD343]' },
  { id: 2, name: 'Red Powder', image: '/trending masalas/chilli.png', bgColor: 'bg-[#C94C45]' },
  { id: 3, name: 'Dhaniya Powder', image: '/trending masalas/dhaniya.png', bgColor: 'bg-[#A89A5D]' },
  { id: 4, name: 'Dummy Masala', image: '/trending masalas/turmeric.png', bgColor: 'bg-[#eab308]' },
  { id: 5, name: 'Dummy Masala', image: '/trending masalas/chilli.png', bgColor: 'bg-[#f87171]' },
  { id: 6, name: 'Dummy Masala', image: '/trending masalas/dhaniya.png', bgColor: 'bg-[#60a5fa]' },
];

const TrendingMasalas: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [showQuantitySelector, setShowQuantitySelector] = useState<{ [key: number]: boolean }>({});
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const initialQty: { [key: number]: number } = {};
    const initialSelector: { [key: number]: boolean } = {};
    products.forEach((product) => {
      initialQty[product.id] = 1;
      initialSelector[product.id] = false;
    });
    setQuantities(initialQty);
    setShowQuantitySelector(initialSelector);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product: Product) => {
    const qty = quantities[product.id] || 1;
    addToCart({
      id: product.id, name: product.name, quantity: qty,
      price: 0
    });
    toast.success(`${product.name} (x${qty}) added to cart!`);
  };

  const handleIncrement = (id: number, product: Product) => {
    setQuantities((q) => ({ ...q, [id]: (q[id] || 1) + 1 }));
    handleAddToCart(product);
  };

  const handleDecrement = (id: number) => {
    setQuantities((q) => {
      const newQty = (q[id] || 1) - 1;
      if (newQty <= 0) {
        setShowQuantitySelector((s) => ({ ...s, [id]: false }));
        return { ...q, [id]: 1 };
      }
      return { ...q, [id]: newQty };
    });
  };

  const handleSlideChange = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    }
  };

  return (
    <section id="trending" className="px-4 md:px-8 text-center relative font-heading">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-10 text-white">
        Trending <span className="text-yellow-400">Masalas</span>
      </h2>

      {/* Navigation Buttons - Desktop Only */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        disabled={isBeginning}
        className={`hidden md:flex absolute left-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
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
        className={`hidden md:flex absolute right-1 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full transition ${
          isEnd
            ? 'bg-white/10 text-gray-400 cursor-not-allowed'
            : 'bg-white/20 text-white hover:bg-yellow-400 hover:text-black'
        }`}
      >
        <FiChevronRight className="text-2xl" />
      </button>

      <div className="relative max-w-6xl mx-auto overflow-visible">
        <Swiper
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={10}
          slidesPerGroup={1}
          grabCursor={false}
          loop={false}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Navigation, Pagination]}
          className="pb-10"
          breakpoints={{
            0: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="relative w-full overflow-visible transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Mobile Version */}
<div className="block md:hidden w-full max-w-[92vw] mx-auto">
  <div className="relative w-full aspect-[3/4]">
    {product.image && (
      <div className="relative w-full h-full rounded-t-3xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80% object-cover drop-shadow-xl pointer-events-none"
        />

        {/* Product Name and Weight */}
        <div className="absolute bottom-0 w-full px-[2vw] flex justify-between items-end pb-[12vw]">
          <h3 className="text-white text-[2.5vw] font-semibold font-body truncate">
            {product.name}
          </h3>
          <span className="mb-[2vw] text-white text-[2vw] font-medium font-body">50 g</span>
        </div>

        {/* Wishlist Icon */}
        <div
          className="absolute top-[1vw] right-[2vw] z-50 cursor-pointer"
          onClick={() => toggleWishlist(product.id)}
        >
          <FiHeart
            className={`text-[3vw] transition ${
              wishlist[product.id]
                ? 'text-red-500 fill-red-500'
                : 'text-white'
            }`}
          />
        </div>
      </div>
    )}
  </div>

  {/* Bottom Section */}
  <div className="-mt-[12vw] bg-white/10 backdrop-blur-md border-l border-r border-b border-[#6B0073]/60 rounded-b-3xl px-[3vw] py-[4vw] text-white">
    <div className="flex items-center justify-between">
      {/* Pricing */}
      <div className="flex flex-col gap-[1vw]">
        <div className="text-[3vw] font-semibold font-body">
          <span className="text-white">₹</span>
          <span className="line-through text-gray-300 ml-1">80</span>{' '}
          <span className="text-white ml-1">49/-</span>
        </div>
        <div className="text-[2.5vw] bg-lime-400 text-black font-semibold px-[1.5vw] py-[0.5vw] rounded-full w-fit font-button">
          20% off
        </div>
      </div>

      {/* Add / Quantity Controls */}
      {!showQuantitySelector[product.id] ? (
        <button
          onClick={() =>
            setShowQuantitySelector((s) => ({
              ...s,
              [product.id]: true,
            }))
          }
          className="w-[7vw] h-[7vw] bg-black text-white rounded-full flex items-center justify-center text-[4vw]"
        >
          <FiPlus />
        </button>
      ) : (
        <div className="flex items-center gap-[2vw] bg-yellow-400 rounded-full px-[3vw] py-[1vw] text-black text-[3vw] font-button">
          <button onClick={() => handleDecrement(product.id)}>
            <FiMinus />
          </button>
          <span>{quantities[product.id]}</span>
          <button onClick={() => handleIncrement(product.id, product)}>
            <FiPlus />
          </button>
        </div>
      )}
    </div>
  </div>
</div>


              {/* Desktop Version */}
              <div className="hidden md:block">
                <div className="absolute -top-0 inset-x-0 z-40 px-2 pointer-events-drag cursor-pointer">
                  {product.image && (
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-fill drop-shadow-xl pointer-events-none cursor-pointer"
                      />
                      <div
                        className="absolute top-1 right-2 z-50 cursor-pointer"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <FiHeart
                          className={`text-xl transition ${
                            wishlist[product.id]
                              ? 'text-red-500 fill-red-500'
                              : 'text-white'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-[200px] px-2 pt-0">
                  <div className="bg-transparent backdrop-blur-xl border-l border-r border-b border-[#6B0073]/60 rounded-b-3xl p-4 pb-5 text-white relative">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold leading-tight font-body">
                          {product.name.split(' ').map((word, idx) => (
                            <span key={idx}>
                              {word}
                              {idx === 0 && <br />}
                            </span>
                          ))}
                        </h3>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        {!showQuantitySelector[product.id] ? (
                          <button
                            onClick={() =>
                              setShowQuantitySelector((s) => ({
                                ...s,
                                [product.id]: true,
                              }))
                            }
                            className="bg-yellow-400 text-black px-3 py-1 text-xs rounded-full font-semibold hover:brightness-110 transition font-button"
                          >
                            Add
                          </button>
                        ) : (
                          <div className="flex items-center space-x-2 bg-yellow-400 rounded-full px-2 py-1 text-black text-sm font-button">
                            <button onClick={() => handleDecrement(product.id)}>
                              <FiMinus />
                            </button>
                            <span>{quantities[product.id]}</span>
                            <button onClick={() => handleIncrement(product.id, product)}>
                              <FiPlus />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingMasalas;
