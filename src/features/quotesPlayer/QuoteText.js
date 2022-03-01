import { useEffect, useRef, useContext } from "react";
import { IonText } from "@ionic/react";
import TextTransition, { presets } from "react-text-transition";

import "./QuotesPlayer.css";
import { QuoteTyper } from "./QuoteTyper";

import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

const QuoteText = ({ uniqueId = "" }) => {
  const quotesTyperRef = useRef(null);
  const quotesControls = useContext(QuotesPlayerContext);

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

  const calculateDurationLetter = () => {
    const currDuration = quotesControls.getCurrentDuration();
    const currText = quotesControls.getCurrentTitle();

    return Math.floor((currDuration * 1000) / currText.length);
  };

  return (
    <div>
      <QuoteTyper
        style={{ display: quotesControls.isPlaying || quotesControls.isPaused ? "none" : null }}
        ref={quotesTyperRef}
        durationLetter={calculateDurationLetter()}
        uniqueId={uniqueId}
      />
      <IonText
        className={
          "Quote-Placeholder ion-text-center " +
          (quotesControls.isStopped ? " animated-square" : "")
        }
      >
        <div id={"typed-strings" + uniqueId}>
          <p>{quotesControls.getCurrentTitle()}</p>
        </div>
        <span
          id={"typed" + uniqueId}
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
    </div>
  );
};

export default QuoteText;
