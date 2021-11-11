import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useSelector } from "react-redux";
import usePlaylist from "../../hooks/usePlaylist";
import { LOAD_STATUS, createRandomIndices } from "../../hooks/usePlaylistUtils";

// import {
//   selectAllMusicPlaylist,
//   selectFilteredMusicPlaylist,
// } from "../../features/musicPlayer/musicPlayerSlice";
import {
  selectEndingQuotesOnePlaylist,
  selectFilteredQuotesPlaylists,
  selectQuotesFilter,
} from "../../features/quotesPlayer/quotesPlayerSlice";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

export const ALL_SPEAKERS = -1;

export const QuotesPlayerContext = createContext({
  getCurrentIndex: () => {},
  getCurrentTitle: () => {},
  getCurrentDuration: () => {},
  play: () => {},
  pause: () => {},
  // next: () => {},
  // prev: () => {},
  nextAndPlay: () => {},
  restart: () => {},
  shuffle: () => {},
  currLoadStatus: LOAD_STATUS.UNLOADED,
  isPlaying: false,
  isPaused: false,
  isEnded: false,
  isStopped: false,
  // setSpeaker: () => {},
  // speakerSelection: 0,

  changeSpeakerMode: () => {},
  // setSpeakerMode: () => {},
  // speakerMode: ALL_SPEAKERS,
  amControls: null,
  slControls: null,
  ldControls: null,

  endingControls: null,
});

const randomMoveForwardCount = (length) => Math.floor(Math.random() * (length - 1)) + 1;
const randomIndex = (length) => Math.floor(Math.random() * length); //random between 0 to length
const getNextRandomSpeaker = (speaker, length) => {
  return (speaker + randomMoveForwardCount(length)) % length;
};

export const getShuffledIndices = (length) => {
  const indicesToShuffle = [...Array(length).keys()];
  console.log("🚀 ~ getShuffledIndices ~ indicesToShuffle", indicesToShuffle);
  const shuffledIndices = indicesToShuffle.sort((a, b) => Math.random() - 0.5);
  console.log("🚀 ~ getShuffledIndices ~ shuffledIndices", shuffledIndices);
  return shuffledIndices;
};

const QuotesPlayerProvider = ({ children }) => {
  // const musicControls = useContext(MusicPlayerContext);

  const filteredQuotesPlaylists = useSelector(selectFilteredQuotesPlaylists);
  const endingQuotesOnePlaylist = useSelector(selectEndingQuotesOnePlaylist);

  console.log("🚀 ~ QuotesPlayerProvider ~ filteredQuotesPlaylists", filteredQuotesPlaylists);

  //todo- create REMEMBER IF IT ENDED - SO I DONT START AGAIN WHEN CHANGING A SPEAKER OR PROGRAM

  // const [shouldPlay, setShouldPlay] = useState(false);
  // const [speakerMode, setSpeakerMode] = useState(ALL_SPEAKERS);
  // console.log("🚀 ~ QuotesPlayerProvider ~ speakerMode", speakerMode);

  // const [shuffleKey, setShuffleKey] = useState(Math.random());

  // console.log(
  //   "🚀 ~ QuotesPlayerProvider ~ filteredQuotesPlaylists[0].length",
  //   filteredQuotesPlaylists[0].length
  // );

  const currSpeaker = useRef(0); // ? first speaker - maybe update to random?
  const isAllSpeakers = useRef(true);

  const endingQuotesControls = usePlaylist({
    filesList: endingQuotesOnePlaylist,
    autoPlay: false,
  });

  const amQuotesControls = usePlaylist({
    filesList: filteredQuotesPlaylists[0],
    autoPlay: false,
  });
  const slQuotesControls = usePlaylist({
    filesList: filteredQuotesPlaylists[1],
    autoPlay: false,
  });
  const ldQuotesControls = usePlaylist({
    filesList: filteredQuotesPlaylists[2],
    autoPlay: false,
  });

  const amShuffle = amQuotesControls.shuffle;
  const slShuffle = slQuotesControls.shuffle;
  const ldShuffle = ldQuotesControls.shuffle;

  const allQuotesControlsArray = useMemo(() => {
    return [amQuotesControls, slQuotesControls, ldQuotesControls];
  }, [amQuotesControls, slQuotesControls, ldQuotesControls]);

  const changeSpeakerMode = useCallback(
    (newSpeakerMode) => {
      console.log("🚀 ~ QuotesPlayerProvider ~ newSpeakerMode", newSpeakerMode);
      console.log("🚀 ~ QuotesPlayerProvider ~ currSpeaker.current", currSpeaker.current);
      console.log("🚀 ~ QuotesPlayerProvider ~ currSpeaker", currSpeaker);

      const isPaused = allQuotesControlsArray[currSpeaker.current].isPaused;

      if (!allQuotesControlsArray[currSpeaker.current].isPlaying && !isPaused) {
        if (newSpeakerMode !== ALL_SPEAKERS) {
          isAllSpeakers.current = false;
          currSpeaker.current = newSpeakerMode;
        }
        return;
      }

      // allQuotesControlsArray[currSpeaker].stop();
      allQuotesControlsArray[currSpeaker.current].stop();
      // allQuotesControlsArray.forEach((playlist) => playlist.stop());

      if (newSpeakerMode === ALL_SPEAKERS) {
        isAllSpeakers.current = true;
        currSpeaker.current = getNextRandomSpeaker(
          currSpeaker.current,
          allQuotesControlsArray.length
        );
      } else {
        isAllSpeakers.current = false;

        currSpeaker.current = newSpeakerMode;
      }
      if (!isPaused) allQuotesControlsArray[currSpeaker.current].play();
    },
    [allQuotesControlsArray]
  );

  const nextAndPlay = useCallback(() => {
    if (isAllSpeakers.current) {
      const randomSpeaker = randomIndex(allQuotesControlsArray.length);
      // setCurrSpeaker((prevState) => getNextRandomSpeaker(prevState, allQuotesControlsArray.length));
      currSpeaker.current = randomSpeaker;
      // setCurrSpeaker(randomSpeaker);
      // setCurrSpeaker(nextRandomSpeaker);
      // nextSpeaker = randomSpeaker;
    }
    for (let speaker = 0; speaker < allQuotesControlsArray.length; speaker++) {
      if (speaker === currSpeaker.current) allQuotesControlsArray[speaker].nextAndPlay();
      else allQuotesControlsArray[speaker].next();
    }
  }, [allQuotesControlsArray]);

  const getCurrentIndex = useCallback(
    () => allQuotesControlsArray[currSpeaker.current].getCurrentIndex(),
    [allQuotesControlsArray]
  );
  const getCurrentTitle = useCallback(
    () => allQuotesControlsArray[currSpeaker.current].getCurrentTitle(),
    [allQuotesControlsArray]
  );
  const getCurrentDuration = useCallback(
    () => allQuotesControlsArray[currSpeaker.current].getCurrentDuration(),
    [allQuotesControlsArray]
  );
  const play = useCallback(() => {
    if (allQuotesControlsArray[currSpeaker.current].isEnded) {
      console.log(
        "🚀 ~ play ~ allQuotesControlsArray[currSpeaker.current].isEnded",
        allQuotesControlsArray[currSpeaker.current].isEnded
      );
      return;
    }

    allQuotesControlsArray[currSpeaker.current].play();
  }, [allQuotesControlsArray]);
  const pause = useCallback(() => {
    allQuotesControlsArray[currSpeaker.current].pause();
  }, [allQuotesControlsArray]);

  const restart = useCallback(() => {
    allQuotesControlsArray.forEach((playlist) => playlist.restart());
  }, [allQuotesControlsArray]);

  const shuffle = useCallback(() => {
    //create random indices and shuffle all playlists
    const shuffledIndices = createRandomIndices(filteredQuotesPlaylists[0].length);
    console.log("🚀 ~ shuffle ~ shuffledIndices", shuffledIndices);

    // allQuotesControlsArray.forEach((playlist) => playlist.shuffle(shuffledIndices));
    // allQuotesControlsArray.forEach((playlist) => playlist.shuffle(shuffledIndices));

    amShuffle(shuffledIndices);
    slShuffle(shuffledIndices);
    ldShuffle(shuffledIndices);
  }, [amShuffle, slShuffle, ldShuffle, filteredQuotesPlaylists]);

  useEffect(() => {
    shuffle();
    console.log("🚀 ~ useEffect ~filteredQuotesPlaylists shuffle()");
  }, [filteredQuotesPlaylists, shuffle]);

  const allSpeakersQuotesControls = useMemo(() => {
    return {
      shuffle,
      getCurrentIndex,
      getCurrentTitle,
      getCurrentDuration,
      play,
      pause,
      nextAndPlay,
      restart,
      currLoadStatus: allQuotesControlsArray[currSpeaker.current].currLoadStatus,
      isPlaying: allQuotesControlsArray[currSpeaker.current].isPlaying,
      isPaused: allQuotesControlsArray[currSpeaker.current].isPaused,
      isStopped: allQuotesControlsArray[currSpeaker.current].isStopped,
      isEnded: allQuotesControlsArray[currSpeaker.current].isEnded, //todo at least one of them ended
      // speakerMode,
      changeSpeakerMode,
      // setSpeakerMode,
      // speakerSelection: getSpeakerSelection(),
      // setSpeaker,
      amControls: amQuotesControls,
      slControls: slQuotesControls,
      ldControls: ldQuotesControls,
      endingControls: endingQuotesControls,
    };
  }, [
    allQuotesControlsArray,
    amQuotesControls,
    changeSpeakerMode,
    endingQuotesControls,
    getCurrentDuration,
    getCurrentIndex,
    getCurrentTitle,
    ldQuotesControls,
    nextAndPlay,
    pause,
    play,
    restart,
    shuffle,
    slQuotesControls,
  ]);

  // useEffect(() => {
  //   if (allQuotesControlsArray[currSpeaker.current].isEnded) {
  //     console.log(
  //       "🚀 ~ useEffect ~ allQuotesControlsArray[currSpeaker.current].isEnded",
  //       allQuotesControlsArray[currSpeaker.current].isEnded
  //     );
  //     musicControls.volUp();
  //   }
  // }, [allQuotesControlsArray, musicControls]);

  // useEffect(() => {
  //   if (isAllSpeakers) {
  //     //change to a DIFFERENT speaker randomly!
  //   }
  // }, [isAllSpeakers, currSpeaker]);

  // useEffect(() => {
  //   console.log("🚀 ~ useEffect ~ currSpeaker", currSpeaker);

  //   if (allspeakersQuotesControls.isEnded) {
  //   }

  //   if (allQuotesControlsArray[prevSpeaker].isEnded) {
  //     //stop the current - mark it ended
  //     allQuotesControlsArray[currSpeaker].stop();
  //     //create a toast???
  //     return;

  //     allQuotesControlsArray[prevSpeaker].stop();
  //     allQuotesControlsArray[currSpeaker].play();
  //   }
  //   // if (allspeakersQuotesControls.isPlaying) {
  //   //   allQuotesControlsArray.forEach((playlist) => playlist.stop());
  //   //   allQuotesControlsArray[currSpeaker].play();
  //   // }
  // }, [allQuotesControlsArray, currSpeaker]);

  // useEffect(() => {
  //   if (currSpeaker !== prevSpeaker) {
  //     console.log("🚀 ~ useEffect ~ prevSpeaker", prevSpeaker);
  //     console.log("🚀 ~ useEffect ~ currSpeaker", currSpeaker);
  //     if (allQuotesControlsArray[prevSpeaker].isEnded) {
  //       //stop the current - mark it ended
  //       allQuotesControlsArray[currSpeaker].stop();
  //       //create a toast???
  //       return;
  //     }
  //     allQuotesControlsArray[prevSpeaker].stop();
  //     allQuotesControlsArray[currSpeaker].play();
  //   }
  //   // if (allspeakersQuotesControls.isPlaying) {
  //   //   allQuotesControlsArray.forEach((playlist) => playlist.stop());
  //   //   allQuotesControlsArray[currSpeaker].play();
  //   // }
  // }, [allQuotesControlsArray, currSpeaker, prevSpeaker]);

  // const allspeakersQuotesControls = useMemo(() => {
  //   return {
  //     getCurrentIndex: () => allQuotesControlsArray[currSpeaker].getCurrentIndex(),
  //     getCurrentTitle: () => allQuotesControlsArray[currSpeaker].getCurrentTitle(),
  //     getCurrentDuration: () => allQuotesControlsArray[currSpeaker].getCurrentDuration(),
  //     play: () => {
  //       allQuotesControlsArray[currSpeaker].play();
  //     },
  //     pause: () => allQuotesControlsArray[currSpeaker].pause(),
  //     // next: () => {
  //     //   for (let speaker = 0; speaker < allQuotesControlsArray.length; speaker++) {
  //     //     if (speaker === currSpeaker) allQuotesControlsArray[speaker].nextAndPlay();
  //     //     else allQuotesControlsArray[speaker].next();
  //     //   }
  //     // },
  //     // prev: () => {},
  //     nextAndPlay: () => {
  //       for (let speaker = 0; speaker < allQuotesControlsArray.length; speaker++) {
  //         if (speaker === currSpeaker) allQuotesControlsArray[speaker].nextAndPlay();
  //         else allQuotesControlsArray[speaker].next();
  //       }
  //     },
  //     restart: () => allQuotesControlsArray.forEach((playlist) => playlist.restart()),
  //     currLoadStatus: allQuotesControlsArray[currSpeaker].currLoadStatus,
  //     isPlaying: allQuotesControlsArray[currSpeaker].isPlaying,
  //     isPaused: allQuotesControlsArray[currSpeaker].isPaused,
  //     isEnded: allQuotesControlsArray[currSpeaker].isEnded,
  //   };
  // }, [allQuotesControlsArray, currSpeaker]);

  // const ldQuotesControls = usePlaylist({
  //   filesList: filteredQuotesPlaylists[0],
  //   autoPlay: false,
  // });
  // const ldQuotesControls = usePlaylist({
  //   filesList: filteredQuotesPlaylists[0],
  //   autoPlay: false,
  // });

  //   const { getStatus, next, prev, pause, play, currentIndex, currentTitle } =
  // const amQuotesControls = usePlaylist({
  //   filesList: allSpeakersRecordings[0],
  //   // autoPlay: false,
  //   // onEnd: () => {
  //   //   musicControls.volUp();
  //   // },
  //   // onPlay: () => {
  //   //   musicControls.volDown();
  //   // },
  // });
  // const slQuotesControls = usePlaylist({
  //   filesList: allSpeakersRecordings[1],
  //   autoPlay: false,
  // });

  return (
    <QuotesPlayerContext.Provider value={allSpeakersQuotesControls}>
      {children}
    </QuotesPlayerContext.Provider>
  );
};

export default React.memo(QuotesPlayerProvider);

// export default QuotesPlayerProvider;
// export default QuotesPlayerProvider;
