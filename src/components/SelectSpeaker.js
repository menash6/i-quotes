import { IonLabel, IonListHeader, IonRadioGroup, IonRadio, IonItem, IonIcon } from "@ionic/react";
import React from "react";
import { manOutline, peopleOutline, womanOutline } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { QuotesPlayerContext } from "../providers/quotesPlayer/quotesPlayer.provider";

import { ALL_SPEAKERS } from "../providers/quotesPlayer/quotesPlayer.provider";
import { selectSpeakerMode, quotesPlayerActions } from "../features/quotesPlayer/quotesPlayerSlice";

const SelectSpeaker = () => {
  const dispatch = useDispatch();

  const { changeSpeakerMode } = useContext(QuotesPlayerContext);

  const currentSpeaker = useSelector(selectSpeakerMode);
  const [speakerMode, setSpeakerMode] = useState(currentSpeaker); //! last change - sent to the store

  return (
    <>
      <IonRadioGroup
        value={speakerMode}
        onIonChange={(e) => {
          setSpeakerMode(parseInt(e.detail.value));
          changeSpeakerMode(parseInt(e.detail.value));
          dispatch(quotesPlayerActions.setSpeakerMode(parseInt(e.detail.value)));
        }}
      >
        <IonListHeader>
          <IonLabel> Mode:{speakerMode}</IonLabel>
          <IonLabel>Who do you want to hear??</IonLabel>
        </IonListHeader>
        <IonItem>
          <IonLabel>All (Mix)</IonLabel>
          <IonRadio slot="start" value={ALL_SPEAKERS} />
          <IonIcon icon={peopleOutline} />
        </IonItem>

        <IonItem>
          <IonLabel>Marcus</IonLabel>
          <IonRadio slot="start" value={0} />
          <IonIcon icon={manOutline} />
        </IonItem>

        <IonItem>
          <IonLabel>Stacey</IonLabel>
          <IonRadio slot="start" value={1} />
          <IonIcon icon={womanOutline} />
        </IonItem>

        <IonItem>
          <IonLabel>Lila</IonLabel>
          <IonRadio slot="start" value={2} />
          <IonIcon src="assets\baby-svgrepo-com.svg" />
        </IonItem>
      </IonRadioGroup>
    </>
  );
};

export default React.memo(SelectSpeaker);
