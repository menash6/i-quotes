import { useSelector } from "react-redux";
import { IonButton, IonIcon } from "@ionic/react";
import { selectStatusTotalTimers, STATUS } from "../../features/timers/timersSlice";
import { chevronBackOutline, chevronForwardOutline } from "ionicons/icons";

import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";

import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";
import { getContrastColor } from "../../theme/utils/gradients";

export default function MusicButton({ prevOrNext }) {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const { next, prev, currentTrackStatus, getCategoryStyle } = useContext(MusicPlayerContext);
  const { background } = getCategoryStyle();

  return (
    <IonButton
      className="ion-no-padding ion-no-margin"
      style={{ "--color": getContrastColor(background[1]) }}
      disabled={statusTotalTimer === STATUS.PAUSED || currentTrackStatus === LOAD_STATUS.LOADING}
      // disabled={true}
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
