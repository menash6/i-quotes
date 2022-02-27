import { createSlice } from "@reduxjs/toolkit";

const INITIAL_DEFAULTS = {
  filter: -1,
};

const initialState = {
  filter: INITIAL_DEFAULTS.filter,
};

export const musicPlayerSlice = createSlice({
  name: "musicPlayer",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      console.warn("setFilter" + action.payload);
      state.filter = parseInt(action.payload);
    },
  },
});

export const { setFilter } = musicPlayerSlice.actions;

export const musicPlayerActions = musicPlayerSlice.actions;
export const selectMusicFilter = (state) => state.musicPlayer.filter;

export default musicPlayerSlice.reducer;
