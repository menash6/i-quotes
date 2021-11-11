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

// const shuffleList = (filesList) => {
//   console.log("🚀 ~ shuffleList ~ filesList", filesList);
//   if (!filesList) return [];
//   filesList.sort(() => Math.random() - 0.5);

//   // for (let i = filesList.length - 1; i > 0; i--) {
//   //   const j = Math.floor(Math.random() * (i + 1));
//   //   [filesList[i], filesList[j]] = [filesList[j], filesList[i]];
//   // }
// };

const MusicPlayerProvider = ({ children }) => {
  //   const filesList = useSelector(selectAllMusicPlaylist);
  const filesList = useSelector(selectFilteredMusicPlaylist);
  // const filesListToShuffle = [...filesList];

  // shuffleList(filesListToShuffle);
  // const [shuffleKey, setShuffleKey] = useState(Math.random());
  // const [shuffledIndices, setShuffledIndices] = useState(getShuffledIndices(filesList.length));

  // const shuffledIndicesRef = useRef(getShuffledIndices(filesList.length));

  console.log({ filesList });
  //   const { getStatus, next, prev, pause, play, currentIndex, currentTitle } =
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
