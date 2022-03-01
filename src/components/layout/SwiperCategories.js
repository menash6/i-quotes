import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
// import "swiper/modules/pagination/pagination.min.css";

// Import Swiper styles
// import "swiper/css";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
// import "swiper/css/virtual";
// import "swiper/css/navigation";

// import SwiperCore from "swiper";
// import SwiperCore, { Navigation } from "swiper";
// import { Pagination } from "swiper";

// install Swiper modules
// SwiperCore.use([ Pagination]);
// SwiperCore.use([Navigation, Pagination]);

import SwiperLayout from "./SwiperLayout";

const SwiperCategories = () => {
  const slides = [
    { _id: 1, currCategoryName: "All", color: "white" },
    { _id: 2, currCategoryName: "Morning", color: "yellow" },
    { _id: 3, currCategoryName: "Focus", color: "blue" },
    { _id: 4, currCategoryName: "Workout", color: "green" },
    { _id: 5, currCategoryName: "Night", color: "purple" },
    { _id: 6, currCategoryName: "Mindfulness", color: "orange" },
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
            style={{
              // color: isDark ? "white" : "black",
              backgroundColor: slide.color,
              height: "100%",
            }}
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
