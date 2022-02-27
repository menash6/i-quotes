import React, { createContext, useEffect, useState } from "react";
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
  currCategory: "",
  currCategoryName: "All",
  setCategory: () => {},
  allMusicCategories: [],
});

const defaultVol = 0.1;

const createCategoriesMap = (allCategories) => {
  const map = {};
  map[""] = "All";
  for (const category of allCategories) {
    map[category._id] = category.name;
  }
  return map;
};

const setThemeByCategory = (categoryName) => {
  switch (categoryName) {
    case "Morning":
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
      document.body.classList.add("morning");
      return;
    case "Focus":
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
      document.body.classList.add("focus");
      return;
    case "Workout":
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
      document.body.classList.add("workout");
      return;
    case "Night":
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
      document.body.classList.add("night");
      return;
    case "Mindfulness":
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
      document.body.classList.add("mindfulness");
      return;

    default:
      document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");

      break;
  }
};

const MusicPlayerProvider = ({ filesList, children, musicCategories }) => {
  const [currCategory, setCurrCategory] = useState("");

  const allMusicCategories = musicCategories;
  const musicCategoriesMap = createCategoriesMap(allMusicCategories);

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

  const setCategory = (id) => {
    setCurrCategory(id);
    setThemeByCategory(musicCategoriesMap[id]);
  };

  const musicContextValue = {
    ...musicControls,
    allMusicCategories,
    currCategory,
    setCategory,
    currCategoryName: musicCategoriesMap[currCategory],
  };

  return (
    <MusicPlayerContext.Provider value={musicContextValue}>{children}</MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
