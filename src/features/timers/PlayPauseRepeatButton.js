import { IonIcon, IonFab, IonFabButton } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { selectStatusTotalTimers } from "./timersSlice";
import { timersActions, STATUS } from "./timersSlice";
import { quotesPlayerActions } from "../quotesPlayer/quotesPlayerSlice";
import { play, pauseCircle, reloadOutline } from "ionicons/icons";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";
import { useContext, useRef, useEffect } from "react";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { LOAD_STATUS } from "../../hooks/usePlaylist";
import Typed from "typed.js";

export const PlayPauseRepeatButton = ({}) => {
  const dispatch = useDispatch();
  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const musicControls = useContext(MusicPlayerContext);
  const quotesControls = useContext(QuotesPlayerContext);

  const restartMusic = musicControls.restart;
  const restartQuotes = quotesControls.restart;
  const shuffleMusic = musicControls.shuffle;
  const shuffleQuotes = quotesControls.shuffle;

  const quoteTextRef = useRef(null);
  const typed = useRef(null);

  // useEffect(() => {
  //   const duration = quotesControls.getCurrentDuration();
  //   console.log("🚀 ~ PlayPauseRepeatButton ~ duration", duration);
  //   const text = quotesControls.getCurrentTitle();
  //   console.log("🚀 ~ PlayPauseRepeatButton ~ text", text);

  //   const durationLetter = Math.floor((duration * 1000) / text.length);

  //   const options = {
  //     strings: [text],
  //     showCursor: false,
  //     // typeSpeed: 200,
  //     typeSpeed: durationLetter,
  //     // typeSpeed: durationLetter / 2,
  //     // onComplete: function (self) {
  //     //   console.warn("onCmplete " + self);
  //     //   // onComplete();
  //     //   // setStatus(STATUS.ENDED);
  //     // },
  //     // onStart: function (self) {
  //     //   console.warn("onStart " + self);
  //     //   setStatus(STATUS.RUNNING);
  //     // },
  //   };

  //   // elRef refers to the <span> rendered below
  //   typed.current = new Typed(quoteTextRef.current, options);
  //   typed.current.stop();
  //   // if (quoteText) typed.current = new Typed(quoteText, options);

  //   return () => {
  //     // Make sure to destroy Typed instance during cleanup
  //     // to prevent memory leaks
  //     typed.current.destroy();
  //     // if (typed.current) typed.current.destroy();
  //   };
  // }, []);

  return (
    <>
      {/* <div className="type-wrap">
        <span ref={quoteTextRef} />
         <span style={{ whiteSpace: "pre" }} ref={el} /> 
      </div> */}

      <IonFab vertical="center" horizontal="center" slot="fixed">
        <IonFabButton
          color="light"
          onClick={() => {
            if (statusTotalTimer === STATUS.RUNNING) {
              //if playing then pause
              dispatch(timersActions.setStatusTimer(STATUS.PAUSED));
              dispatch(quotesPlayerActions.setIsPlayingMusicAndQuotes(false));
              //statusPlayingQuote
              // dispatch(setIsPlayingMusic(false));
              // dispatch(setIsPlayingQuote(false));
              console.log("paused");
              musicControls.pause();
              quotesControls.pause();
              // typed.current.stop();
              //todo typer pause()
            } else {
              //if it was paused... play it again
              if (statusTotalTimer === "ENDED") {
                dispatch(timersActions.restartTotalTimer());

                restartMusic();
                shuffleMusic();
                restartQuotes();
                shuffleQuotes();
                quotesControls.endingControls.restart(); //stop them
                quotesControls.endingControls.shuffle(); //shuffle them for next time

                dispatch(quotesPlayerActions.restartQuotesAndMusic());
              } else {
                dispatch(timersActions.setStatusTimer(STATUS.RUNNING));
                dispatch(quotesPlayerActions.setIsPlayingMusicAndQuotes(true));

                // dispatch(setIsPlayingMusic(true));
                // dispatch(setIsPlayingQuote(true));
                console.log("play");
                musicControls.play();
                //todo typer play()

                // if (quotesControls.isEnded) return;
                quotesControls.play();
                // typed.current.start();

                // musicControls.volDown();
                // volUp();
              }
            }
          }}
        >
          <IonIcon
            size={"large"}
            color="dark"
            icon={
              statusTotalTimer === STATUS.RUNNING
                ? pauseCircle
                : statusTotalTimer === STATUS.ENDED
                ? reloadOutline
                : play
            }
          />
        </IonFabButton>
      </IonFab>
    </>
  );
};
