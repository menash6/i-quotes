import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { Controller } from "swiper";

import chroma from "chroma-js";
import "swiper/swiper.min.css";

import SwiperLayout from "./SwiperLayout";
import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";

const SwiperCategories = () => {
  const { setCategoryByName, setControlledSwiper, getCategoryStyleByName } =
    useContext(MusicPlayerContext);

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
      // rewind={true}
      style={{ height: "100%" }}
      modules={[Controller]}
      onSwiper={(swiper) => setControlledSwiper(swiper)}
      onSlideChange={(swiper) => {
        const currSlideIndex = swiper.realIndex;
        if (swiper.previousIndex === 0 && swiper.realIndex === 1) {
          //? realIndex is loaded with WRONG index===1 for the first time
          //? so ignoring it
          return;
        }
        setCategoryByName(slides[currSlideIndex].currCategoryName);
      }}
      // onSwiper={(swiper) => updateNavigationColor({ slides, swiper })}
    >
      {slides.map((slide, index) => {
        const { background } = getCategoryStyleByName(slide.currCategoryName);
        console.log("🚀🚀🚀 background", background);
        return (
          <SwiperSlide
            key={slide._id}
            style={{
              backgroundImage: `linear-gradient(to bottom,
                ${background[0]} 0%,  
                ${background[1]} 50%,
                ${background[2]} 100%)`,
            }}
            // style={{ backgroundImage: `linear-gradient(45deg,${slide.color},transparent)` }}
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
