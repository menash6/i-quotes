import { createSlice } from "@reduxjs/toolkit";

import { ALL_SPEAKERS } from "../../providers/quotesPlayer/quotesPlayer.provider";

const INITIAL_DEFAULTS = {
  endingQuotesFilter: 6,
  filter: -1,
  endingQuoteIndex: 815,
};

const initialState = {
  debugMode: false,

  speakerMode: ALL_SPEAKERS,
  currentSpeaker: 0, // 0 for marcus, 1 for stacey, 2 for lila
  prevSpeaker: 0,
  isAllSpeakers: true,
  filter: INITIAL_DEFAULTS.filter,
};

export const quotesPlayerSlice = createSlice({
  name: "quotesPlayer",
  initialState,
  reducers: {
    setDebugMode: (state, action) => {
      state.debugMode = action.payload;
    },

    setFilter: (state, action) => {
      state.filter = parseInt(action.payload);
      state.currentQuoteIndex = 0;
    },

    setSpeakerMode: (state, action) => {
      state.speakerMode = parseInt(action.payload);
    },

    setSpeaker: (state, action) => {
      state.prevSpeaker = state.currentSpeaker;

      state.currentSpeaker = parseInt(action.payload);
    },
  },
});

export const quotesPlayerActions = quotesPlayerSlice.actions;

export const selectSpeakerMode = (state) => state.quotesPlayer.speakerMode;

export const selectDebugMode = (state) => state.quotesPlayer.debugMode;
export const selectIsAllSpeakers = (state) => state.quotesPlayer.isAllSpeakers;

export const selectQuotesFilter = (state) => state.quotesPlayer.filter;
export const selectSpeaker = (state) => state.quotesPlayer.currentSpeaker;

export default quotesPlayerSlice.reducer;
