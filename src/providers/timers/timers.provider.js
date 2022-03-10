import { useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import useIntervalTimer from "../../hooks/useIntervalTimer";
import { BackgroundMode } from "@awesome-cordova-plugins/background-mode";

import {
  selectSpeakerMode,
  quotesPlayerActions,
} from "../../features/quotesPlayer/quotesPlayerSlice";

import {
  selectStatusTotalTimers,
  selectTotalTime,
  selectIntervalTime,
  selectNumOfIntervals,
  STATUS,
  timersActions,
} from "./../../features/timers/timersSlice";

// import TotalTimer from "./TotalTimer";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { selectIsAllSpeakers } from "./../../features/quotesPlayer/quotesPlayerSlice";

export const TimersContext = createContext({
  updateStatus: STATUS.READY,
  remainingTime: 0,
  remainingIntervalSeconds: 0,
  activeInterval: 0,
  endingStopwatchRemainingTime: 0,
  endingStopwatchTotalTime: 120,
});

const endingTimerDefaults = { totalDuration: 120, numOfIntervals: 6 };

const TimersProvider = ({ children }) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const totalTime = useSelector(selectTotalTime);
  const intervalTime = useSelector(selectIntervalTime);
  const numOfIntervals = useSelector(selectNumOfIntervals);
  const isAllSpeakers = useSelector(selectIsAllSpeakers);

  const onEndingIntervalTimerComplete = () => {
    if (statusTotalTimer === STATUS.ENDED) {
      quotesControls.endingControls.nextAndPlay();
    }
    console.warn("onIntervalEnded STOPWATCH");
  };

  const endingStopwatchInterval = useIntervalTimer({
    updateStatus: statusTotalTimer === STATUS.ENDED ? STATUS.RUNNING : STATUS.READY,
    // isPlaying: statusTotalTimer === STATUS.RUNNING,
    totalDuration: endingTimerDefaults.totalDuration,
    intervalDuration: endingTimerDefaults.totalDuration / endingTimerDefaults.numOfIntervals,
    numOfIntervals: endingTimerDefaults.numOfIntervals,
    onEnded: () => console.warn("ONENDED STOPWATCH"),
    onIntervalEnded: () => onEndingIntervalTimerComplete(),
  });
  console.log("🚀🚀🚀 endingStopwatchInterval", endingStopwatchInterval);

  const timersIntervalTimer = useIntervalTimer({
    updateStatus: statusTotalTimer,
    // isPlaying: statusTotalTimer === STATUS.RUNNING,
    totalDuration: totalTime,
    intervalDuration: intervalTime,
    numOfIntervals: numOfIntervals,
    onEnded: () => onTotalTimerComplete(),
    onIntervalEnded: () => onIntervalTimerComplete(),
  });

  const dispatch = useDispatch();

  const quotesControls = useContext(QuotesPlayerContext);
  const musicControls = useContext(MusicPlayerContext);

  const onTotalTimerComplete = () => {
    dispatch(timersActions.endTotalTimer());

    quotesControls.restart();
    musicControls.restart();
    quotesControls.shuffle();
    musicControls.shuffle();
    quotesControls.endingControls.play();

    //todo start ENDING QUOTES NEW PLAYLIST
  };
  const onIntervalTimerComplete = () => {
    BackgroundMode.wakeUp();
    BackgroundMode.unlock();

    console.warn("⌛⌛⌛ onIntervalTimerComplete started");

    quotesControls.nextAndPlay();
    musicControls.volDown(); //TODO CHANGE BACK

    if (statusTotalTimer === STATUS.RUNNING) {
      if (isAllSpeakers) {
        let nextSpeaker = Math.floor(Math.random() * 3); //choose random speaker 0,1,2
        dispatch(quotesPlayerActions.setSpeaker(nextSpeaker));
      }
    }
    console.warn("onIntervalTimerComplete ended");
  };

  const timersContextValue = {
    ...timersIntervalTimer,
    endingStopwatchRemainingTime: endingStopwatchInterval.remainingTime,
    endingStopwatchTotalTime: endingTimerDefaults.totalDuration,
  };

  return <TimersContext.Provider value={timersContextValue}>{children}</TimersContext.Provider>;
};

export default TimersProvider;
