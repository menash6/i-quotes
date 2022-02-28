import React from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";

import { Timers } from "./../../features/timers/Timers";
import { PlayPauseRepeatButton } from "./../../features/timers/PlayPauseRepeatButton";

const SwiperLayout = ({ color }) => {
  console.log("~ color", color);
  return (
    <IonGrid className="ion-padding Grid-Fixed-Width" fixed style={{ backgroundColor: color }}>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol>
          <QuotesPlayer />
        </IonCol>
      </IonRow>
      <Timers>
        <PlayPauseRepeatButton />
      </Timers>
    </IonGrid>
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
