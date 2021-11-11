import { IonLabel, IonListHeader, IonRadioGroup, IonRadio, IonItem, IonIcon } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";

import { selectMusicFilter, musicPlayerActions } from "./../features/musicPlayer/musicPlayerSlice";

import { sunnyOutline, moonOutline, barbellOutline, locateOutline } from "ionicons/icons";
import { selectStatusTotalTimers, STATUS } from "../features/timers/timersSlice";
import { useContext } from "react";
import { QuotesPlayerContext } from "../providers/quotesPlayer/quotesPlayer.provider";
import { timersActions } from "./../features/timers/timersSlice";

export const SelectMusicFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectMusicFilter);
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const quotesControls = useContext(QuotesPlayerContext);

  return (
    <>
      <IonRadioGroup
        value={currentFilter}
        onIonChange={(e) => {
          if (statusTotalTimer === STATUS.ENDED) {
            //todo if ENDED stop quotes?? and restart timer and other playlists...
            dispatch(timersActions.restartTotalTimer());

            quotesControls.endingControls.restart();
            quotesControls.endingControls.shuffle();
          }
          dispatch(musicPlayerActions.setFilter(e.detail.value));
          console.log("🚀 ~ SelectMusicFilter ~ e.detail.value", e.detail.value);
          console.log("🚀 ~ SelectMusicFilter ~  typeof e.detail.value", typeof e.detail.value);
        }}
      >
        <IonListHeader>
          <IonLabel>
            <IonLabel>Choose Your Vibe</IonLabel>
          </IonLabel>
          {/* <IonLabel>Choose Your Program</IonLabel> */}
        </IonListHeader>

        <IonItem>
          <IonLabel>All</IonLabel>
          <IonRadio slot="start" value={-1} />
        </IonItem>

        <IonItem>
          <IonLabel>Morning</IonLabel>
          <IonRadio slot="start" value={0} />
          <IonIcon icon={sunnyOutline} />
        </IonItem>

        <IonItem>
          <IonLabel>Focus</IonLabel>
          <IonRadio slot="start" value={1} />
          <IonIcon icon={locateOutline} />
          {/* <IonIcon icon={scanCircleOutline} /> */}
        </IonItem>

        <IonItem>
          <IonLabel>Workout</IonLabel>
          <IonRadio slot="start" value={2} />
          <IonIcon icon={barbellOutline} />
        </IonItem>
        <IonItem>
          <IonLabel>Night</IonLabel>
          <IonRadio slot="start" value={3} />
          <IonIcon icon={moonOutline} />
        </IonItem>
        <IonItem>
          <IonLabel>Mindfullness</IonLabel>
          <IonRadio slot="start" value={4} />
          <IonIcon src="assets\meditation-svgrepo-com.svg" />
        </IonItem>
      </IonRadioGroup>
    </>
  );
};
