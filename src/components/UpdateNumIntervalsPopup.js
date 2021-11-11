import React from "react";
import {
  IonButton,
  IonContent,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  useIonPopover,
} from "@ionic/react";
import { IntervalPicker } from "../features/timers/IntervalPicker";
export const UpdateNumIntervalsPopup = ({ onHide }) => (
  <IonList>
    {/* <IonListHeader>Assaf - you're amazing!</IonListHeader> */}

    <IntervalPicker />
  </IonList>
);
