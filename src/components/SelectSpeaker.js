import { IonLabel, IonListHeader, IonRadioGroup, IonRadio, IonItem, IonIcon } from "@ionic/react";
import React from "react";
import { manOutline, peopleOutline, womanOutline } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { QuotesPlayerContext } from "../providers/quotesPlayer/quotesPlayer.provider";

import { ALL_SPEAKERS } from "../providers/quotesPlayer/quotesPlayer.provider";
import {
  setSpeakerMode,
  selectSpeakerMode,
  quotesPlayerActions,
} from "../features/quotesPlayer/quotesPlayerSlice";

// const totalSpeakers = 3;
// const TOTAL_SPEAKER_SELECETED = -1;

// const radomNextSpeaker = (currentSpeaker) => {
//   // console.log("🚀 ~ radomNextSpeaker ~ currentSpeaker", currentSpeaker);

//   const moveForwardsCount = Math.floor(Math.random() * (totalSpeakers - 1)) + 1;

//   // console.log("🚀 ~ radomNextSpeaker ~ moveForwardsCount", moveForwardsCount);
//   // console.log(
//   //   "🚀 ~ radomNextSpeaker ~ (currentSpeaker + moveForwardsCount) % totalSpeakers)",
//   //   (currentSpeaker + moveForwardsCount) % totalSpeakers
//   // );
//   return (currentSpeaker + moveForwardsCount) % totalSpeakers;
// };

// const randomMoveForwardCount = (totalSpeakers) =>
//   Math.floor(Math.random() * (totalSpeakers - 1)) + 1;

const SelectSpeaker = () => {
  const dispatch = useDispatch();

  // const { changeSpeakerMode, speakerMode, setSpeakerMode } = useContext(QuotesPlayerContext);
  const { changeSpeakerMode } = useContext(QuotesPlayerContext);

  const currentSpeaker = useSelector(selectSpeakerMode);
  const [speakerMode, setSpeakerMode] = useState(currentSpeaker); //! last change - sent to the store

  // const currentSpeaker = useSelector(selectSpeaker);
  // const isAllSpeakers = useSelector(selectIsAllSpeakers);
  console.log("🚀 ~ SelectSpeaker ~ speakerMode", speakerMode);
  console.log("🚀 ~ SelectSpeaker ~ typeof speakerMode", typeof speakerMode);

  return (
    <>
      <IonRadioGroup
        value={speakerMode}
        // value={speakerSelection}
        onIonChange={(e) => {
          console.log("🚀 ~ SelectSpeaker ~ e.detail", e.detail.value);
          console.log("🚀 ~ SelectSpeaker ~typeof e.detail", typeof e.detail.value);
          setSpeakerMode(parseInt(e.detail.value));
          changeSpeakerMode(parseInt(e.detail.value));
          // setSpeaker(parseInt(e.detail.value));
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

      {/* <IonRadioGroup
        value={isAllSpeakers ? TOTAL_SPEAKER_SELECETED : currentSpeaker}
        onIonChange={(e) => {
          if (parseInt(e.detail.value) === TOTAL_SPEAKER_SELECETED) {
            //choose random speaker 0,1,2 - different than the current speaker
            dispatch(setIsIsAllSpeakers(true));
            const nextRandomSpeaker = radomNextSpeaker(currentSpeaker);
            console.log("🚀 ~ SelectSpeaker ~ nextRandomSpeaker", nextRandomSpeaker);
            dispatch(setSpeaker(nextRandomSpeaker));
          } else {
            console.log("🤔🤔🤔🤔ELSE  e.detail.value !== TOTAL_SPEAKER_SELECETED");
            console.log("🚀 ELSEEEEE ~ SelectSpeaker ~ e.detail.value", e.detail.value);
            console.log(
              "🚀 ELSEEEEE ~ SelectSpeaker ~TYPEOF e.detail.value",
              typeof e.detail.value
            );

            dispatch(setIsIsAllSpeakers(false));
            dispatch(setSpeaker(e.detail.value));
          }
        }}
      >
        <IonItem>
          <IonLabel>Mix</IonLabel>
          <IonRadio slot="start" value={TOTAL_SPEAKER_SELECETED} />
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
      </IonRadioGroup> */}
    </>
  );
};

export default React.memo(SelectSpeaker);
