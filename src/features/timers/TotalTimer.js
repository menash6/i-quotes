import { Stopwatch } from "./Stopwatch";
import {
  IonLabel,
  IonDatetime,
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonText,
  IonCardSubtitle,
  IonGrid,
  IonRow,
} from "@ionic/react";
import {
  selectStatusTotalTimers,
  STATUS,
  timersActions,
  selectIsTotalTimeHours,
  selectTotalTime,
} from "../../features/timers/timersSlice";

import { useSelector, useDispatch } from "react-redux";
import { getISOString, getSeconds, secondsToTime } from "./utils";
import { useContext } from "react";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import ResetTotalTimer from "./ResetTotalTimer";

function ShowTimer(remainingTime) {
  return (
    <IonGrid>
      <IonRow className="ion-justify-content-center">
        <IonLabel className="ion-text-center ion-no-margin ion-no-padding">
          <IonText className="Timer ">{secondsToTime(remainingTime)}</IonText>
        </IonLabel>
      </IonRow>
      <IonRow className="ion-justify-content-center">
        <ResetTotalTimer />
      </IonRow>
    </IonGrid>
  );
}

const TotalTimer = ({ remainingTime }) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const isTotalTimeHours = useSelector(selectIsTotalTimeHours);
  const totalTime = useSelector(selectTotalTime);

  const dispatch = useDispatch();

  return (
    <>
      {statusTotalTimer === STATUS.READY && (
        <IonDatetime
          className="Timer pulse"
          mode="ios"
          display-format={isTotalTimeHours ? "HH:mm:ss" : "mm:ss"}
          pickerFormat="H:mm:ss"
          value={getISOString(totalTime)} // value="00:10:00"
          // onIonChange={(e) => setTimerDuration(getSeconds(e.detail.value))}
          onIonChange={(e) => dispatch(timersActions.setTotalTime(getSeconds(e.detail.value)))}
        ></IonDatetime>
      )}
      {(statusTotalTimer === STATUS.RUNNING || statusTotalTimer === STATUS.PAUSED) &&
        ShowTimer(remainingTime)}

      {statusTotalTimer === STATUS.ENDED && <Stopwatch />}
    </>
  );
};

export default TotalTimer;
