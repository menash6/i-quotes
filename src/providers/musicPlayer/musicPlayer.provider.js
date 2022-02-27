import React, { createContext, useState, useEffect, useRef } from "react";
import usePlaylist from "../../hooks/usePlaylist";

import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";

import { musicUrl } from "./../../axiosInstance/constants";

export const MusicPlayerContext = createContext({
  getCurrentIndex: () => {},
  getCurrentTitle: () => {},
  getCurrentDuration: () => {},
  play: () => {},
  pause: () => {},
  next: () => {},
  prev: () => {},
  volUp: () => {},
  volDown: () => {},
  nextAndPlay: () => {},
  restart: () => {},
  currLoadStatus: LOAD_STATUS.UNLOADED,
  isPlaying: false,
  isPaused: false,
  isEnded: false,
  isStopped: false,
  volume: false,
  shuffle: () => {},
});

const defaultVol = 0.1;

const MusicPlayerProvider = ({ filesList, children }) => {
  const musicControls = usePlaylist({
    baseUrl: musicUrl,
    filesList,
    defaultVol,
    // shuffledIndices: shuffledIndicesRef.current,
  });
  const shuffleMusic = musicControls.shuffle;

  useEffect(() => {
    shuffleMusic();
  }, [filesList, shuffleMusic]);

  return (
    <MusicPlayerContext.Provider value={musicControls}>{children}</MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
