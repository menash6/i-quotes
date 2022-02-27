import { useEffect, useRef, useContext } from "react";
import { IonText } from "@ionic/react";

import TextTransition, { presets } from "react-text-transition";

import { useSelector } from "react-redux";

import { selectStatusTotalTimers, STATUS } from "../timers/timersSlice";

import "./QuotesPlayer.css";
import { QuoteTyper } from "./QuoteTyper";

import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

const QuotesPlayer = ({ ref }) => {
  const quotesTyperRef = useRef(null);

  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const MusicControls = useContext(MusicPlayerContext);
  const volUp = MusicControls.volUp;
  const quotesControls = useContext(QuotesPlayerContext);

  useEffect(() => {
    if (quotesControls.isEnded) volUp();
  }, [quotesControls.isEnded, volUp]);

  useEffect(() => {
    if (quotesControls.isPlaying) quotesTyperRef.current.start();
    //todo changing back to the same speaker - I want to restart!
  }, [quotesControls.isPlaying]);

  useEffect(() => {
    if (quotesControls.isPaused) {
      quotesTyperRef.current.stop();
    }
  }, [quotesControls.isPaused]);
  useEffect(() => {
    if (quotesControls.isStopped) {
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
            (quotesControls.isStopped ? " animated-square" : "")
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
            (quotesControls.isStopped ? " animated-square" : "")
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
    </>
  );
};

export default QuotesPlayer;
