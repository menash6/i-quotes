import { IonRow } from "@ionic/react";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Typed from "typed.js";
import "./LoadingTimer.css";

export function LoadingTimer() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);
  // Create reference to store the Typed instance itself
  const typed = React.useRef(null);

  React.useEffect(() => {
    const options = {
      strings: [
        " <b>QUOTES TIMER</b>",
        "🎶<strong>Change</strong> the Vibe",
        "🔎<strong>Filter</strong> The Quotes ",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      fadeOut: true,
      fadeOutClass: "typed-fade-out",
      fadeOutDelay: 500,
      loop: true,
      showCursor: false,
      cursorChar: "|",
    };

    // elRef refers to the <span> rendered below
    typed.current = new Typed(el.current, options);

    return () => {
      // Make sure to destroy Typed instance during cleanup
      // to prevent memory leaks
      typed.current.destroy();
    };
  }, []);

  return (
    <IonRow className="ion-justify-content-center ion-align-items-center ion-nowrap Full-Page">
      <CountdownCircleTimer
        strokeWidth={10} //make it wider for less circles to fill the space
        isPlaying={true}
        duration={5}
        initialRemainingTime={5}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        size={300}
        onComplete={() => {
          return [true, 200];
        }}
      >
        <CountdownCircleTimer
          strokeWidth={10} //make it wider for less circles to fill the space
          isPlaying={true}
          duration={5}
          initialRemainingTime={5}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          size={230}
          onComplete={() => {
            return [true, 200];
          }}
        >
          <div className="type-wrap Quote-Placeholder">
            <span ref={el} />
          </div>
        </CountdownCircleTimer>
      </CountdownCircleTimer>
    </IonRow>
  );
}
