import {
  IonCardHeader,
  IonIcon,
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";

import { useContext } from "react";
import { MusicPlayerContext } from "./../providers/musicPlayer/musicPlayer.provider";
import { chevronBack, chevronForward, pause, play, reload, stop } from "ionicons/icons";
import { LOAD_STATUS } from "../hooks/usePlaylistUtils";

const MusicDevtools = () => {
  const musicControls = useContext(MusicPlayerContext);
  return (
    <>
      <IonCardHeader>Music Playlist</IonCardHeader>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonToolbar color="light">
              <IonButtons slot="start">
                <IonButton
                  onClick={musicControls.prev}
                  disabled={musicControls.currLoadStatus === LOAD_STATUS.LOADING}
                >
                  <IonIcon size="large" icon={chevronBack} />
                </IonButton>
                <IonIcon size="large" icon={pause} onClick={musicControls.pause} />
                <IonIcon size="large" icon={play} onClick={musicControls.play} />
                <IonIcon
                  size="large"
                  icon={chevronForward}
                  onClick={musicControls.next}
                  disabled={musicControls.currLoadStatus === LOAD_STATUS.LOADING}
                />
              </IonButtons>
              <IonButtons slot="end">
                <IonIcon size="large" icon={reload} onClick={musicControls.restart} />
              </IonButtons>
            </IonToolbar>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <b>
              {musicControls.getCurrentIndex()} : {musicControls.getCurrentTitle()}
            </b>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {musicControls.currLoadStatus}
            <br></br>
            isPlaying: {musicControls.isPlaying}
            <br></br>
            isPaused: {musicControls.isPaused}
            <br></br>
            isEnded: {musicControls.isEnded}
            <br></br>
            isStopped: {musicControls.isStopped}
          </IonCol>
        </IonRow>
      </IonGrid>
      {/* <PlaylistPlayer playlistControls={MusicControls} color={"medium"} /> */}
    </>
  );
};

export default MusicDevtools;
