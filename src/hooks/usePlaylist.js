import { useState, useEffect, useCallback, useRef } from "react";
import { Howler } from "howler";

// import * as UTILS from "./usePlaylistUtils";
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
} from "./usePlaylistUtils";

export default function usePlaylist({
  filesList,
  defaultVol = 1,
  onEnd = null,
  onPlay = null,
  // shuffledIndices,
  // onPlay = () => {},
  autoPlay = true,
}) {
  const [currTrack, setCurrTrack] = useState({
    index: 0,
    loadStatus: LOAD_STATUS.UNLOADED,
    isPlaying: false,
    isPaused: false,
    isEnded: false,
    isStopped: false,
    volume: defaultVol,
  });

  // const [playlistVol, setPlaylistVol] = useState(defaultVol);

  const [howlsCreatedNow, setHowlsCreatedNow] = useState(false);
  const [howlsShuffledNow, setHowlsShuffledNow] = useState(false);
  const [shouldVolUp, setShouldVolUp] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);
  // const [howls, setHowls] = useState(null);
  const howlsRef = useRef(null);
  const filesListRef = useRef(null);

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

      if (onEnd) onEnd();
      setCurTrackEnded(setCurrTrack);

      // setCurrTrack((prevState) => {
      //   console.log("🚀 ~ setCurrTrack ~ prevState", prevState);

      //   return { ...prevState, isEnded: true, isPlaying: false, isPaused: false };
      // });
      if (!autoPlay) {
        console.log("🚀 ~AM I HERE???? autoPlay", autoPlay);
        setShouldPlay(false);
        return;
      }
      //if autoplay=true - continue to the next track
      setShouldPlay(true);
      setCurrTrackToNext(length);
    },
    [autoPlay, onEnd, setCurrTrackToNext]
  );

  const onVolHandler = useCallback(() => {
    setCurrTrack((prevState) => {
      const currVol = howlsRef.current[prevState.index].volume();
      return { ...prevState, volume: currVol };
    }, []);

    // setPlaylistVol(howlsRef.current[currTrack.index].volume());
  }, []);

  /**
   * * Init All Howls: when fileList updates
   */

  useEffect(() => {
    console.log("🚀 ~ useEffect #1 INIT ~ defaultVol", defaultVol);
    console.log("🚀 ~ useEffect #1 INIT ~ filesList", filesList);
    // if ((howls) &&(shouldPlay)) {
    // destroyList(howls);
    //? check if file list actually changed???

    filesListRef.current = [...filesList];
    //todo create all filtered sub playlists

    // shuffleByIndices({ array: filesListRef.current, shuffledIndices });
    //create a copy of filesList
    //shuffle the copy

    const newHowls = initList({
      filesList: filesListRef.current,
      onEndHandler,
      onVolHandler,
      onPlay,
      defaultVol,
    });
    if (newHowls) {
      //todo create filtered subPlaylists - according to filters/categories
      setHowlsCreatedNow(true);

      initCurrTrack({ howls: newHowls, setCurrTrack, defaultVol });
      // setCurrTrack(() => {
      //   return {
      //     isPlaying: false,
      //     isPaused: false,
      //     isEnded: true, //!update!
      //     index: 0,
      //     loadStatus: getStateAsHowl(newHowls, 0),
      //   };
      // });
      loadCurrWindow({ howls: newHowls, currentIndex: 0, setCurrTrack });
      howlsRef.current = newHowls;

      console.log("🚀 ~ useEffect ~ howlsRef.current", howlsRef.current);
    }
    return () => {
      destroyList(newHowls);
    };
  }, [filesList, defaultVol, onEndHandler, onPlay, onVolHandler]);

  /**
   * *when index updates load a 3 tracks/howls window - current, next and prev of
   * *based on the current track and then updates their loadStatus
   */
  useEffect(() => {
    console.log("🚀 useEffect #2 LOAD ~ loadCurrWindow");
    console.log("🚀 useEffect #2 LOAD ~ howlsRef.current", howlsRef.current);
    console.log("🚀 useEffect #2 LOAD ~ currTrack.index", currTrack.index);
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    loadCurrWindow({
      howls: howlsRef.current,
      currentIndex: currTrack.index,
      setCurrTrack,
    });
  }, [currTrack.index]);

  /**
   * ? do I need howls as a dependency... or should I trust the state
   * * when current index updates play if autoplay or shouldPlay
   */

  useEffect(() => {
    console.log("🚀 useEffect #3 UPDATE ~ howlsRef.current", howlsRef.current);
    console.log("🚀 useEffect #3 UPDATE ~ shouldPlay", shouldPlay);
    console.log("🚀 useEffect #3 UPDATE ~ currTrack.index", currTrack.index);
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    if (!shouldPlay) return;
    const currHowl = howlsRef.current[currTrack.index];
    if (currHowl.playing()) return;
    console.log("🚀 ~ useEffect ~ currHowl.playing()", currHowl.playing());

    const howlState = currHowl.state();
    if (howlState === "loading" || howlState === "unloaded") {
      //update the state like the howl loading or unloaded until it loads
      setCurrTrackByHowl({ howls: howlsRef.current, setCurrTrack }); // to unloaded or loading
      currTrackLoadAndPlay({ howl: currHowl, setCurrTrack }); //load and then play
    }
    if (howlState === "loaded") {
      setCurTrackLoaded(setCurrTrack);
      currTrackCheckPlayAndUpdate({ howl: currHowl, setCurrTrack, shouldVolUp });
    }
  }, [currTrack.index, shouldPlay, shouldVolUp]);

  const stop = useCallback(() => {
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    howlsRef.current[currTrack.index].stop();
    setShouldPlay(false);
    setCurTrackStopped(setCurrTrack);
    // setCurTrackEnded(setCurrTrack); //!new change! separating between ENDED and STOPPED
  }, [currTrack.index]);

  const next = () => {
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    howlsRef.current[currTrack.index].stop();
    setCurrTrack((prevState) => {
      const nextIndex = getNextIndex(prevState.index, filesList.length);
      console.log({ nextIndex });
      return {
        index: nextIndex,
        loadStatus: getStateAsHowl(howlsRef.current, nextIndex),
      };
    });
  };
  const prev = () => {
    console.log(" usePlaylist prev!!!");
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    howlsRef.current[currTrack.index].stop();

    setCurrTrack((prevState) => {
      const prevIndex = getPrevIndex(prevState.index, filesList.length);
      console.log({ prevIndex });
      return {
        index: prevIndex,
        loadStatus: getStateAsHowl(howlsRef.current, prevIndex),
      };
    });
  };

  const volUp = useCallback(() => {
    console.log(" usePlaylist volUp!!!");
    if (howlsRef.current && howlsRef.current[currTrack.index]) {
      const currentHowl = howlsRef.current[currTrack.index];
      const currVol = currentHowl.volume();
      console.log({ currVol });
      if (currVol === 1) return;
      currentHowl.fade(currVol, 1, FADE_DURATION / 4);
      setShouldVolUp(true);
    }
  }, [currTrack.index]);

  const volDown = useCallback(() => {
    console.log(" usePlaylist volDown!!!");
    if (howlsRef.current && howlsRef.current[currTrack.index]) {
      const currentHowl = howlsRef.current[currTrack.index];
      const currVol = currentHowl.volume();
      console.log({ currVol });
      if (currVol === defaultVol) return;
      setShouldVolUp(false);

      currentHowl.fade(currVol, defaultVol, FADE_DURATION / 4);
    }
  }, [currTrack.index, defaultVol]);

  const play = useCallback(() => {
    console.log(" usePlaylist play!!!");
    // if (currTrack.isPlaying) return;
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;

    const currentHowl = howlsRef.current[currTrack.index];
    if (currentHowl.playing()) return;
    setShouldPlay(true);

    // if (shouldVolUp) volUp();

    // currentHowl.once("play", () => onPlay());
    // currentHowl.once("end",()=> onEnd());

    const currentHowlState = currentHowl.state();
    if (currentHowlState === "unloaded") {
      console.warn("currentHowl is unloaded when trying to play", { currentHowl });
      currTrackLoadAndPlay({ currentHowl, setCurrTrack });
      return;
    }

    if (currentHowlState === "loaded") {
      setCurTrackLoaded(setCurrTrack);
      currTrackCheckPlayAndUpdate({ howl: currentHowl, setCurrTrack, shouldVolUp });
    }

    if (currentHowlState === "loading") {
      //once load.. play
      currentHowl.once("load", () => {
        setCurTrackLoaded(setCurrTrack);
        currTrackCheckPlayAndUpdate({ howl: currentHowl, setCurrTrack, shouldVolUp });
      });
    }
  }, [currTrack.index, shouldVolUp]);

  /**
   * * after new howls were created- checks if should play and then play
   * *
   */
  useEffect(() => {
    if (howlsCreatedNow && shouldPlay) {
      setHowlsCreatedNow(false);
      play();
    }
    // if (howlsShuffledNow && shouldPlay) {
    //   setHowlsShuffledNow(false);z
    //   play();
    // }

    console.log("🚀 ~ useEffect #4 ~ shouldPlay", shouldPlay);
    // console.log("🚀 ~ useEffect #4 ~ howlsShuffledNow", howlsShuffledNow);
    console.log("🚀 ~ useEffect #4 ~ howlsCreatedNow", howlsCreatedNow);
  }, [howlsCreatedNow, play, shouldPlay]);
  // }, [howlsCreatedNow, play, shouldPlay, howlsShuffledNow]);

  const pause = () => {
    console.log(" usePlaylist pause!!!");
    setShouldPlay(false);
    if (currTrack.isEnded) return;
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;

    howlsRef.current[currTrack.index].pause();
    setCurrTrack((prevState) => {
      return { ...prevState, isPaused: true, isPlaying: false };
    });
  };
  const nextAndPlay = () => {
    next();
    setShouldPlay(true);
  };
  const getCurrentTitle = () => {
    return filesListRef.current && filesListRef.current[currTrack.index]
      ? filesListRef.current[currTrack.index].title
      : "loading title";
  };
  const getCurrentDuration = () => {
    if (!howlsRef.current || !howlsRef.current[currTrack.index]) return;
    return howlsRef.current[currTrack.index].duration();
  };
  const getCurrentIndex = () => {
    return currTrack.index;
  };

  const restart = useCallback(() => {
    console.log(" usePlaylist restart!!!");
    setShouldPlay(false);
    setShouldVolUp(false);

    if (howlsRef.current) {
      if (howlsRef.current[currTrack.index]) {
        // howlsRef.current[currTrack.index].stop();
        // Howler.stop();
      }

      initCurrTrack({ howls: howlsRef.current, setCurrTrack, defaultVol });
      // setCurrTrack(() => {
      //   return { index: 0, loadStatus: getStateAsHowl(howlsRef.current, 0) };
      // });
    }
  }, [currTrack.index, defaultVol]);

  const shuffle = useCallback(
    (shuffledIndices = null) => {
      if (!shuffledIndices) {
        shuffledIndices = createRandomIndices(filesListRef.current.length);
        //shuffle regularly - for the music - create your own...
      }
      // stop music if playing
      if (!howlsRef.current) return;
      howlsRef.current.forEach((howl) => {
        if (howl) howl.stop();
      });

      setCurTrackStopped(setCurrTrack);

      shuffleByIndices({ array: filesListRef.current, shuffledIndices });
      shuffleByIndices({ array: howlsRef.current, shuffledIndices });

      setHowlsShuffledNow(true);

      loadCurrWindow({
        howls: howlsRef.current,
        currentIndex: 0,
        setCurrTrack,
      });

      initCurrTrack({ howls: howlsRef.current, setCurrTrack, defaultVol });
      // restart();
      // if (shouldPlay) play();
      //restart if should play?? - set index to zero
    },
    [defaultVol]
  );

  const shuffleByIndices = ({ array, shuffledIndices }) => {
    if (!array || !shuffledIndices) return [];
    if (shuffledIndices.length !== array.length) {
      console.log("🚀 ~ shuffleByIndices ~ shuffledIndices.length !== array.length");
      console.warn("🚀 ~ shuffleByIndices ~ array.length", array.length);
      console.warn("🚀 ~ shuffleByIndices ~ shuffledIndices.length", shuffledIndices.length);
      return;
    }
    let index = [...shuffledIndices];
    console.log("🚀🚀🚀 ~ shuffleByIndices ~ shuffledIndices", shuffledIndices);
    // Fix all elements one by one
    for (let i = 0; i < array.length; i++) {
      // While index[i] and arr[i] are not fixed
      while (index[i] !== i) {
        // Store values of the target (or correct)
        // position before placing arr[i] there
        let oldTargetI = index[index[i]];
        let oldTargetE = array[index[i]];

        // Place array[i] at its target (or correct)
        // position. Also copy corrected index for
        // new position
        array[index[i]] = array[i];
        index[index[i]] = index[i];

        // Copy old target values to array[i] and
        // index[i]
        index[i] = oldTargetI;
        array[i] = oldTargetE;
      }
    }
  };

  return {
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

    // shuffle,
  };
}
