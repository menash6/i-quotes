import { useSelector } from "react-redux";
import { IonButton, IonIcon } from "@ionic/react";
import { selectStatusTotalTimers, STATUS } from "../../features/timers/timersSlice";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";

import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";

export default function MusicButton({ prevOrNext }) {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const { next, prev, currentTrackStatus } = useContext(MusicPlayerContext);

  return (
    <IonButton
      color="dark"
      disabled={statusTotalTimer === STATUS.PAUSED || currentTrackStatus === LOAD_STATUS.LOADING}
      fill="clear"
      size="large"
      onClick={() => {
        prevOrNext === "next" ? next() : prev();
      }}
    >
      <IonIcon icon={prevOrNext === "next" ? chevronForwardOutline : chevronBackOutline} />
    </IonButton>
  );
}
