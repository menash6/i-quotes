import { STATUS } from "./timersSlice";
import useIntervalTimer from "../../hooks/useIntervalTimer";

import * as Utils from "./CirclesUtils";

export function CirclesAnimation({
  newKey,
  isPlaying,
  // isPlaying,
  intervalDuration,
  //   intervalRemaining,
  numOfTimers,
  //   activeInterval,
  children, //play and pause button
}) {
  const timers = new Array(numOfTimers);
  const spaceBetwenCircles = (Utils.outerEdge - Utils.innerEdge) / numOfTimers;
  const strokeWidth = Math.min(spaceBetwenCircles / 2, Utils.maxWidth);

  const { activeInterval } = useIntervalTimer({
    updateStatus: isPlaying ? STATUS.RUNNING : STATUS.READY,
    // isPlaying: statusTotalTimer === STATUS.RUNNING,
    totalDuration: intervalDuration,
    intervalDuration: intervalDuration * numOfTimers,
    numOfIntervals: numOfTimers,
    onEnded: () => console.warn("CIRLCES ANIMATION onEnded STOPWATCH"),
    onIntervalEnded: () => console.warn("CIRLCES ANIMATION onIntervalEnded STOPWATCH"),
  }); //update with the timer

  for (let i = 0; i < timers.length; i++) {
    let currentTimerDuration = intervalDuration;
    if (i === activeInterval) currentTimerDuration = intervalDuration;
    if (i < activeInterval) currentTimerDuration = intervalDuration;
    if (i > activeInterval) currentTimerDuration = 0;

    const calculatedSize = Utils.calculateCircleSize({
      strokeWidth,
      numOfTimers,
      activeInterval: i,
    });

    timers[i] = Utils.CreateCircleTimer({
      isLoop: true,
      colors: Utils.get2Colors(Utils.colorsRainbow, i),
      // colors: rotate(colorsRainbow, i),
      strokeWidth,
      key: newKey,
      isPlaying: i >= activeInterval ? isPlaying : false,
      // isPlaying: i === activeInterval ? isPlaying : false,
      size: calculatedSize,
      // size: innerEdge + 2 * strokeWidth * (i + 1),
      duration: intervalDuration,
      timeRemaining: currentTimerDuration,
      innertimer: i === 0 ? children : timers[i - 1],
    });
  }

  return <>{timers[numOfTimers - 1]}</>;
}
