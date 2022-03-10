import { useContext } from "react";

import { IonLabel } from "@ionic/react";
import { TimersContext } from "./../../providers/timers/timers.provider";

function showStopWatch(remainingTime, totalDuration) {
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

export const Stopwatch = () => {
  const { endingStopwatchRemainingTime, endingStopwatchTotalTime } = useContext(TimersContext);

  return <>{showStopWatch(endingStopwatchRemainingTime, endingStopwatchTotalTime)}</>;
};
