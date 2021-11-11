import React from "react";
import { filterCategories } from "./quotesPlayerAPI";
import { useSelector, useDispatch } from "react-redux";
import {
  IonRadio,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonIcon,
} from "@ionic/react";

import {
  sunnyOutline,
  moonOutline,
  barbellOutline,
  scanCircleOutline,
} from "ionicons/icons";

import { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonDatetime,
  IonFooter,
} from "@ionic/react";

import { setFilter } from "./quotesPlayerSlice";

import "./Filters.css";

export default function Filters({ currentFilter }) {
  const dispatch = useDispatch();

  return (
    <>
      <IonSegment
        color="danger"
        value={currentFilter}
        onIonChange={(e) => {
          dispatch(setFilter(e.detail.value));
        }}
      >
        <IonSegmentButton value={1}>
          <IonIcon icon={sunnyOutline} />
          <IonLabel className="Label-Smaller">{filterCategories[1]}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={2}>
          <IonIcon icon={scanCircleOutline} />
          <IonLabel className="Label-Smaller">{filterCategories[2]}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={3}>
          <IonIcon icon={barbellOutline} />
          <IonLabel className="Label-Smaller">{filterCategories[3]}</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value={4}>
          <IonIcon icon={moonOutline} />
          <IonLabel className="Label-Smaller">{filterCategories[4]}</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </>
  );
}
