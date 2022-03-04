import { Stopwatch } from "./Stopwatch";
import { IonLabel, IonDatetime } from "@ionic/react";
import {
  selectStatusTotalTimers,
  STATUS,
  timersActions,
  selectIsTotalTimeHours,
  selectTotalTime,
} from "../../features/timers/timersSlice";

import { useSelector, useDispatch } from "react-redux";
import { secondsToTime } from "./utils";

function showTimer(remainingTime) {
  return <IonLabel className="Timer">{secondsToTime(remainingTime)}</IonLabel>;
}

function getSeconds(duration) {
  //pickerFormat="HH:mm:ss" to seconds
  const durationHours = parseInt(duration.substring(0, 2)); //get HH
  const durationMins = parseInt(duration.substring(3, 5)); //get mm
  const durationSeconds = parseInt(duration.substring(6, 8)); //get ss
  return durationHours * 3600 + durationMins * 60 + durationSeconds;
}

function getISOString(seconds) {
  //pickerFormat="HH:mm:ss" to seconds
  // console.log("getISOString", { seconds });
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}

const TotalTimer = ({ remainingTime }) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const isTotalTimeHours = useSelector(selectIsTotalTimeHours);
  const totalTime = useSelector(selectTotalTime);
  const dispatch = useDispatch();

  console.log("secondsToTime(remainingTime)", typeof secondsToTime(remainingTime));
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
        showTimer(remainingTime)}

      {statusTotalTimer === STATUS.ENDED && <Stopwatch />}
    </>
  );
};

export default TotalTimer;

// showTimer(remainingTime)}

// <IonDatetime
//   className="Timer pulse"
//   mode="ios"
//   display-format={isTotalTimeHours ? "HH:mm:ss" : "mm:ss"}
//   pickerFormat="H:mm:ss"
//   value={secondsToTime(remainingTime)} // value="00:10:00"
//   // onIonChange={(e) => setTimerDuration(getSeconds(e.detail.value))}
//   onIonChange={(e) => dispatch(timersActions.setTotalTime(getSeconds(e.detail.value)))}
// ></IonDatetime>       )}
