import { useEffect, useRef, useContext } from "react";
import { IonButton, IonText } from "@ionic/react";
import TextTransition, { presets } from "react-text-transition";

import "./QuotesPlayer.css";
import { TypedController } from "./TypedController";

import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import TypingQuote from "./TypingQuote";
import { useSelector } from "react-redux";
import { selectStatusTotalTimers, STATUS } from "../timers/timersSlice";

const calculateDurationLetter = ({ text, textDuration }) => {
  return Math.floor((textDuration * 1000) / text.length);
};

const QuoteText = ({ uniqueId = "" }) => {
  const quotesTyperRef = useRef(null);
  const quotesControls = useContext(QuotesPlayerContext);

  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  useEffect(() => {
    if (quotesControls.isPlaying) {
      quotesTyperRef.current.start();
    }
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
    if (quotesControls.endingControls.isPlaying) {
      quotesTyperRef.current.start();
    }
  }, [quotesControls.endingControls.isPlaying]);

  const showTyping =
    statusTotalTimer === STATUS.ENDED ? true : quotesControls.isPaused || quotesControls.isPlaying;

  const quoteText =
    statusTotalTimer === STATUS.ENDED
      ? quotesControls.endingControls.getCurrentTitle()
      : quotesControls.getCurrentTitle();

  const quoteTextDuration =
    statusTotalTimer === STATUS.ENDED
      ? quotesControls.endingControls.getCurrentDuration()
      : quotesControls.getCurrentDuration();

  const durationLetter = calculateDurationLetter({
    text: quoteText,
    textDuration: quoteTextDuration,
  });

  return (
    <div>
      <IonText className={"Quote-Placeholder ion-text-center "}>
        <div style={{ display: showTyping ? null : "none" }}>
          <TypedController
            ref={quotesTyperRef}
            durationLetter={durationLetter}
            uniqueId={uniqueId}
          />
          <TypingQuote uniqueId={uniqueId} quoteText={quoteText} />
        </div>

        <TextTransition
          style={{ display: !showTyping ? null : "none" }}
          text={'"' + quoteText + '"'}
          springConfig={presets.wobbly}
        />
      </IonText>
    </div>
  );
};

export default QuoteText;
//  <div>
//       <IonButton onClick={() => quotesTyperRef.current.toggle()}>toggle</IonButton>
//       <IonText className={"Quote-Placeholder ion-text-center "}>
//         {/* {true ? ( */}
//         {showTyping ? (
//           <>
//             <TypedController
//               ref={quotesTyperRef}
//               durationLetter={durationLetter}
//               uniqueId={uniqueId}
//             />
//             <TypingQuote uniqueId={uniqueId} quoteText={quoteText} />
//           </>
//         ) : (
//           <TextTransition
//             // style={{
//             //   display: !quotesControls.isPaused && !quotesControls.isPlaying ? null : "none",
//             // }}
//             text={'"' + quoteText + '"'}
//             springConfig={presets.wobbly}
//           />
//         )}
//       </IonText>
//     </div>
