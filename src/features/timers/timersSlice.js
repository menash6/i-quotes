import { createSlice } from "@reduxjs/toolkit";

// const getIntervalTime = (totalTime, percent) => {
//   console.log("getIntervalTimes");
//   console.log({ totalTime }, { percent });
//   if (totalTime <= 30) return totalTime;
//   if (totalTime <= 60) return totalTime / 2;
//   let intervalEstimated = 0.005 * (2 * INITIAL_DEFAULTS.minInterval - totalTime) * (percent - 100);

//   intervalEstimated = Math.max(INITIAL_DEFAULTS.minInterval, intervalEstimated); // interval is less than 30sec

//   console.log({ intervalEstimated });
//   const numOfIntervals = Math.floor(totalTime / intervalEstimated);
//   console.log({ numOfIntervals });
//   console.log("getIntervalTime=totalTime / numOfIntervals ", totalTime / numOfIntervals);
//   return totalTime / numOfIntervals;
// };

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
  intervalTime: INITIAL_DEFAULTS.intervalTime,
  numOfIntervals: Math.floor(INITIAL_DEFAULTS.totalTime / INITIAL_DEFAULTS.intervalTime),
};

export const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
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
      if (updatedInterval < 30) state.numOfIntervals = Math.floor(state.totalTime / 30);
      state.intervalTime = state.totalTime / state.numOfIntervals;
    },

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
  // console.log({ state });
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

export const selectPlanIndex = (state) => state.timers.planIndex;
export const selectActiveTimer = (state) => state.timers.activeTimer;
export const selectIsRunning = (state) => state.timers.isRunning;
export const selectIsEnded = (state) => state.timers.isEnded;
export const selectTimeLeft = (state) => {
  console.log(state.timer);
  return state.timers.timeLeft;
};

export default timersSlice.reducer;
