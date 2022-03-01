import { useContext, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import useIntervalTimer from "../../hooks/useIntervalTimer";

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
});

const TimersProvider = ({ children }) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const totalTime = useSelector(selectTotalTime);
  const intervalTime = useSelector(selectIntervalTime);
  const numOfIntervals = useSelector(selectNumOfIntervals);
  const isAllSpeakers = useSelector(selectIsAllSpeakers);

  // const { updateStatus, remainingTime, remainingIntervalSeconds, activeInterval } =
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

  // const timersContextValue = {};

  return (
    <TimersContext.Provider value={{ ...timersIntervalTimer }}>{children}</TimersContext.Provider>
  );
};

export default TimersProvider;
