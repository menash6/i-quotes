import React, { createContext, useState, useEffect, useRef } from "react";
// import usePlaylist, { PLAYLIST_STATUS } from "./../hooks/usePlaylist";
import { useSelector } from "react-redux";
import usePlaylist from "../../hooks/usePlaylist";
import {
  selectAllMusicPlaylist,
  selectFilteredMusicPlaylist,
} from "../../features/musicPlayer/musicPlayerSlice";

import { getShuffledIndices } from "../quotesPlayer/quotesPlayer.provider";
import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";

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

const MusicPlayerProvider = ({ children }) => {
  const filesList = useSelector(selectFilteredMusicPlaylist);

  console.log({ filesList });
  console.log("🚀 ~ MusicPlayerProvider ~ usePlaylist");
  const musicControls = usePlaylist({
    filesList,
    defaultVol,
    // shuffledIndices: shuffledIndicesRef.current,
  });
  const shuffleMusic = musicControls.shuffle;

  useEffect(() => {
    shuffleMusic();
    console.log("🚀👀👀👀 ~useEffect MusicPlayerProvider ~ filesList", filesList);
  }, [filesList, shuffleMusic]);

  // useEffect(() => {
  //   // setShuffledIndices(getShuffledIndices(filesList.length));
  //   // shuffledIndicesRef.current = getShuffledIndices(filesList.length);
  //   shuffleMusic();
  //   console.log("🚀 MusicPlayerProvider~ useEffect ~ filesList.length", filesList.length);
  // }, [filesList, shuffleMusic]);
  //! runs AFTER the render - not enough time for

  return (
    <MusicPlayerContext.Provider value={musicControls}>{children}</MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
