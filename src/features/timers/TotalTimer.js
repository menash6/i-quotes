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

function showTimer(remainingTime) {
  const totalSeconds = Math.ceil(remainingTime);
  let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  let mins = Math.floor((totalSeconds % (60 * 60)) / 60);
  let secs = Math.floor(totalSeconds % 60);

  secs = secs > 9 ? secs : "0" + secs;
  mins = mins > 9 ? mins : "0" + mins;

  if (hours <= 0) {
    //no hours - show only mins and secs
    return <IonLabel className="Timer">{`${mins}:${secs}`}</IonLabel>;
  } else {
    hours = hours > 9 ? hours : "0" + hours;
    return <IonLabel className="Timer">{`${hours}:${mins}:${secs}`}</IonLabel>;
  }
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

  return (
    <>
      {statusTotalTimer === STATUS.READY && (
        <IonDatetime
          className=" Timer animated-square"
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

function showTimer2(remainingTime) {
  let hours = Math.floor(remainingTime / 3600);
  let mins = Math.floor(remainingTime / 60) - hours * 60;
  // let mins = Math.floor(remainingTime / 60);
  let secs = Math.ceil(remainingTime % 60);
  // mins = mins > 9 ? mins : mins === 0 ? "0" : "0" + mins;
  secs = secs > 9 ? secs : "0" + secs;
  mins = mins > 9 ? mins : "0" + mins;
  if (hours <= 0) hours = "";
  else {
    hours = hours > 9 ? hours : "0" + hours;
    hours = hours + ":";
  }

  return <IonLabel className="Timer">{`${hours}${mins}:${secs}`}</IonLabel>;
}
function showTimerNEW(secs, mins) {
  // let mins = Math.floor(remainingTime / 60);
  // let secs = remainingTime % 60;
  // mins = mins > 9 ? mins : mins === 0 ? "0" : "0" + mins;
  secs = secs > 9 ? secs : "0" + secs;
  return <IonLabel className="Timer">{`${mins}:${secs}`}</IonLabel>;
}
