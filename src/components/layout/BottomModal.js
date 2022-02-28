import {
  IonGrid,
  IonCol,
  IonRow,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonTitle,
} from "@ionic/react";
import React, { useState } from "react";
import { IntervalPicker } from "../../features/timers/IntervalPicker";
import CenteredGrid from "./CenteredGrid";
import BottomModalSegments from "./BottomModalSegments";

import SelectSpeaker from "../SelectSpeaker";

const BottomModal = ({ onHide }) => {
  const [showContent, setShowContent] = useState("intervalPicker");

  return (
    <IonGrid className="ion-align-items-center">
      <IonHeader className="ion-no-padding ion-no-margin">
        {/* <IonButton expand="block" onClick={onHide}>
          close
        </IonButton> */}
        {/* <IonToolbar color="light" className="ion-no-padding ion-no-margin">
          <IonTitle className="ion-text-center">Total Quotes : 16</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}></IonButton>
            <IonIcon icon={closeOutline} />
          </IonButtons>
        </IonToolbar> */}
        {/* <IonToolbar> */}
        <BottomModalSegments setShowContent={setShowContent} showContent={showContent} />
        {/* <IonButtons slot="end">
            <IonIcon icon={closeOutline} onClick={dismiss} />
          </IonButtons> */}
        {/* </IonToolbar> */}
      </IonHeader>
      <IonRow className="ion-justify-content-center ion-align-items-center">
        <IonCol
          className="ion-align-self-center ion-text-center"
          // style={{ display: showContent === "intervalPicker" ? "block" : "none" }}
        >
          {/* {showContent === "intervalPicker" ? <h2>hey2</h2> : <h1>hey</h1>} */}
          {/* {showContent === "intervalPicker" ? <Stopwatch /> : <h1>hey</h1>} */}
          <IntervalPicker />
        </IonCol>
        <IonCol
          className="ion-align-self-center ion-text-center"
          // style={{ display: showContent === "selectSpeaker" ? "block" : "none" }}
        >
          <SelectSpeaker />
        </IonCol>
      </IonRow>
      {/* <IonRow>
        <IonCol>
          <IonButton expand="block" onClick={onHide}>
            close
          </IonButton>
        </IonCol>
      </IonRow> */}
    </IonGrid>
  );
};

export default BottomModal;
//  <CenteredGrid component1={<selectSpeaker />} component2={<IntervalPicker />} />
