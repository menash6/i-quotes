import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import useIntervalTimer from "../../hooks/useIntervalTimer";
import { usePageVisibility } from "react-page-visibility";
import { CirclesTimer } from "./CirclesTimer";
import { CirclesAnimation } from "./CirclesAnimation";

import MusicControls from "../../components/layout/MusicControls";

import TotalTimerLayout from "../../components/layout/TotalTimerLayout";

import { quotesPlayerActions, selectIsAllSpeakers } from "../quotesPlayer/quotesPlayerSlice";
import "./Timers.css";

import {
  selectStatusTotalTimers,
  selectTotalTime,
  selectIntervalTime,
  selectNumOfIntervals,
  STATUS,
  timersActions,
} from "./timersSlice";
import TotalTimer from "./TotalTimer";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

export function Timers(props) {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const totalTime = useSelector(selectTotalTime);
  const intervalTime = useSelector(selectIntervalTime);
  const numOfIntervals = useSelector(selectNumOfIntervals);
  const [newKeyChangeCircles, setNewKeyChangeCircles] = useState(0);
  const isVisible = usePageVisibility();
  const isAllSpeakers = useSelector(selectIsAllSpeakers);

  useEffect(() => {
    if (statusTotalTimer === STATUS.READY) setNewKeyChangeCircles((prevKey) => prevKey + 1);
  }, [statusTotalTimer]);

  useEffect(() => {
    setNewKeyChangeCircles((prevKey) => prevKey + 1);
  }, [totalTime, numOfIntervals, isVisible]);

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

  const { updateStatus, remainingTime, remainingIntervalSeconds, activeInterval } =
    useIntervalTimer({
      updateStatus: statusTotalTimer,
      // isPlaying: statusTotalTimer === STATUS.RUNNING,
      totalDuration: totalTime,
      intervalDuration: intervalTime,
      numOfIntervals: numOfIntervals,
      onEnded: () => onTotalTimerComplete(),
      onIntervalEnded: () => onIntervalTimerComplete(),
    });

  return (
    <>
      <MusicControls>
        {statusTotalTimer === STATUS.ENDED ? (
          <CirclesAnimation
            // newKey={newKeyChangeCircles}
            isPlaying={true}
            intervalDuration={2}
            numOfTimers={numOfIntervals}
          >
            {props.children}
          </CirclesAnimation>
        ) : (
          <CirclesTimer
            newKey={newKeyChangeCircles}
            statusTotalTimer={updateStatus}
            // isPlaying={statusTotalTimer === STATUS.RUNNING}
            intervalDuration={intervalTime}
            numOfTimers={numOfIntervals}
            intervalRemaining={remainingIntervalSeconds}
            activeInterval={activeInterval}
          >
            {props.children}
          </CirclesTimer>
        )}
      </MusicControls>
      <TotalTimerLayout>
        <TotalTimer remainingTime={remainingTime} />
      </TotalTimerLayout>
    </>
  );
}
