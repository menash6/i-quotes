import { IonButton, IonButtons, IonMenuButton, IonToolbar } from "@ionic/react";
import { useContext } from "react";

import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { getCategoryIcon } from "../SelectMusicFilter";

export const ToolBar = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  const { currCategoryName } = useContext(MusicPlayerContext);

  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonButtons slot="end">
        <IonButton onClick={showMusicFilter}>{getCategoryIcon(currCategoryName)}</IonButton>
      </IonButtons>
    </IonToolbar>
  );
};
