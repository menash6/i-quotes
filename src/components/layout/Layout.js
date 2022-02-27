import { IonCol, IonContent, IonRow, IonGrid } from "@ionic/react";
import { ToolBar } from "./ToolBar";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";
import { Timers } from "../../features/timers/Timers";
import { PlayPauseRepeatButton } from "../../features/timers/PlayPauseRepeatButton";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { selectMusicFilter } from "../../features/musicPlayer/musicPlayerSlice";

const Layout = (props) => {
  const quoteTextRef = useRef(null);

  const currFilter = useSelector(selectMusicFilter);

  if (currFilter === 0) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
    document.body.classList.add("morning");
  }
  if (currFilter === 1) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
    document.body.classList.add("focus");
  }
  if (currFilter === 2) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
    document.body.classList.add("workout");
  }
  if (currFilter === 3) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
    document.body.classList.add("night");
  }
  if (currFilter === 4) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
    document.body.classList.add("mindfulness");
  }
  if (currFilter === -1) {
    document.body.classList.remove("morning", "focus", "workout", "night", "mindfulness");
  }

  return (
    <IonContent id="main">
      <ToolBar />
      <div className="type-wrap">
        <span ref={quoteTextRef} />
      </div>
      <IonGrid className="ion-padding Grid-Fixed-Width" fixed>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>
            <QuotesPlayer />
          </IonCol>
        </IonRow>
        <Timers>
          <PlayPauseRepeatButton quoteText={quoteTextRef.current} />
        </Timers>
      </IonGrid>
    </IonContent>
  );
};

export default Layout;
