import React from "react";

// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

import "swiper/swiper.min.css";
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

import SwiperLayout from "./SwiperLayout";

// install Swiper modules
// SwiperCore.use([ Pagination]);
// SwiperCore.use([Navigation, Pagination]);

const SwiperCategories = ({ timers, quotesPlayer }) => {
  const slides = [
    { _id: 1, color: "yellow" },
    { _id: 2, color: "green" },
    { _id: 3, color: "red" },
  ];
  // const slides = mergedQuotes(quotes, user?.quotes);
  return (
    <Swiper
      // modules={[Navigation]}
      slidesPerView={1}
      // loop={true}
      // navigation
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

            // style={{
            //   color: isDark ? "white" : "black",
            //   backgroundImage: `linear-gradient(45deg, var(--ion-color-step-${
            //     isDark ? "950" : "150"
            //   }), ${isDark ? "var(--ion-color-step-650)" : "transparent"})`,
            // }}
          >
            <SwiperLayout color={slide.color} />
            {/* <SwiperLayout color={slide.color} timers={timers} quotesPlayer={quotesPlayer} /> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SwiperCategories;
