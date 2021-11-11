import { createSlice } from "@reduxjs/toolkit";
import { timersDefaults } from "../quotesPlayer/quotesPlayerAPI";

/**
 * @param  {} percent
 * @param  {} totalTime
 * ?NOT USED RIGHT NOW
 * returns Interval(percent,totalTime) = I(p,T) = I=(0.3-0.005T)P+0.5T
 */
const getIntervalTime = (totalTime, percent) => {
  console.log("getIntervalTimes");
  console.log({ totalTime }, { percent });
  if (totalTime <= 30) return totalTime;
  if (totalTime <= 60) return totalTime / 2;
  let intervalEstimated =
    0.005 * (2 * INITIAL_DEFAULTS.minInterval - totalTime) * (percent - 100);

  intervalEstimated = Math.max(INITIAL_DEFAULTS.minInterval, intervalEstimated); // interval is less than 30sec

  // const intervalIdea =
  //   (INITIAL_DEFAULTS.minInterval - 0.5 * totalTime) * 0.01 * percent - 100;
  console.log({ intervalEstimated });
  const numOfIntervals = Math.floor(totalTime / intervalEstimated);
  console.log({ numOfIntervals });
  console.log(
    "getIntervalTime=totalTime / numOfIntervals ",
    totalTime / numOfIntervals
  );
  return totalTime / numOfIntervals;
};

const INITIAL_DEFAULTS = {
  totalTime: 600,
  // percent: 50,
  minInterval: 30, //seconds
  intervalTime: 60,
  maxIntervals: 100,
};
export const STATUS = {
  READY: "READY",
  RUNNING: "RUNNING",
  PAUSED: "PAUSED",
  ENDED: "ENDED",
  OVERTIME: "OVERTIME",
};
Object.freeze(STATUS);

const initialState = {
  status: STATUS.READY, // RUNNING,PAUSED,ENDED,OVERTIME
  totalTime: INITIAL_DEFAULTS.totalTime,
  // intervalTime: null, //determined by intervalPercent
  // intervalPercent: INITIAL_DEFAULTS.percent,
  // intervalTime: getIntervalTime(
  //   INITIAL_DEFAULTS.totalTime,
  //   INITIAL_DEFAULTS.percent
  // ),
  intervalTime: INITIAL_DEFAULTS.intervalTime,
  numOfIntervals: Math.floor(
    INITIAL_DEFAULTS.totalTime / INITIAL_DEFAULTS.intervalTime
  ),
  // maxNumIntervals: Math.floor(
  //   INITIAL_DEFAULTS.totalTime / INITIAL_DEFAULTS.minInterval
  // ),
};

export const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    // new timers recucers
    // setTimersPlan: (state, action) => {
    //   state.planIndex = action.payload;
    //   state.activeTimer =
    //     timersDefaults[action.payload].total /
    //       timersDefaults[action.payload].interval -
    //     1;
    // },
    setStatusTimer: (state, action) => {
      state.status = action.payload;
    },
    setTotalTime: (state, action) => {
      state.totalTime = action.payload;

      if (state.totalTime < 30) {
        state.numOfIntervals = 1;
        state.intervalTime = state.totalTime;
        return;
      }

      const updatedInterval = state.totalTime / state.numOfIntervals;
      console.log({ updatedInterval });
      if (updatedInterval < 30)
        state.numOfIntervals = Math.floor(state.totalTime / 30);
      console.log("NEW INTERVAL :", state.totalTime / state.numOfIntervals);
      state.intervalTime = state.totalTime / state.numOfIntervals;
    },
    // setTotalTime: (state, action) => {
    //   state.totalTime = action.payload;
    //   state.intervalTime = getIntervalTime(
    //     state.totalTime,
    //     state.intervalPercent
    //   );
    // },

    // setIntervalPercent: (state, action) => {
    //   state.intervalPercent = parseInt(action.payload); // between 0-100
    //   state.intervalTime = getIntervalTime(
    //     state.totalTime,
    //     state.intervalPercent
    //   );
    //   console.log("setIntervalPercent", { state });
    // },
    setNumOfIntervals: (state, action) => {
      state.numOfIntervals = parseInt(action.payload);
      state.intervalTime = state.totalTime / state.numOfIntervals;
      console.log("setNumOfIntervals", { state });
    },
    endTotalTimer: (state, action) => {
      state.status = STATUS.ENDED;
    },
    restartTotalTimer: (state, action) => {
      state.status = STATUS.READY;
    }, //DO SOMETHING ELSE??
    // setActiveTimer: (state, action) => (state.activeTimer = action.payload),
    // setIntervalTimeRemaining: (state, action) =>
    //   (state.intervalTimeRemaining = action.payload),
  },
});

export const timersActions = timersSlice.actions;
export const selectStatusTotalTimers = (state) => state.timers.status;
export const selectIsTotalTimeHours = (state) => {
  console.log({ state });
  return state.timers.totalTime >= 3600;
};

export const selectMaxNumIntervals = (state) =>
  Math.min(
    Math.floor(state.timers.totalTime / INITIAL_DEFAULTS.minInterval),
    INITIAL_DEFAULTS.maxIntervals
  );
export const selectTotalTime = (state) => state.timers.totalTime;
export const selectIntervalTime = (state) => state.timers.intervalTime;
export const selectIntervalPercent = (state) => state.timers.intervalPercent;

export const selectNumOfIntervals = (state) => state.timers.numOfIntervals;
// export const selectNumOfIntervals = (state) =>
//   Math.floor(state.timers.totalTime / state.timers.intervalTime);

// export const selectIntervalTimeRemaining = (state) =>
//   state.timers.intervalTimeRemaining;
export const selectPlanIndex = (state) => state.timers.planIndex;
export const selectActiveTimer = (state) => state.timers.activeTimer;
export const selectIsRunning = (state) => state.timers.isRunning;
export const selectIsEnded = (state) => state.timers.isEnded;
export const selectTimeLeft = (state) => {
  console.log(state.timer);
  return state.timers.timeLeft;
};

export default timersSlice.reducer;
