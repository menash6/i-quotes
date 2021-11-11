import { useState, useEffect, useRef } from "react";
import { IonGrid, IonRow, IonCol, IonPopover } from "@ionic/react";
import { Random, Wave } from "react-animated-text";
import TextTransition, { presets } from "react-text-transition";

import { useSelector, useDispatch, Provider } from "react-redux";
import {
  selectEndingQuoteTxt,
  selectEndingQuotePath,
  selectStatusPlayingQuote,
  selectIsAllSpeakers,
  selectStatusMusic,
  selectStatus,
  selectMusicVol,
  selectQuotesFilter,
  selectCurrentQuoteTxt,
  selectCurrentQuotePath,
  selectCurrentMusicPath,
  selectIsPlayingMusic,
} from "./quotesPlayerSlice";

import { selectStatusTotalTimers, STATUS } from "../timers/timersSlice";
import { quotesPlayerActions } from "./quotesPlayerSlice";
import ReactHowler from "react-howler";
import { IntervalPicker } from "../timers/IntervalPicker";

import { IonText } from "@ionic/react";

import "./QuotesPlayer.css";
import { QuoteTyper } from "./QuoteTyper";

const QuotesPlayer = () => {
  const howlRefQuote = useRef(null);
  const howlRefMusic = useRef(null);
  const quotesTyperRef = useRef(null);

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  const status = useSelector(selectStatus);
  const statusMusic = useSelector(selectStatusMusic);
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const musicVol = useSelector(selectMusicVol);
  const currentQuotePath = useSelector(selectCurrentQuotePath);
  const endingQuotePath = useSelector(selectEndingQuotePath);
  const currentQuoteText = useSelector(selectCurrentQuoteTxt);
  const endingQuoteText = useSelector(selectEndingQuoteTxt);
  const statusPlayingQuote = useSelector(selectStatusPlayingQuote);
  const isPlayingMusic = useSelector(selectIsPlayingMusic);
  const currentMusicPath = useSelector(selectCurrentMusicPath);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (statusPlayingQuote === STATUS.RUNNING) {
  //     console.warn("duration is:", howlRefQuote.current.duration());
  //     console.warn("howlRefQuote.current", howlRefQuote.current);
  //     console.warn("howlRefQuote.current.howler", howlRefQuote.current.howler);
  //     // howlRefMusic.current.howler.fade(1, 0, 5000);
  //     // howlRefMusic.current.howler.stereo(1);
  //     howlRefMusic.current.howler.pos(1, 1, 222);
  //     howlRefQuote.current.howler.pos(1, 1, 22);
  //     // howlRefQuote.current.howler.stereo(1);
  //   }
  // }, [statusPlayingQuote]);
  const [quoteDuration, setQuoteDuration] = useState(-1);

  return (
    <>
      {status === "loaded" && statusPlayingQuote !== STATUS.READY && (
        <ReactHowler
          ref={howlRefQuote}
          html5={true}
          src={
            statusTotalTimer === STATUS.ENDED
              ? endingQuotePath
              : currentQuotePath
          }
          playing={statusPlayingQuote === STATUS.RUNNING}
          onEnd={() => {
            dispatch(quotesPlayerActions.setStatusPlayingQuote(STATUS.ENDED));
            console.log({ quotesTyperRef });
          }}
          onPlay={() => {
            // console.warn({ currentQuotePath });
            // console.warn("duration is:", howlRefQuote.current.duration());
            setQuoteDuration(howlRefQuote.current.duration());
          }}
        />
      )}

      {statusMusic === "loaded" && statusPlayingQuote !== STATUS.READY && (
        <ReactHowler
          ref={howlRefMusic}
          volume={musicVol}
          html5={true}
          src={currentMusicPath}
          playing={isPlayingMusic}
          onEnd={() => {
            dispatch(quotesPlayerActions.updateMusicIndex());
          }}
        />
      )}

      <IonText
        className={
          "Quote-Placeholder ion-text-center " +
          (statusPlayingQuote !== STATUS.READY ? " animated-square" : "")
        }
      >
        {statusPlayingQuote === STATUS.RUNNING ||
        statusPlayingQuote === STATUS.PAUSED ? (
          <QuoteTyper
            ref={quotesTyperRef}
            text={
              statusTotalTimer === STATUS.ENDED
                ? endingQuoteText
                : currentQuoteText
            }
            duration={quoteDuration}
          />
        ) : (
          <TextTransition
            text={
              statusTotalTimer === STATUS.ENDED
                ? endingQuoteText
                : currentQuoteText
            }
            springConfig={presets.wobbly}
          />
        )}
      </IonText>

      {/* <IonText
              onClick={(e) => {
                e.persist();
                setShowPopover({ showPopover: true, event: e });
              }}
              className="Quote-Placeholder ion-text-center "
            >
              {statusTotalTimer === STATUS.ENDED
                ? endingQuoteText
                : currentQuoteText}
              "
            </IonText> */}

      <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }
      >
        <IntervalPicker />
      </IonPopover>
    </>
  );
};

export default QuotesPlayer;
