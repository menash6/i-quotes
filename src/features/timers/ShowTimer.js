import { IonLabel, IonText, IonGrid, IonRow } from "@ionic/react";
import { secondsToTime } from "./utils";
import ResetTotalTimer from "./ResetTotalTimer";
import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";
import { isLight } from "../../theme/utils/gradients";
import chroma from "chroma-js";

const ShowTimer = ({ remainingTime }) => {
  const { getCategoryStyle } = useContext(MusicPlayerContext);

  const { background, circles } = getCategoryStyle();

  const createStyle = () => {
    switch (isLight(background[2])) {
      case false:
        return { color: chroma(circles[1]).brighten(2) };

      default:
        return { color: chroma(circles[0]).darken(2) };
    }
  };

  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonLabel className="ion-text-center ion-no-margin ion-no-padding">
          <IonText style={createStyle()} className="Timer">
            {secondsToTime(remainingTime)}
          </IonText>
        </IonLabel>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <ResetTotalTimer />
      </IonRow>
    </IonGrid>
  );
};

export default ShowTimer;
