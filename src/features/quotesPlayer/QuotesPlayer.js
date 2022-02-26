import { useState, useEffect, useRef, useContext } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonPopover,
  IonButton,
  IonIcon,
  IonCard,
  IonLabel,
  IonBadge,
  IonCardHeader,
  IonChip,
  IonToolbar,
  IonButtons,
} from "@ionic/react";
import TextTransition, { presets } from "react-text-transition";

import { LOAD_STATUS } from "../../hooks/usePlaylistUtils";

import { useSelector, useDispatch } from "react-redux";
import {
  // selectEndingQuoteTxt,
  // selectEndingQuotePath,
  selectStatusPlayingQuote,
  selectStatus,
  // selectCurrentQuoteTxt,
  // selectCurrentQuotePath,
} from "./quotesPlayerSlice";

import { selectStatusMusic } from "../musicPlayer/musicPlayerSlice";

import { selectStatusTotalTimers, STATUS } from "../timers/timersSlice";
import { quotesPlayerActions, selectDebugMode } from "./quotesPlayerSlice";

import { IonText } from "@ionic/react";

import "./QuotesPlayer.css";
import { QuoteTyper } from "./QuoteTyper";
import Typed from "typed.js";

import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

import PlaylistPlayer from "../../components/PlaylistPlayer";
import { pauseOutline, playOutline } from "ionicons/icons";

const QuotesPlayer = ({ ref }) => {
  const quotesTyperRef = useRef(null);

  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const statusPlayingQuote = useSelector(selectStatusPlayingQuote);
  const dispatch = useDispatch();

  const currDebugMode = useSelector(selectDebugMode);

  // const [quoteDuration, setQuoteDuration] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  // const musicControls = useContext(MusicPlayerContext);
  const MusicControls = useContext(MusicPlayerContext);
  const volUp = MusicControls.volUp;
  const quotesControls = useContext(QuotesPlayerContext);

  // const quotesPlaylistStatus = currentTrackStatus();

  const text =
    statusTotalTimer === STATUS.ENDED
      ? "endingQuoteText"
      : quotesControls.currLoadStatus !== LOAD_STATUS.UNLOADED ||
        quotesControls.currLoadStatus !== LOAD_STATUS.LOADING
      ? "(" +
        quotesControls.getCurrentIndex() +
        ") " +
        quotesControls.getCurrentTitle() +
        "[" +
        quotesControls.getCurrentDuration() +
        "]"
      : "loading...";

  // statusTotalTimer === STATUS.ENDED ? "endingQuoteText" : "currentQuoteText";

  useEffect(() => {
    if (quotesControls.isEnded) volUp();
  }, [quotesControls.isEnded, volUp]);

  useEffect(() => {
    if (quotesControls.isPlaying) quotesTyperRef.current.start();
    //todo changing back to the same speaker - I want to restart!
  }, [quotesControls.isPlaying]);

  useEffect(() => {
    if (quotesControls.isPaused) {
      console.log("🚀 ~ useEffect ~ quotesControls.isPaused", quotesControls.isPaused);

      console.log("🚀 ~ useEffect ~ QuotesTyperRef.current", quotesTyperRef.current);
      quotesTyperRef.current.stop();
    }
  }, [quotesControls.isPaused]);
  useEffect(() => {
    if (quotesControls.isStopped) {
      console.log("🚀 ~ useEffect ~ quotesControls.isPaused", quotesControls.isStopped);

      console.log("🚀 ~ useEffect ~ QuotesTyperRef.current", quotesTyperRef.current);
      quotesTyperRef.current.reset();
    }
  }, [quotesControls.isStopped]);

  useEffect(() => {
    if (quotesControls.endingControls.isPlaying) quotesTyperRef.current.start();
  }, [quotesControls.endingControls.isPlaying]);

  const calculateDurationLetter = () => {
    const currDuration =
      statusTotalTimer === STATUS.ENDED
        ? quotesControls.endingControls.getCurrentDuration()
        : quotesControls.getCurrentDuration();

    const currText =
      statusTotalTimer === STATUS.ENDED
        ? quotesControls.endingControls.getCurrentTitle()
        : quotesControls.getCurrentTitle();

    return Math.floor((currDuration * 1000) / currText.length);
  };

  return (
    <>
      <QuoteTyper
        style={{ display: quotesControls.isPlaying || quotesControls.isPaused ? "none" : null }}
        ref={quotesTyperRef}
        durationLetter={calculateDurationLetter()}
      />

      {statusTotalTimer === STATUS.ENDED ? (
        <IonText
          className={
            "Quote-Placeholder ion-text-center " +
            (statusPlayingQuote !== STATUS.READY ? " animated-square" : "")
          }
        >
          <div id="typed-strings">
            <p>{quotesControls.endingControls.getCurrentTitle()}</p>
          </div>
          <span id="typed"></span>
        </IonText>
      ) : (
        <IonText
          className={
            "Quote-Placeholder ion-text-center " +
            (statusPlayingQuote !== STATUS.READY ? " animated-square" : "")
          }
        >
          <div id="typed-strings">
            <p>{quotesControls.getCurrentTitle()}</p>
          </div>
          <span
            id="typed"
            style={{ display: quotesControls.isPaused || quotesControls.isPlaying ? null : "none" }}
          ></span>
          <TextTransition
            style={{
              display: !quotesControls.isPaused && !quotesControls.isPlaying ? null : "none",
            }}
            text={'"' + quotesControls.getCurrentTitle() + '"'}
            springConfig={presets.wobbly}
          />
        </IonText>
      )}

      {/* {quotesTyperRef.current && (
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() => {
                console.log(
                  "🚀 ~ QuotesPlayer ~ quotesTyperRef.current STOP",
                  quotesTyperRef.current
                );
                quotesTyperRef.current.stop();
              }}
            >
              <IonIcon slot="icon-only" icon={pauseOutline} />
            </IonButton>
            <IonButton
              onClick={() => {
                console.log(
                  "🚀 ~ QuotesPlayer ~ quotesTyperRef.current START",
                  quotesTyperRef.current
                );
                quotesTyperRef.current.start();
              }}
            >
              <IonIcon slot="icon-only" icon={playOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      )} */}

      {currDebugMode && (
        <>
          <IonCard color="medium">
            <IonCardHeader>Music Playlist</IonCardHeader>

            <PlaylistPlayer playlistControls={MusicControls} color={"medium"} />
          </IonCard>
          <IonCard color="dark">
            <IonCardHeader>Quotes Playlists</IonCardHeader>
            <PlaylistPlayer playlistControls={quotesControls.amControls} color={"success"} />
            <PlaylistPlayer playlistControls={quotesControls.slControls} color={"primary"} />
            <PlaylistPlayer playlistControls={quotesControls.ldControls} color={"danger"} />
          </IonCard>
        </>
      )}
    </>
  );
};

export default QuotesPlayer;
