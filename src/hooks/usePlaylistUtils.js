import { Howl } from "howler";

export const FADE_DURATION = 3000;

export const LOAD_STATUS = {
  UNLOADED: "UNLOADED",
  LOADING: "LOADING",
  LOADED: "LOADED",
};
Object.freeze(LOAD_STATUS);

export const createRandomIndices = (length) => {
  const shuffledIndices = [...Array(length).keys()];
  return shuffledIndices.sort((a, b) => Math.random() - 0.5);
};

export const destroyHowler = (howl) => {
  if (howl) {
    // console.log({ destroyHowler });
    howl.off(); // Remove event listener
    howl.stop(); // Stop playback
    howl.unload(); // Remove sound from pool
    howl = null; // Destroy it
  }
};

export const getNextIndex = (index, length) => {
  console.log({ nextIndex: getNextIndex }, { index }, { length });
  return (index + 1) % length;
};
export const getPrevIndex = (index, length) => {
  return index === 0 ? length - 1 : index - 1;
};

export const destroyList = (howls) => {
  if (!howls) return;
  howls.forEach((howl, index) => {
    if (howl) {
      destroyHowler(howl);
      howls[index] = null;
    }
  });
  // console.log("destroyList", { howls });
};

export const setCurTrackLoaded = (setCurrTrack) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      loadStatus: LOAD_STATUS.LOADED,
    };
  });
};

export const loadSrc = (howl) => {
  if (howl && howl.state() === "unloaded") {
    howl.load();
  }
};

export const loadCurrWindow = ({ howls, currentIndex, setCurrTrack }) => {
  console.log("🚀 ~ loadCurrWindow ~ currentIndex", currentIndex);
  console.log("🚀 ~ loadCurrWindow ~ howls", howls);

  if (howls[currentIndex] && howls[currentIndex].state() === "unloaded") {
    howls[currentIndex].load();
    //update State based on current howl
    setCurrTrackByHowl({ howls, setCurrTrack });
    //update load status after loading
    howls[currentIndex].once("load", () => {
      setCurTrackLoaded(setCurrTrack);
      // if (shouldPlay) currTrackCheckPlayAndUpdate({ howl: howls[currentIndex], setCurrTrack });
    });
  }
  loadSrc(howls[getNextIndex(currentIndex, howls.length)]);
  loadSrc(howls[getPrevIndex(currentIndex, howls.length)]);
};

export const setCurrTrackByHowl = ({ howls, setCurrTrack }) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      loadStatus: getStateAsHowl(howls, prevState.index),
    };
  });
};

export const setCurTrackPlaying = (setCurrTrack) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      loadStatus: LOAD_STATUS.LOADED,
      isPlaying: true,
      isPaused: false,
      isEnded: false,
      isStopped: false,
    };
  });
};
export const setCurTrackEnded = (setCurrTrack) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      isPlaying: false,
      isPaused: false,
      isEnded: true,
      isStopped: false,
    };
  });
};
export const setCurTrackStopped = (setCurrTrack) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      isPlaying: false,
      isPaused: false,
      isEnded: false,
      isStopped: true,
    };
  });
};

export const currTrackLoadAndPlay = ({ howl, setCurrTrack }) => {
  if (!howl) return;
  howl.load();
  howl.once("load", () => {
    setCurTrackLoaded(setCurrTrack);
    currTrackCheckPlayAndUpdate({ howl, setCurrTrack });
  });
};

export const currTrackCheckPlayAndUpdate = ({ howl, setCurrTrack, shouldVolUp }) => {
  console.log("🚀🚀🚀 ~ currTrackCheckPlayAndUpdate ~ shouldVolUp", shouldVolUp);
  if (!howl) return;

  //if not playing
  //update volume - jsut before it plays
  if (shouldVolUp) {
    console.log("🚀 ~ currTrackCheckPlayAndUpdate ~ shouldVolUp", shouldVolUp);
    howl.volume(1);
  }
  setCurrTrack((prevState) => {
    return { ...prevState, volume: howl.volume() };
  });

  if (howl.playing()) {
    setCurTrackPlaying(setCurrTrack);
    return;
  }
  howl.play();
  howl.once("play", () => setCurTrackPlaying(setCurrTrack));
};

export const createHowl = ({ file, defaultVol, onEndHandler, length, onPlay, onVolHandler }) => {
  const newHowl = new Howl({
    src: file.url,
    volume: defaultVol,
    preload: false,
    html5: true,
    onload: () => {
      console.warn(file.title, " was loaded NOW!!");
    },
    onend: () => {
      console.warn(file.title, " onEndHandler");
      onEndHandler(length);
    },
    onplay: () => {
      console.warn(file.title, " onPlay");
      if (onPlay) onPlay();
      console.log("🚀 ~ createHowl ~ onPlay", onPlay);
    },
    onvolume: () => {
      console.warn(file.title, " onvolume");
      onVolHandler();
    },
  });
  return newHowl;
};

export const initList = ({ filesList, onEndHandler, defaultVol, onPlay, onVolHandler }) => {
  if (!filesList || filesList === []) return null;
  console.log("initList", { filesList });
  const newHowls = filesList.map((file) =>
    createHowl({
      file,
      defaultVol,
      onEndHandler,
      onVolHandler,
      length: filesList.length,
      onPlay,
    })
  );
  console.log({ newHowls });
  return newHowls;
};

export const getStateAsHowl = (howls, index) => {
  console.log({ getStateAsHowl });
  console.log({ howls });
  if (howls && howls[index]) {
    if (howls[index].state() === "loaded") return LOAD_STATUS.LOADED;
    if (howls[index].state() === "loading") return LOAD_STATUS.LOADING;
    if (howls[index].state() === "unloaded") return LOAD_STATUS.UNLOADED;
  }
  return LOAD_STATUS.UNLOADED;
};

export const initCurrTrack = ({ howls, setCurrTrack, defaultVol }) => {
  setCurrTrack(() => {
    return {
      isPlaying: false,
      isPaused: false,
      // isEnded: true, //!update!
      isEnded: false, //!update!
      isStopped: false,
      index: 0,

      loadStatus: getStateAsHowl(howls, 0),
      // volume: howls[0].volume(),
      volume: defaultVol,
    };
  });
};
