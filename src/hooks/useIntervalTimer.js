import { useState, useEffect } from "react";
// import { Time, Validate } from "./utils";
import { useInterval } from "./useInterval";
import { STATUS } from "./../features/timers/timersSlice";

// const DEFAULT_DELAY = 500;
const DEFAULT_DELAY = 1000;

function isValidCallBack(callBack) {
  const isValid = callBack && typeof callBack === "function";
  if (callBack && !isValid) {
    console.warn("{ useIntervalTimer } Invalid callback function", callBack); // eslint-disable-line
  }
  return isValid;
}

function getExpiryTimeStamp(secondsFromNow) {
  const expiryTimeStamp = new Date();
  expiryTimeStamp.setSeconds(expiryTimeStamp.getSeconds() + secondsFromNow);
  // console.log("getExpiryTimeStamp", { expiryTimeStamp });
  return expiryTimeStamp;
}

function getRemainingSeconds(expiry) {
  const now = new Date();
  // console.log("HERE getRemainingSeconds", { now }, { expiry });
  // const expirySec = expiry.getSeconds();
  // const nowSeconds = now.getSeconds();
  // console.log({ expirySec }, { nowSeconds });
  const remainingMilliSeconds = expiry.getTime() - now.getTime();
  let remainingSeconds = remainingMilliSeconds / 1000;
  // const remainingSeconds = Math.round(remainingMilliSeconds / 1000);
  remainingSeconds = remainingSeconds < 0 ? 0 : remainingSeconds;
  // console.log("getRemainingSeconds", { remainingSeconds });
  return remainingSeconds;
}

export default function useIntervalTimer({
  updateStatus = STATUS.READY,
  //   expiryTimestamp: expiry,
  // isPlaying = false,
  totalDuration,
  intervalDuration,
  numOfIntervals,
  onEnded = null,
  onIntervalEnded = null,
  //   autoStart = true,
}) {
  const [status, setStatus] = useState(STATUS.READY);
  const [expiryTimestamp, setExpiryTimestamp] = useState(getExpiryTimeStamp(totalDuration));
  const [remainingSeconds, setRemainingSeconds] = useState(totalDuration);
  // const numOfIntervals = Math.floor(totalDuration / intervalDuration);

  const restart = (newDuration, autoPlay = false) => {
    console.log("restart with ", { newDuration }, { autoPlay });
    const newExpiryTimestamp = getExpiryTimeStamp(newDuration);
    setExpiryTimestamp(newExpiryTimestamp);
    setRemainingSeconds(getRemainingSeconds(newExpiryTimestamp));
    setStatus(autoPlay ? STATUS.RUNNING : STATUS.READY);
  };

  const resume = () => restart(remainingSeconds, true);
  const pause = () => {
    console.log("pause");
    setRemainingSeconds(getRemainingSeconds(expiryTimestamp));

    setStatus(STATUS.PAUSED);
  };

  useEffect(() => {
    if (status === STATUS.READY) {
      if (updateStatus === STATUS.RUNNING) restart(totalDuration, true);
      else {
      } //wait}
    }

    if (status === STATUS.PAUSED) {
      if (updateStatus === STATUS.RUNNING) resume();
      if (updateStatus === STATUS.READY) restart(totalDuration);
    }

    if (status === STATUS.RUNNING) {
      if (updateStatus === STATUS.READY) restart(totalDuration);
      if (updateStatus === STATUS.PAUSED) pause();
    }

    if (status === STATUS.ENDED) {
      if (updateStatus === STATUS.READY) restart(totalDuration);
    }

    // if (status === STATUS.OVERTIME) {

    // }

    // if (isPlaying === true) {
    //   if (status === STATUS.READY) {
    //     console.log("*****from READY to RUNNING ");
    //     const newExpiryTimestamp = getExpiryTimeStamp(totalDuration);
    //     setExpiryTimestamp(newExpiryTimestamp);

    //     setRemainingSeconds(getRemainingSeconds(newExpiryTimestamp));

    //     setStatus(STATUS.RUNNING);
    //   }
    //   if (status === STATUS.PAUSED) {
    //     //resume
    //     console.log("*****from PAUSED to RUNNING");
    //     const newExpiryTimestamp = getExpiryTimeStamp(remainingSeconds);
    //     setExpiryTimestamp(newExpiryTimestamp);

    //     setStatus(STATUS.RUNNING);
    //   }
    // } else {
    //   if (status === STATUS.READY) {
    //     console.log("*****from READY to READY");
    //   }
    //   if (status === STATUS.RUNNING) {
    //     console.log("*****from RUNNING to PAUSED");
    //     if (updateStatus === STATUS.READY) setStatus(STATUS.READY);
    //     else setStatus(STATUS.PAUSED);
    //   }
    // }

    // return () => {
    //   // cleanup;
    // };
  }, [updateStatus, status, totalDuration, intervalDuration]);

  function handleComplete() {
    isValidCallBack(onEnded) && onEnded();
    setStatus(STATUS.ENDED);
  }

  useInterval(
    () => {
      const updatedRemainingSeconds = getRemainingSeconds(expiryTimestamp);
      // console.log("useInterval", { updatedRemainingSeconds });
      setRemainingSeconds(updatedRemainingSeconds);

      // console.log("useInterval", { remainingSeconds });
      if (remainingSeconds <= 0) {
        handleComplete();
      }

      if (remainingSeconds / intervalDuration !== numOfIntervals) {
        //dont trigger at the beginning (time 00:00)
        // console.log(
        //   "useInterval remainingSeconds % intervalDuration",
        //   remainingSeconds % intervalDuration
        // );
        // console.log(
        //   "useInterval remainingSeconds / intervalDuration",
        //   remainingSeconds / intervalDuration
        // );
        if (remainingSeconds !== remainingSeconds % intervalDuration) {
          // dont trigger in the last interval - when total timer ends
          if (remainingSeconds % intervalDuration < 1) {
            onIntervalEnded();
          }
        }
      }

      // if interval ended - OnEnded, active timer , remaining time for interval - update

      // intervalRemaining = (duration - time) % intervalDuration;
      // if (time !== 0 && intervalRemaining === 0) {
      //   dispatch(setActiveTimer(activeTimer - 1));
      //   onIntervalEnded();
      // }
      // console.log(`${time} seconds elapsed`);
      // console.log(`${elapsedTime} elapsedTime elapsed`);
    },
    status === STATUS.RUNNING ? DEFAULT_DELAY : null
    // status === STATUS.RUNNING ? DEFAULT_DELAY : null
  );

  if (status === STATUS.READY)
    return {
      updateStatus,
      remainingTime: totalDuration,
      remainingIntervalSeconds: intervalDuration,
      // numOfIntervals,
      activeInterval: numOfIntervals - 1, // we start from the outer timer - higher number
    };

  const activeInterval = Math.floor(remainingSeconds / intervalDuration);
  // console.log(
  //   { remainingSeconds },
  //   "/",
  //   { intervalDuration },
  //   "=",
  //   {
  //     activeInterval,
  //   },
  //   "acuate:",
  //   remainingSeconds / intervalDuration
  // );
  const remainingIntervalSeconds =
    remainingSeconds === totalDuration ? intervalDuration : remainingSeconds % intervalDuration;

  return {
    updateStatus,
    remainingTime: remainingSeconds,
    // remainingIntervalSeconds:remainingSeconds - activeInterval * intervalDuration,
    remainingIntervalSeconds,
    // numOfIntervals,
    activeInterval, //0-9 active interval
  };
}
