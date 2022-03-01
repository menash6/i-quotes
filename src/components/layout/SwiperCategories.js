import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import chroma from "chroma-js";
import "swiper/swiper.min.css";

import SwiperLayout from "./SwiperLayout";

const SwiperCategories = () => {
  const slides = [
    { _id: 1, currCategoryName: "All", color: "white" },
    { _id: 2, currCategoryName: "Morning", color: "#2ea2e6" },
    { _id: 3, currCategoryName: "Focus", color: "#0077b6" },
    { _id: 4, currCategoryName: "Workout", color: "#f0841f" },
    { _id: 5, currCategoryName: "Night", color: "#12006d" },
    { _id: 6, currCategoryName: "Mindfulness", color: "#03664c" },
  ];
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      style={{ height: "100%" }}
      // onSwiper={(swiper) => console.log("💚💚💚", swiper)}
      // onSlideChange={(swiper) => {
      //   updateNavigationColor({ slides, swiper });
      // }}
      // onSwiper={(swiper) => updateNavigationColor({ slides, swiper })}
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide
            key={slide._id}
            // virtualIndex={index}
            style={{ backgroundImage: `linear-gradient(45deg,${slide.color},transparent)` }}
            // style={{ backgroundImage: `linear-gradient(45deg,${slide.color},transparent)` }}
            // style={{ backgroundColor: slide.color }}
          >
            <SwiperLayout
              color={slide.color}
              uniqueId={slide._id}
              categoryName={slide.currCategoryName}
            />
            {/* <SwiperLayout color={slide.color} timers={timers} quotesPlayer={quotesPlayer} /> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperCategories;
