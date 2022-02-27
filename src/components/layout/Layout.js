import { IonCol, IonContent, IonRow, IonGrid } from "@ionic/react";
import { ToolBar } from "./ToolBar";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";
import { Timers } from "../../features/timers/Timers";
import { PlayPauseRepeatButton } from "../../features/timers/PlayPauseRepeatButton";
import { useRef } from "react";

const Layout = (props) => {
  const quoteTextRef = useRef(null);

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
