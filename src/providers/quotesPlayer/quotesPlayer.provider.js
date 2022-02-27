import React, { createContext, useEffect, useMemo, useCallback, useRef } from "react";
import usePlaylist from "../../hooks/usePlaylist";
import { LOAD_STATUS, createRandomIndices } from "../../hooks/usePlaylistUtils";

// import { useSelector } from "react-redux";
// import {
//   selectEndingQuotesOnePlaylist,
//   selectFilteredQuotesPlaylists,
// } from "../../features/quotesPlayer/quotesPlayerSlice";
import { recordingsUrl } from "../../axiosInstance/constants";

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
  const shuffledIndices = indicesToShuffle.sort((a, b) => Math.random() - 0.5);
  return shuffledIndices;
};

const QuotesPlayerProvider = ({ children, recordingsLists }) => {
  console.log("~ recordingsLists", recordingsLists);
  // const filteredQuotesPlaylists = useSelector(selectFilteredQuotesPlaylists);
  // const endingQuotesOnePlaylist = useSelector(selectEndingQuotesOnePlaylist);

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
    filesList: recordingsLists.endingRecordings,
    baseUrl: recordingsUrl,

    // filesList: endingQuotesOnePlaylist,
    autoPlay: false,
  });

  const amQuotesControls = usePlaylist({
    filesList: recordingsLists.amRecordings,
    baseUrl: recordingsUrl,
    // filesList: filteredQuotesPlaylists[0],
    autoPlay: false,
  });
  const slQuotesControls = usePlaylist({
    filesList: recordingsLists.slRecordings,
    baseUrl: recordingsUrl,

    // filesList: filteredQuotesPlaylists[1],
    autoPlay: false,
  });
  const ldQuotesControls = usePlaylist({
    filesList: recordingsLists.ldRecordings,
    baseUrl: recordingsUrl,

    // filesList: filteredQuotesPlaylists[2],
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
    const shuffledIndices = createRandomIndices(recordingsLists.amRecordings.length);
    // const shuffledIndices = createRandomIndices(filteredQuotesPlaylists[0].length);
    console.log("🚀 ~ shuffle ~ shuffledIndices", shuffledIndices);

    // allQuotesControlsArray.forEach((playlist) => playlist.shuffle(shuffledIndices));
    // allQuotesControlsArray.forEach((playlist) => playlist.shuffle(shuffledIndices));

    amShuffle(shuffledIndices);
    slShuffle(shuffledIndices);
    ldShuffle(shuffledIndices);
  }, [recordingsLists.amRecordings.length, amShuffle, slShuffle, ldShuffle]);

  useEffect(() => {
    shuffle();
    console.log("🚀 ~ useEffect ~filteredQuotesPlaylists shuffle()");
  }, [shuffle]);

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

  return (
    <QuotesPlayerContext.Provider value={allSpeakersQuotesControls}>
      {children}
    </QuotesPlayerContext.Provider>
  );
};

export default React.memo(QuotesPlayerProvider);
