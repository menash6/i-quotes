import { useState, useEffect, useCallback, useRef } from "react";

import {
  LOAD_STATUS,
  setCurTrackEnded,
  setCurTrackStopped,
  getStateAsHowl,
  setCurTrackLoaded,
  initCurrTrack,
  currTrackCheckPlayAndUpdate,
  currTrackLoadAndPlay,
  setCurrTrackByHowl,
  destroyList,
  getNextIndex,
  getPrevIndex,
  loadCurrWindow,
  initList,
  FADE_DURATION,
  createRandomIndices,
  shuffleByIndices,
} from "./usePlaylistUtils";

export default function usePlaylist({ filesList, defaultVol = 1, autoPlay = true, baseUrl = "" }) {
  const [currTrack, setCurrTrack] = useState({
    index: 0,
    loadStatus: LOAD_STATUS.UNLOADED,
    isPlaying: false,
    isPaused: false,
    isEnded: false,
    isStopped: false,
    volume: defaultVol,
  });

  const [howlsCreatedNow, setHowlsCreatedNow] = useState(false);
  // const [howlsShuffledNow, setHowlsShuffledNow] = useState(false);
  const [shouldVolUp, setShouldVolUp] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const tracks = useRef(null);
  const tracksFiltered = useRef(null);

  const setCurrTrackToNext = useCallback((length) => {
    setCurrTrack((prevState) => {
      const nextIndex = getNextIndex(prevState.index, length);
      return {
        ...prevState,
        index: nextIndex,
      };
    });
  }, []);

  const onEndHandler = useCallback(
    (length) => {
      console.log("🚀 ~ onEndHandler", onEndHandler);
      console.log("🚀 ~ onEndHandler autoPlay", autoPlay);

      setCurTrackEnded(setCurrTrack);

      if (!autoPlay) {
        console.log("🚀 ~AM I HERE???? autoPlay", autoPlay);
        setShouldPlay(false);
        return;
      }
      //if autoplay=true - continue to the next track
      setShouldPlay(true);
      setCurrTrackToNext(length);
    },
    [autoPlay, setCurrTrackToNext]
  );

  const onVolHandler = useCallback(() => {
    setCurrTrack((prevState) => {
      const currVol = tracksFiltered.current[prevState.index].howl.volume();
      return { ...prevState, volume: currVol };
    }, []);

    // setPlaylistVol(howlsFiltered.current[currTrack.index].volume());
  }, []);

  /**
   * * Init All Howls: when fileList updates
   */

  useEffect(() => {
    console.log("🚀 ~ useEffect #1 INIT ~ filesList", filesList);
    //todo create all filtered sub playlists

    const newTracks = initList({
      baseUrl,
      filesList,
      onEndHandler,
      onVolHandler,
      defaultVol,
    });
    if (newTracks) {
      //todo create filtered subPlaylists - according to filters/categories
      setHowlsCreatedNow(true);

      initCurrTrack({ tracks: newTracks, setCurrTrack, defaultVol });

      loadCurrWindow({ tracks: newTracks, currentIndex: 0, setCurrTrack });
      tracks.current = newTracks;
      tracksFiltered.current = newTracks;

      console.log("🚀 ~ useEffect ~ tracksFiltered.current", tracksFiltered.current);
    }
    return () => {
      destroyList(newTracks);
    };
  }, [filesList, defaultVol, onEndHandler, baseUrl, onVolHandler]);

  /**
   * *when index updates load a 3 tracks/howls window - current, next and prev of
   * *based on the current track and then updates their loadStatus
   */
  useEffect(() => {
    console.log("🚀 useEffect #2 LOAD ~ loadCurrWindow");
    console.log("🚀 useEffect #2 LOAD ~ howlsRef.current", tracksFiltered.current);
    console.log("🚀 useEffect #2 LOAD ~ currTrack.index", currTrack.index);
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;
    loadCurrWindow({
      tracks: tracksFiltered.current,
      currentIndex: currTrack.index,
      setCurrTrack,
    });
  }, [currTrack.index]);

  /**
   * * when current index updates play if autoplay or shouldPlay
   */

  useEffect(() => {
    console.log("🚀 useEffect #3 UPDATE ~ howlsFiltered.current", tracksFiltered.current);
    console.log("🚀 useEffect #3 UPDATE ~ shouldPlay", shouldPlay);
    console.log("🚀 useEffect #3 UPDATE ~ currTrack.index", currTrack.index);
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;
    if (!shouldPlay) return;
    const currHowl = tracksFiltered.current[currTrack.index].howl;
    if (currHowl.playing()) return;
    console.log("🚀 ~ useEffect ~ currHowl.playing()", currHowl.playing());

    const howlState = currHowl.state();
    if (howlState === "loading" || howlState === "unloaded") {
      //update the state like the howl loading or unloaded until it loads
      setCurrTrackByHowl({ tracks: tracksFiltered.current, setCurrTrack }); // to unloaded or loading
      currTrackLoadAndPlay({ howl: currHowl, setCurrTrack }); //load and then play
    }
    if (howlState === "loaded") {
      setCurTrackLoaded(setCurrTrack);
      currTrackCheckPlayAndUpdate({ howl: currHowl, setCurrTrack, shouldVolUp });
    }
  }, [currTrack.index, shouldPlay, shouldVolUp]);

  const stop = useCallback(() => {
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;
    tracksFiltered.current[currTrack.index].howl.stop();
    setShouldPlay(false);
    setCurTrackStopped(setCurrTrack);
  }, [currTrack.index]);

  const next = () => {
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index].howl) return;
    tracksFiltered.current[currTrack.index].howl.stop();
    setCurrTrack((prevState) => {
      const nextIndex = getNextIndex(prevState.index, tracksFiltered.current.length);
      console.log({ nextIndex });
      return {
        index: nextIndex,
        loadStatus: getStateAsHowl(tracksFiltered.current, nextIndex),
      };
    });
  };
  const prev = () => {
    console.log(" usePlaylist prev!!!");
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;
    tracksFiltered.current[currTrack.index].howl.stop();

    setCurrTrack((prevState) => {
      const prevIndex = getPrevIndex(prevState.index, tracksFiltered.current.length);
      console.log({ prevIndex });
      return {
        index: prevIndex,
        loadStatus: getStateAsHowl(tracksFiltered.current, prevIndex),
      };
    });
  };

  const play = useCallback(() => {
    console.log(" usePlaylist play!!!");
    // if (currTrack.isPlaying) return;
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;

    const currHowl = tracksFiltered.current[currTrack.index].howl;
    if (currHowl.playing()) return;
    setShouldPlay(true);

    if (!shouldVolUp) {
      currHowl.volume(defaultVol);
    }

    const currHowlState = currHowl.state();
    if (currHowlState === "unloaded") {
      console.warn("currHowl is unloaded when trying to play", { currHowl });
      currTrackLoadAndPlay({ currHowl, setCurrTrack });
      return;
    }

    if (currHowlState === "loaded") {
      setCurTrackLoaded(setCurrTrack);
      currTrackCheckPlayAndUpdate({ howl: currHowl, setCurrTrack, shouldVolUp });
    }

    if (currHowlState === "loading") {
      //once load.. play
      currHowl.once("load", () => {
        setCurTrackLoaded(setCurrTrack);
        currTrackCheckPlayAndUpdate({ howl: currHowl, setCurrTrack, shouldVolUp });
      });
    }
  }, [currTrack.index, defaultVol, shouldVolUp]);

  /**
   * * after new tracks were created- checks if should play and then play
   * *
   */
  useEffect(() => {
    if (howlsCreatedNow && shouldPlay) {
      setHowlsCreatedNow(false);
      play();
    }

    console.log("🚀 ~ useEffect #4 ~ shouldPlay", shouldPlay);
    console.log("🚀 ~ useEffect #4 ~ howlsCreatedNow", howlsCreatedNow);
  }, [howlsCreatedNow, play, shouldPlay]);

  const volUp = useCallback(() => {
    console.log(" usePlaylist volUp!!!");
    if (tracksFiltered.current && tracksFiltered.current[currTrack.index]) {
      const currHowl = tracksFiltered.current[currTrack.index].howl;
      const currVol = currHowl.volume();
      console.log({ currVol });
      if (currVol === 1) return;
      currHowl.fade(currVol, 1, FADE_DURATION / 4);
      setShouldVolUp(true);
    }
  }, [currTrack.index]);

  const volDown = useCallback(() => {
    console.log(" usePlaylist volDown!!!");
    if (tracksFiltered.current && tracksFiltered.current[currTrack.index]) {
      const currHowl = tracksFiltered.current[currTrack.index].howl;
      const currVol = currHowl.volume();
      console.log({ currVol });
      if (currVol === defaultVol) return;
      setShouldVolUp(false);

      currHowl.fade(currVol, defaultVol, FADE_DURATION / 4);
    }
  }, [currTrack.index, defaultVol]);

  const pause = () => {
    console.log(" usePlaylist pause!!!");
    setShouldPlay(false);
    if (currTrack.isEnded) return;
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;

    tracksFiltered.current[currTrack.index].howl.pause();
    setCurrTrack((prevState) => {
      return { ...prevState, isPaused: true, isPlaying: false };
    });
  };
  const nextAndPlay = () => {
    next();
    setShouldPlay(true);
  };
  const getCurrentTitle = () => {
    return tracksFiltered.current && tracksFiltered.current[currTrack.index]
      ? tracksFiltered.current[currTrack.index].title
      : "loading title";
  };

  const getCurrentDuration = () => {
    if (!tracksFiltered.current || !tracksFiltered.current[currTrack.index]) return;
    return tracksFiltered.current[currTrack.index].howl.duration();
  };
  const getCurrentIndex = () => {
    return currTrack.index;
  };

  const restart = useCallback(() => {
    console.log(" usePlaylist restart!!!");
    setShouldPlay(false);
    setShouldVolUp(false);

    if (tracksFiltered.current) {
      // if (tracksFiltered.current[currTrack.index]) {
      //   // howlsRef.current[currTrack.index].stop();
      //   // Howler.stop();
      // }

      initCurrTrack({ tracks: tracksFiltered.current, setCurrTrack, defaultVol });
    }
  }, [defaultVol]);

  const shuffle = useCallback(
    (shuffledIndices = null) => {
      if (!shuffledIndices) {
        shuffledIndices = createRandomIndices(tracksFiltered.current.length);
      }
      // stop music if playing
      if (!tracksFiltered.current) return;
      tracksFiltered.current.forEach((howl) => {
        if (howl.howl) howl.howl.stop();
      });

      setCurTrackStopped(setCurrTrack);

      // shuffleByIndices({ array: filesListRef.current, shuffledIndices });
      shuffleByIndices({ array: tracksFiltered.current, shuffledIndices });

      // setHowlsShuffledNow(true);

      loadCurrWindow({
        tracks: tracksFiltered.current,
        currentIndex: 0,
        setCurrTrack,
      });

      initCurrTrack({ tracks: tracksFiltered.current, setCurrTrack, defaultVol });
    },
    [defaultVol]
  );

  const filterByCategoryId = useCallback(
    (categoryId) => {
      // stop music if playing
      if (!tracksFiltered.current) return;
      tracksFiltered.current.forEach((howl) => {
        if (howl.howl) howl.howl.stop();
      });

      setCurTrackStopped(setCurrTrack);

      if (categoryId === "") {
        tracksFiltered.current = tracks.current;
      } else {
        // filter tracks and update tracksFiltered
        tracksFiltered.current = tracks.current.filter((e) => {
          return e.categories.filter((e) => e._id === categoryId).length > 0;
        });
      }

      loadCurrWindow({
        tracks: tracksFiltered.current,
        currentIndex: 0,
        setCurrTrack,
      });

      initCurrTrack({ tracks: tracksFiltered.current, setCurrTrack, defaultVol });
      if (shouldPlay) {
        play();
      }
    },
    [defaultVol, play, shouldPlay]
  );

  return {
    filterByCategoryId,
    shuffle,
    getCurrentIndex,
    getCurrentTitle,
    getCurrentDuration,
    currLoadStatus: currTrack.loadStatus,
    isPlaying: currTrack.isPlaying,
    isPaused: currTrack.isPaused,
    isEnded: currTrack.isEnded,
    isStopped: currTrack.isStopped,
    volume: currTrack.volume,
    next,
    prev,
    play,
    pause,
    volDown,
    volUp,
    restart,
    nextAndPlay,
    stop,
  };
}
