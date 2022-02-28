import {
  IonLabel,
  IonListHeader,
  IonIcon,
  IonRow,
  IonGrid,
  IonSegment,
  IonSegmentButton,
  IonCol,
  IonText,
} from "@ionic/react";

import { manOutline, peopleOutline, womanOutline } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import {
  selectSpeakerMode,
  quotesPlayerActions,
} from "./../../features/quotesPlayer/quotesPlayerSlice";
import { ALL_SPEAKERS } from "./../../providers/quotesPlayer/quotesPlayer.provider";
import { IntervalPicker } from "../../features/timers/IntervalPicker";

const BottomModalSelect = () => {
  const dispatch = useDispatch();

  const { changeSpeakerMode } = useContext(QuotesPlayerContext);

  const currentSpeaker = useSelector(selectSpeakerMode);
  const [speakerMode, setSpeakerMode] = useState(currentSpeaker); //! last change - sent to the store

  return (
    <IonGrid>
      <IonRow className="ion-no-margin ion-no-padding">
        <IonCol>
          <IntervalPicker />
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol className="ion-text-center">
          <IonText className="ion-text-center">Who do you want to hear??</IonText>
          <IonSegment
            value={speakerMode}
            onIonChange={(e) => {
              setSpeakerMode(parseInt(e.detail.value));
              changeSpeakerMode(parseInt(e.detail.value));
              dispatch(quotesPlayerActions.setSpeakerMode(parseInt(e.detail.value)));
            }}
          >
            <IonSegmentButton value={ALL_SPEAKERS}>
              <IonLabel>All (Mix)</IonLabel>
              <IonIcon icon={peopleOutline} />
            </IonSegmentButton>
            <IonSegmentButton value={0}>
              <IonLabel>Marcus</IonLabel>
              <IonIcon icon={manOutline} />
            </IonSegmentButton>
            <IonSegmentButton value={1}>
              <IonLabel>Stacey</IonLabel>
              <IonIcon icon={womanOutline} />
            </IonSegmentButton>
            <IonSegmentButton value={2}>
              <IonLabel>Lila</IonLabel>
              <IonIcon src="assets\baby-svgrepo-com.svg" />
            </IonSegmentButton>
          </IonSegment>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default BottomModalSelect;
