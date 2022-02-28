import React, { useRef, useState, useContext } from "react";
import { LOAD_STATUS } from "./../hooks/usePlaylistUtils";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonMenuButton,
  IonToolbar,
  IonButtons,
  IonToggle,
  IonBadge,
  IonChip,
  IonAvatar,
  IonButton,
  IonContent,
} from "@ionic/react";

import {
  reloadCircle,
  arrowBack,
  pauseOutline,
  play,
  arrowForward,
  arrowDown,
  arrowUpOutline,
  pin,
  backspace,
  chevronBackOutline,
  playOutline,
  reloadOutline,
  chevronForwardOutline,
  volumeHigh,
  volumeLow,
  volumeLowOutline,
  volumeHighOutline,
  shuffleOutline,
} from "ionicons/icons";

const parseTitle = (title) => {
  if (!title.includes("[") && !title.includes("(")) return title;
  const indexMax = Math.max(title.lastIndexOf(")"), title.lastIndexOf("]"));
  return title.substring(indexMax + 1, title.length);
};

const PlaylistPlayer = ({ playlistControls, color }) => {
  // const playlistControls = useContext(playlistContext);

  const title = parseTitle(playlistControls.getCurrentTitle());

  return (
    <>
      <IonToolbar color={color}>
        <IonChip>
          <IonLabel>{playlistControls.currLoadStatus}</IonLabel>
        </IonChip>
        <IonChip color="light" outline disabled={playlistControls.isPlaying === undefined}>
          <IonLabel>Playing</IonLabel>
          <IonBadge>
            <IonLabel>
              {playlistControls.isPlaying === true
                ? "✅"
                : playlistControls.isPlaying === false
                ? "❌"
                : "❓"}
            </IonLabel>
          </IonBadge>
        </IonChip>
        <IonChip color="light" outline disabled={playlistControls.isPaused === undefined}>
          <IonLabel>Paused</IonLabel>
          <IonBadge>
            <IonLabel>
              {playlistControls.isPaused === true
                ? "✅"
                : playlistControls.isPaused === false
                ? "❌"
                : "❓"}
            </IonLabel>
          </IonBadge>
        </IonChip>
        <IonChip color="light" outline disabled={playlistControls.isStopped === undefined}>
          <IonLabel>Stopped</IonLabel>
          <IonBadge>
            <IonLabel>
              {playlistControls.isStopped === true
                ? "✅"
                : playlistControls.isStopped === false
                ? "❌"
                : "❓"}
            </IonLabel>
          </IonBadge>
        </IonChip>
        <IonChip color="light" outline disabled={playlistControls.isStopped === undefined}>
          <IonLabel>Ended</IonLabel>
          <IonBadge>
            <IonLabel>
              {playlistControls.isEnded === true
                ? "✅"
                : playlistControls.isEnded === false
                ? "❌"
                : "❓"}
            </IonLabel>
          </IonBadge>
        </IonChip>
      </IonToolbar>

      {/* </IonCardHeader> */}
      {/* <IonCardContent> */}
      <IonToolbar>
        <IonButtons color={color} slot="start">
          <IonButton onClick={() => playlistControls.shuffle()}>
            <IonIcon slot="icon-only" icon={shuffleOutline} color={color} />
          </IonButton>
          <IonButton onClick={playlistControls.restart}>
            <IonIcon slot="icon-only" icon={reloadOutline} color={color} />
          </IonButton>
          <IonButton
            onClick={playlistControls.prev}
            disabled={playlistControls.currLoadStatus === LOAD_STATUS.LOADING}
          >
            <IonIcon slot="icon-only" icon={chevronBackOutline} color={color} />
          </IonButton>
          <IonButton onClick={playlistControls.pause}>
            <IonIcon slot="icon-only" icon={pauseOutline} color={color} />
          </IonButton>
          <IonButton onClick={playlistControls.play}>
            <IonIcon slot="icon-only" icon={playOutline} color={color} />
          </IonButton>
          <IonButton
            onClick={playlistControls.next}
            disabled={playlistControls.currLoadStatus === LOAD_STATUS.LOADING}
          >
            <IonIcon slot="icon-only" icon={chevronForwardOutline} color={color} />
          </IonButton>
        </IonButtons>

        <IonButtons slot="end" color={color}>
          <IonButton onClick={playlistControls.volDown}>
            <IonIcon slot="icon-only" icon={volumeLowOutline} color={color} />
          </IonButton>
          <IonText>{Math.floor(playlistControls.volume * 100)}</IonText>
          <IonButton onClick={playlistControls.volUp}>
            <IonIcon slot="icon-only" icon={volumeHighOutline} color={color} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
      <IonToolbar>
        <IonCardSubtitle>
          ({playlistControls.getCurrentIndex()}) <IonText>"{title}"</IonText> [
          {playlistControls.getCurrentDuration()} sec]
        </IonCardSubtitle>
      </IonToolbar>
    </>
  );
};

export default PlaylistPlayer;
