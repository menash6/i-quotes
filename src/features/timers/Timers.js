import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { usePageVisibility } from "react-page-visibility";
import { CirclesTimer } from "./CirclesTimer";
import { CirclesAnimation } from "./CirclesAnimation";

import MusicControls from "../../components/layout/MusicControls";

import TotalTimerLayout from "../../components/layout/TotalTimerLayout";

import "./Timers.css";

import {
  selectStatusTotalTimers,
  selectTotalTime,
  selectIntervalTime,
  selectNumOfIntervals,
  STATUS,
} from "./timersSlice";
import TotalTimer from "./TotalTimer";
import { TimersContext } from "./../../providers/timers/timers.provider";

export function Timers({ children, categoryName }) {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const totalTime = useSelector(selectTotalTime);
  const intervalTime = useSelector(selectIntervalTime);
  const numOfIntervals = useSelector(selectNumOfIntervals);
  const [newKeyChangeCircles, setNewKeyChangeCircles] = useState(0);
  const isVisible = usePageVisibility();

  const { activeInterval, remainingIntervalSeconds, updateStatus, remainingTime } =
    useContext(TimersContext);

  useEffect(() => {
    if (statusTotalTimer === STATUS.READY) setNewKeyChangeCircles((prevKey) => prevKey + 1);
  }, [statusTotalTimer]);

  useEffect(() => {
    setNewKeyChangeCircles((prevKey) => prevKey + 1);
  }, [totalTime, numOfIntervals, isVisible]);

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
            {children}
          </CirclesAnimation>
        ) : (
          <CirclesTimer
            categoryName={categoryName}
            newKey={newKeyChangeCircles}
            statusTotalTimer={updateStatus}
            // isPlaying={statusTotalTimer === STATUS.RUNNING}
            intervalDuration={intervalTime}
            numOfTimers={numOfIntervals}
            intervalRemaining={remainingIntervalSeconds}
            activeInterval={activeInterval}
          >
            {children}
          </CirclesTimer>
        )}
      </MusicControls>
      <TotalTimerLayout>
        <TotalTimer remainingTime={remainingTime} />
      </TotalTimerLayout>
    </>
  );
}
