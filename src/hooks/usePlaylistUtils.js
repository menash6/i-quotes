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

export const destroyList = (tracks) => {
  if (!tracks) return;
  tracks.forEach((track, index) => {
    if (track) {
      destroyHowler(track.howl);
      tracks[index] = null;
    }
  });
  // console.log("destroyList", { tracks });
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

export const loadCurrWindow = ({ tracks, currentIndex, setCurrTrack }) => {
  if (tracks[currentIndex].howl && tracks[currentIndex].howl.state() === "unloaded") {
    tracks[currentIndex].howl.load();
    //update State based on current howl
    setCurrTrackByHowl({ tracks, setCurrTrack });
    //update load status after loading
    tracks[currentIndex].howl.once("load", () => {
      setCurTrackLoaded(setCurrTrack);
      // if (shouldPlay) currTrackCheckPlayAndUpdate({ howl: tracks[currentIndex], setCurrTrack });
    });
  }
  loadSrc(tracks[getNextIndex(currentIndex, tracks.length)].howl);
  loadSrc(tracks[getPrevIndex(currentIndex, tracks.length)].howl);
};

export const setCurrTrackByHowl = ({ tracks, setCurrTrack }) => {
  setCurrTrack((prevState) => {
    return {
      ...prevState,
      loadStatus: getStateAsHowl(tracks, prevState.index),
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

export const createHowl = ({
  file,
  defaultVol,
  onEndHandler,
  length,
  onVolHandler,
  baseUrl = "",
}) => {
  const newHowl = new Howl({
    src: baseUrl ? `${baseUrl}/${file.url}` : file.url,
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
    onplay: () => console.warn(file.title, " onPlay"),
    onvolume: () => {
      console.warn(file.title, " onvolume");
      onVolHandler();
    },
  });
  return newHowl;
};

export const initList = ({ filesList, onEndHandler, defaultVol, onVolHandler, baseUrl = "" }) => {
  if (!filesList || filesList === []) return null;
  console.log("😍😍😍😍😍😍initList", { filesList });
  const newHowls = filesList.map((file) => {
    return {
      howl: createHowl({
        baseUrl,
        file,
        defaultVol,
        onEndHandler,
        onVolHandler,
        length: filesList.length,
      }),
      title: file.title,
      categories: file?.categories,
    };
  });
  console.log({ newHowls });
  return newHowls;
};

export const getStateAsHowl = (tracks, index) => {
  // console.log({ getStateAsHowl });
  // console.log({ tracks });
  // console.log("~ index", index);
  if (tracks && tracks[index].howl) {
    if (tracks[index].howl.state() === "loaded") return LOAD_STATUS.LOADED;
    if (tracks[index].howl.state() === "loading") return LOAD_STATUS.LOADING;
    if (tracks[index].howl.state() === "unloaded") return LOAD_STATUS.UNLOADED;
  }
  return LOAD_STATUS.UNLOADED;
};

export const initCurrTrack = ({ tracks, setCurrTrack, defaultVol }) => {
  setCurrTrack(() => {
    return {
      isPlaying: false,
      isPaused: false,
      // isEnded: true, //!update!
      isEnded: false, //!update!
      isStopped: false,
      index: 0,

      loadStatus: getStateAsHowl(tracks, 0),
      // volume: tracks[0].volume(),
      volume: defaultVol,
    };
  });
};

export const shuffleByIndices = ({ array, shuffledIndices }) => {
  if (!array || !shuffledIndices) return [];
  if (shuffledIndices.length !== array.length) {
    return;
  }
  let index = [...shuffledIndices];
  // Fix all elements one by one
  for (let i = 0; i < array.length; i++) {
    // While index[i] and arr[i] are not fixed
    while (index[i] !== i) {
      let oldTargetI = index[index[i]];
      let oldTargetE = array[index[i]];

      array[index[i]] = array[i];
      index[index[i]] = index[i];

      index[i] = oldTargetI;
      array[i] = oldTargetE;
    }
  }
};
