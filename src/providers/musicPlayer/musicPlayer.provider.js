import React, { createContext, useEffect, useState } from "react";
import usePlaylist from "../../hooks/usePlaylist";
import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";
import { musicUrl } from "./../../axiosInstance/constants";
import { categoryStyles } from "./../../theme/constants";

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
  setCategoryByName: () => {},
  allMusicCategories: [],
  controlledSwiper: null,
  setControlledSwiper: () => {},
  getSlideId: () => {},
  getCategoryStyleByName: () => {},
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

//todo set theme like i - value
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
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const allMusicCategories = musicCategories;
  const musicCategoriesMap = createCategoriesMap(allMusicCategories);

  const musicControls = usePlaylist({
    baseUrl: musicUrl,
    filesList,
    defaultVol,
  });
  const shuffleMusic = musicControls.shuffle;

  useEffect(() => {
    shuffleMusic();
  }, [filesList, shuffleMusic]);

  const setCategory = (id) => {
    setCurrCategory((prev) => {
      if (prev !== id) {
        musicControls.filterByCategoryId(id);
      }
      return id;
    });
    setThemeByCategory(musicCategoriesMap[id]);
  };

  function getCategoryId(map, value) {
    return Object.keys(map).find((key) => map[key] === value);
  }

  const setCategoryByName = (name) => {
    const categoryId = getCategoryId(musicCategoriesMap, name);
    setCategory(categoryId);
  };

  const getSlideId = (currCategory) => {
    const categoryName = musicCategoriesMap[currCategory];
    switch (categoryName) {
      // case "All":
      //   return 0;
      case "Morning":
        return 1;
      case "Focus":
        return 2;
      case "Workout":
        return 3;
      case "Night":
        return 4;
      case "Mindfulness":
        return 5;

      default:
        return 0;
    }
  };

  const getCategoryStyleByName = (categoryName) => {
    return categoryStyles[categoryName];
  };

  const musicContextValue = {
    ...musicControls,
    allMusicCategories,
    currCategory,
    setCategory,
    setCategoryByName,
    currCategoryName: musicCategoriesMap[currCategory],
    setControlledSwiper,
    controlledSwiper,
    getSlideId,
    getCategoryStyleByName,
  };

  return (
    <MusicPlayerContext.Provider value={musicContextValue}>{children}</MusicPlayerContext.Provider>
  );
};

export default MusicPlayerProvider;
