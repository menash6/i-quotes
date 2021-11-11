import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

import { STATUS } from "../timers/timersSlice";

import { fetchQuotes, proxyurl, audioPath } from "./quotesPlayerAPI";
import { fetchFilesFromFolder } from "../../firebase.js";
import { ALL_SPEAKERS } from "../../providers/quotesPlayer/quotesPlayer.provider";

//filterQuotes by filter
const filterQuotes = (state) => {
  //
  // console.log("filterQuotes");
  // console.log("state.allQuotes", state.allQuotes);
  // console.log(state.filteredQuotes);
  // console.log(state.quotesPlayer);
  // state.allQuotes.filter();

  if (state.filter === -1) {
    //filter all recorded quotes
    state.filteredQuotes = state.allQuotes.filter(
      (quote) => quote.eng_am_rec === true && quote.eng_ld_rec === true && quote.eng_sl_rec === true
    );
  } else {
    state.filteredQuotes = state.allQuotes.filter(
      (quote) =>
        quote.categories?.includes(state.filter) &&
        quote.eng_am_rec === true &&
        quote.eng_ld_rec === true &&
        quote.eng_sl_rec === true
    );
  }

  // state.filteredQuotes = state.allQuotes.filter(
  //   (quote) =>
  //     quote.categories?.includes(state.filter) && quote.audEng?.length > 0
  // );
};
// shuffle filteredQuotes - it is NOT PURE function...
const shuffleQuotes = (state) => {
  // console.log("shuffleQuotes");
  // console.log(state.filteredQuotes);

  for (let i = state.filteredQuotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.filteredQuotes[i], state.filteredQuotes[j]] = [
      state.filteredQuotes[j],
      state.filteredQuotes[i],
    ];
  }
  // console.log(state.filteredQuotes);
};

const parseRecordings = (array, allQuotes) => {
  const res = array.map((e) => {
    const id = parseInt(e.title.substring(0, 5));
    const idShifted = id - 1; //ids starts from 1 in DB
    const quoteEng = allQuotes[idShifted].eng_txt;
    const categories = allQuotes[idShifted].categories;
    return { id, title: quoteEng, categories, url: e.url };
  });
  return res;
};

const INITIAL_DEFAULTS = {
  // musicVol: 0.1,
  endingQuotesFilter: 6,
  filter: -1,
  endingQuoteIndex: 815,
};

const initialState = {
  allQuotesPlaylist: [],
  filteredPlaylists: [[], [], [], [], []],

  endingQuotesPlaylists: [[], [], []],
  endingQuotesOnePlaylist: [],
  debugMode: false,
  showTotalQuotes: false,

  speakerMode: ALL_SPEAKERS,

  currentSpeaker: 0, // 0 for marcus, 1 for stacey, 2 for lila
  prevSpeaker: 0,
  isAllSpeakers: true,
  allQuotes: [],

  filteredQuotes: [],
  endingQuote: {},
  filter: INITIAL_DEFAULTS.filter,
  // isAllFilters: true,
  // filteredQuotesPaths: [],
  currentQuoteIndex: 0,
  status: "idle",
  isLoading: true,
  isPlayingQuote: false,
  statusPlayingQuote: STATUS.READY, //PLAYING, PAUSED, ENDED, READY
  hasError: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAsyncQuotes = createAsyncThunk("quotesPlayer/fetchQuotes", async () => {
  const allQuotes = await fetchQuotes();

  const amRecordings = fetchFilesFromFolder("/quotes/am");
  const ldRecordings = fetchFilesFromFolder("/quotes/ld");
  const slRecordings = fetchFilesFromFolder("/quotes/sl");
  const jlRecordings = fetchFilesFromFolder("/quotes/jl");
  return Promise.all([allQuotes, amRecordings, ldRecordings, slRecordings, jlRecordings]);

  // const categories = await fetchCategories();
  // return response;
});

export const quotesPlayerSlice = createSlice({
  name: "quotesPlayer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    restartQuotesAndMusic: (state, action) => {
      state.statusPlayingQuote = STATUS.READY;
      state.isPlayingMusic = false;
      // state.musicVol = INITIAL_DEFAULTS.musicVol;
      state.currentQuoteIndex = (state.currentQuoteIndex + 1) % state.filteredQuotes.length;

      // dispatch(setIsPlayingMusic(false));
      // dispatch(setStatusPlayingQuote(STATUS.READY));
      // dispatch(updateQuoteIndex()); //todo shuffle
    },
    setIsPlayingMusicAndQuotes: (state, action) => {
      // console.log("setIsPlayingMusicAndQuotes and payload is", action.payload);
      // console.log("typeof action.payload", typeof action.payload);
      if (action.payload === true) {
        // if (state.musicVol == 1) state.musicVol = 0.1;
        if (state.statusPlayingQuote === STATUS.PAUSED || state.statusPlayingQuote === STATUS.READY)
          // if ENDED do nothing

          state.statusPlayingQuote = STATUS.RUNNING;
      } //if paused
      if (action.payload === false) {
        if (state.statusPlayingQuote === STATUS.RUNNING) state.statusPlayingQuote = STATUS.PAUSED;
      }
      state.isPlayingMusic = action.payload;
    },
    setStatusPlayingQuote: (state, action) => {
      state.statusPlayingQuote = action.payload;
    },
    setDebugMode: (state, action) => {
      state.debugMode = action.payload;
    },
    setIsPlayingQuote: (state, action) => {
      if (action.payload === true) {
        state.isPlayingQuote = true;
        // state.musicVol = 0.1;
      } //if paused
      if (action.payload === false) {
        state.isPlayingQuote = false;
        // state.musicVol = 1;
      }
    },
    setIsPlayingMusic: (state, action) => {
      if (action.payload === false) {
        // time to the the fade - if it is running...
      }
      state.isPlayingMusic = action.payload;
    },
    setFilter: (state, action) => {
      console.warn("setFilter" + action.payload);
      state.filter = parseInt(action.payload);
      state.currentQuoteIndex = 0;

      filterQuotes(state);
      shuffleQuotes(state);
    },

    setSpeakerMode: (state, action) => {
      state.speakerMode = parseInt(action.payload);
      console.log("🚀 ~ state.speakerMode", state.speakerMode);
    },

    setSpeaker: (state, action) => {
      state.prevSpeaker = state.currentSpeaker;
      console.log("🚀 ~ setSpeaker", { state });

      state.currentSpeaker = parseInt(action.payload);
    },
    setIsIsAllSpeakers: (state, action) => {
      state.isAllSpeakers = action.payload;
    },
    setShowTotalQuotes: (state, action) => {
      state.showTotalQuotes = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncQuotes.pending, (state) => {
        state.status = "loading";
        console.log("loading Quotes");
      })

      .addCase(fetchAsyncQuotes.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.allQuotes = action.payload;
        console.log("fetchAsyncQuotes", action.payload);
        const allQuotes = action.payload[0];

        const amRecordings = parseRecordings(action.payload[1], allQuotes);
        const ldRecordings = parseRecordings(action.payload[2], allQuotes);
        const slRecordings = parseRecordings(action.payload[3], allQuotes);
        const jlRecordings = parseRecordings(action.payload[4], allQuotes);

        const ldRecordingsFiltered = ldRecordings.filter((el) => {
          return amRecordings.find((element) => {
            return element.id === el.id;
          });
        });
        const slRecordingsFiltered = slRecordings.filter((el) => {
          return amRecordings.find((element) => {
            return element.id === el.id;
          });
        });

        state.allQuotesPlaylist = [amRecordings, slRecordingsFiltered, ldRecordingsFiltered];

        const allQuotesPlaylist = state.allQuotesPlaylist;

        for (let filter = 0; filter < 5; filter++) {
          const amFiltered = allQuotesPlaylist[0].filter((quote) =>
            quote.categories?.includes(filter)
          );
          const slFiltered = allQuotesPlaylist[1].filter((quote) =>
            quote.categories?.includes(filter)
          );
          const ldFiltered = allQuotesPlaylist[2].filter((quote) =>
            quote.categories?.includes(filter)
          );
          state.filteredPlaylists[filter] = [amFiltered, slFiltered, ldFiltered];
        }

        //👇 organize ending quotes into 3 playlists

        const amFilteredEnding = allQuotesPlaylist[0].filter((quote) =>
          quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );

        const slFilteredEnding = allQuotesPlaylist[1].filter((quote) =>
          quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );

        const ldFilteredEnding = allQuotesPlaylist[2].filter((quote) =>
          quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );

        state.endingQuotesPlaylists = [amFilteredEnding, slFilteredEnding, ldFilteredEnding];

        state.endingQuotesOnePlaylist = state.endingQuotesPlaylists.flat(1);

        //👇 remove ending quotes from all quotes

        state.allQuotesPlaylist[0] = allQuotesPlaylist[0].filter(
          (quote) => !quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );
        state.allQuotesPlaylist[1] = allQuotesPlaylist[1].filter(
          (quote) => !quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );
        state.allQuotesPlaylist[2] = allQuotesPlaylist[2].filter(
          (quote) => !quote.categories?.includes(INITIAL_DEFAULTS.endingQuotesFilter)
        );

        state.status = "loaded";
        console.log("🚀 ~ .addCase ~ state.status", state.status);

        state.endingQuote = state.allQuotes.find((q) => q.id == INITIAL_DEFAULTS.endingQuoteIndex);
        console.log(" state.endingQuote", state.endingQuote);
      });
  },
});

export const {
  setIsPlayingMusicAndQuotes,

  updateMusicIndex,
  updateQuoteIndex,
  setFilter,
  setSpeaker,
  // setIsPlayingQuote,
  setIsPlayingMusic,
  setIsIsAllSpeakers,
  setStatusPlayingQuote,
} = quotesPlayerSlice.actions;

export const quotesPlayerActions = quotesPlayerSlice.actions;

export const selectSpeakerMode = (state) => state.quotesPlayer.speakerMode;
export const selectAllQuotesPlaylist = (state) => {
  // if (state.quotesPlayer.status !== "loaded") return [];
  return state.quotesPlayer.recordedQuotes;
};
export const selectFilteredQuotesPlaylists = (state) => {
  // if (state.quotesPlayer.status !== "loaded") return [];
  const currFilter = state.quotesPlayer.filter;
  console.log("🚀  ~ currFilter", currFilter);

  if (currFilter === -1) return state.quotesPlayer.allQuotesPlaylist;

  const filteredPlaylists = state.quotesPlayer.filteredPlaylists;

  return filteredPlaylists[currFilter];
};

export const selectEndingQuotesOnePlaylist = (state) => {
  return state.quotesPlayer.endingQuotesOnePlaylist;
};

export const selectStatus = (state) => state.quotesPlayer.status;
export const selectDebugMode = (state) => state.quotesPlayer.debugMode;
export const selectShowTotalQuotes = (state) => state.quotesPlayer.showTotalQuotes;
export const selectStatusMusic = (state) => state.quotesPlayer.statusMusic;
// export const selectFilterText = (state) => state.quotesPlayer.filterText;
export const selectMusicVol = (state) => state.quotesPlayer.musicVol;
export const selectIsAllSpeakers = (state) => state.quotesPlayer.isAllSpeakers;

export const selectIsPlayingQuote = (state) => state.quotesPlayer.isPlayingQuote;
export const selectStatusPlayingQuote = (state) => state.quotesPlayer.statusPlayingQuote;
export const selectIsPlayingMusic = (state) => state.quotesPlayer.isPlayingMusic;

export const selectQuotesFilter = (state) => state.quotesPlayer.filter;
export const selectSpeaker = (state) => state.quotesPlayer.currentSpeaker;
export const selectPrevSpeaker = (state) => state.quotesPlayer.prevSpeaker;

export default quotesPlayerSlice.reducer;
