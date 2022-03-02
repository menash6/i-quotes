import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Controller } from "swiper";

import chroma from "chroma-js";
import "swiper/swiper.min.css";

import SwiperLayout from "./SwiperLayout";
import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";

const SwiperCategories = () => {
  const { setCategoryByName, setControlledSwiper } = useContext(MusicPlayerContext);

  const slides = [
    { _id: 0, currCategoryName: "All", color: "white" },
    { _id: 1, currCategoryName: "Morning", color: "#2ea2e6" },
    { _id: 2, currCategoryName: "Focus", color: "#0077b6" },
    { _id: 3, currCategoryName: "Workout", color: "#f0841f" },
    { _id: 4, currCategoryName: "Night", color: "#12006d" },
    { _id: 5, currCategoryName: "Mindfulness", color: "#03664c" },
  ];
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      style={{ height: "100%" }}
      modules={[Controller]}
      onSwiper={(swiper) => {
        console.log("💚💚💚", swiper);

        setControlledSwiper(swiper);
      }}
      onSlideChange={(swiper) => {
        console.log("💜💜💜💜💜", { slides, swiper });
        console.log("~ swiper.realIndex", swiper.realIndex);
        const currSlideIndex = swiper.realIndex;
        setCategoryByName(slides[currSlideIndex].currCategoryName);
      }}
      // onSwiper={(swiper) => updateNavigationColor({ slides, swiper })}
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide
            key={slide._id}
            // virtualIndex={index}
            style={{ backgroundImage: `linear-gradient(45deg,${slide.color},transparent)` }}
          >
            <SwiperLayout
              color={slide.color}
              uniqueId={slide._id}
              categoryName={slide.currCategoryName}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperCategories;
