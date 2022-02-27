import React, { useContext } from "react";
import useIntervalTimer from "../../hooks/useIntervalTimer";
import {
  selectStatusTotalTimers,
  selectTotalTime,
  selectIntervalTime,
  selectNumOfIntervals,
  STATUS,
  timersActions,
} from "./timersSlice";
import { useSelector } from "react-redux";

import { IonLabel } from "@ionic/react";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
function showStopWatch(remainingTime, totalDuration) {
  const totalSeconds = Math.floor(remainingTime);
  const stopwatchSeconds = totalDuration - remainingTime + 1;
  let mins = Math.floor((stopwatchSeconds % (60 * 60)) / 60);
  let secs = Math.floor(stopwatchSeconds % 60);
  secs = secs > 9 ? secs : "0" + secs;
  mins = mins > 9 ? mins : "0" + mins;

  return (
    <IonLabel className="Timer" style={{ color: "red" }}>
      -{`${mins}:${secs}`}
    </IonLabel>
  );
}

export const Stopwatch = ({ totalDuration = 120, numOfIntervals = 6 }) => {
  // const dispatch = useDispatch();
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const quotesControls = useContext(QuotesPlayerContext);

  const onEndIntervalTimerComplete = () => {
    if (statusTotalTimer === STATUS.ENDED) {
      quotesControls.endingControls.nextAndPlay();
    }
    console.warn("onIntervalEnded STOPWATCH");
  };

  const { updateStatus, remainingTime, remainingIntervalSeconds, activeInterval } =
    useIntervalTimer({
      updateStatus: STATUS.RUNNING,
      // isPlaying: statusTotalTimer === STATUS.RUNNING,
      totalDuration: totalDuration,
      intervalDuration: totalDuration / numOfIntervals,
      numOfIntervals: numOfIntervals,
      onEnded: () => console.warn("ONENDED STOPWATCH"),
      onIntervalEnded: () => onEndIntervalTimerComplete(),
      // onIntervalEnded: () => console.warn("onIntervalEnded STOPWATCH"),
    });
  console.log("STOP WATCH from USEINTERVAL TIMER", {
    updateStatus,
    remainingTime,
    remainingIntervalSeconds,
    activeInterval,
  });
  return <>{showStopWatch(remainingTime, totalDuration)}</>;
};
