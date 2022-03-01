import { STATUS } from "./timersSlice";

import * as Utils from "./CirclesUtils";

import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";

export function CirclesTimer({
  categoryName,
  newKey,
  statusTotalTimer,
  // isPlaying,
  intervalDuration,
  intervalRemaining,
  numOfTimers,
  activeInterval, // getting 0-9 timer
  children, //play and pause button
}) {
  const isPlaying = statusTotalTimer === STATUS.RUNNING;

  // const { currCategoryName } = useContext(MusicPlayerContext);

  const timers = new Array(numOfTimers);
  const spaceBetwenCircles = (Utils.outerEdge - Utils.innerEdge) / numOfTimers;
  const strokeWidth = Math.min(spaceBetwenCircles / 2, Utils.maxWidth);

  for (let i = 0; i < timers.length; i++) {
    let currentTimerDuration = intervalDuration;
    if (i === activeInterval) currentTimerDuration = intervalRemaining;
    if (i < activeInterval) currentTimerDuration = intervalDuration;
    if (i > activeInterval) currentTimerDuration = 0;

    const calculatedSize = Utils.calculateCircleSize({
      strokeWidth,
      numOfTimers,
      activeInterval: i,
    });

    const colorsByFilter = Utils.getFilteredColors(categoryName);
    // const colorsByFilter = Utils.getFilteredColors(currCategoryName);
    // const colorsByFilter = Utils.getFilteredColors(currFilter);

    timers[i] = Utils.CreateCircleTimer(
      {
        colors: Utils.get2Colors(colorsByFilter, i),
        strokeWidth,
        key: newKey,
        isPlaying: i >= activeInterval ? isPlaying : false,
        // isPlaying: i === activeInterval ? isPlaying : false,
        size: calculatedSize,
        // size: innerEdge + 2 * strokeWidth * (i + 1),
        duration: intervalDuration,
        timeRemaining: currentTimerDuration,
        innertimer: i === 0 ? children : timers[i - 1],
      }
      //timer  0 - holds the playpause button - recieved as children
      //all other timers reciver the timer before them
    );
  }

  return <>{timers[numOfTimers - 1]}</>;
}
