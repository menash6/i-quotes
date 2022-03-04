import React from "react";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
// import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useSwiperSlide, useSwiper } from "swiper/react/swiper-react";

import { Timers } from "./../../features/timers/Timers";
import { PlayPauseRepeatButton } from "./../../features/timers/PlayPauseRepeatButton";
import QuoteText from "../../features/quotesPlayer/QuoteText";

import "./centered-grid.css";

const SwiperLayout = ({ color, quotesPlayer, uniqueId, categoryName }) => {
  // console.log("~ color", color);

  // const swiperSlide = useSwiperSlide();
  // console.log("~💚💚💚 swiperSlide", swiperSlide);
  // const swiper = useSwiper();
  // console.log("~💚💚💚 swiper", swiper);

  return (
    <IonGrid className="ion-padding Grid-Fixed-Width" fixed>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <QuoteText uniqueId={uniqueId} />
        </IonCol>
      </IonRow>
      <Timers categoryName={categoryName}>
        <PlayPauseRepeatButton />
      </Timers>
    </IonGrid>
  );
};

export default SwiperLayout;
