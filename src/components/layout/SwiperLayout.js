import React from "react";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
// import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import { useSwiperSlide, useSwiper } from "swiper/react/swiper-react";

import { Timers } from "./../../features/timers/Timers";
import { PlayPauseRepeatButton } from "./../../features/timers/PlayPauseRepeatButton";
import QuoteText from "../../features/quotesPlayer/QuoteText";

import "./centered-grid.css";

const SwiperLayout = ({ color, quotesPlayer, uniqueId }) => {
  console.log("~ color", color);

  const swiperSlide = useSwiperSlide();
  console.log("~💚💚💚 swiperSlide", swiperSlide);
  const swiper = useSwiper();
  console.log("~💚💚💚 swiper", swiper);

  return (
    // <IonContent className="ion-justify-content-center ion-align-items-center">
    <IonGrid className="ion-padding Grid-Fixed-Width" fixed>
      {/* <IonGrid className="ion-padding Grid-Fixed-Width" fixed style={{ backgroundColor: color }}> */}
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol>
          {/* <QuoteText /> */}
          <QuoteText uniqueId={uniqueId} />
        </IonCol>
      </IonRow>
      <Timers>
        <PlayPauseRepeatButton />
      </Timers>
    </IonGrid>
    // </IonContent>
  );
  // return <Layout color={color} />;
};

export default SwiperLayout;
// <IonGrid
//   className="ion-padding Grid-Fixed-Width"
//   fixed
//   style={{
//     backgroundImage: `linear-gradient(45deg, ${color}, transparent)`,
//     // backgroundColor: color,
//     // "--background": `linear-gradient(45deg, ${color})!important`,
//     // backgroundImage: `linear-gradient(45deg, ${color})!important`,
//   }}import QuotesPlayer from './../../features/quotesPlayer/QuotesPlayer';

// >
//   <IonRow className="ion-justify-content-center ion-align-items-center">
//     <IonCol>{quotesPlayer}</IonCol>
//   </IonRow>
//   {timers}
// </IonGrid>
