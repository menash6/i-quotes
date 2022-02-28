import {
  IonCol,
  IonContent,
  IonRow,
  IonGrid,
  IonPopover,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import { ToolBar } from "./ToolBar";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";
import { Timers } from "../../features/timers/Timers";
import { PlayPauseRepeatButton } from "../../features/timers/PlayPauseRepeatButton";
import { useRef, useState } from "react";

import BottomButtons from "./BottomButtons";
import { IntervalPicker } from "./../../features/timers/IntervalPicker";
import SelectSpeaker from "../SelectSpeaker";
import { SelectMusicFilter } from "./../SelectMusicFilter";

const Layout = (props) => {
  const quoteTextRef = useRef(null);

  // // const [present, dismiss] = useIonPopover(BottomModal, { onHide: () => dismiss() });
  // const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  // // const [popoverState, setShowPopover] = useState({
  // //   showPopover: false,
  // //   component: (
  // //     <BottomModal dismiss={() => setShowPopover({ showPopover: false, event: undefined })} />
  // //   ),
  // // });

  // // const showPopupHandler = (event) => {
  // //   event.persist();
  // //   setShowPopover({
  // //     showPopover: true,
  // //     event,
  // //   });
  // // };

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    component: null,
    event: undefined,
  });
  const showPopupHandler = (event, component) => {
    event.persist();
    setShowPopover({
      showPopover: true,
      event,
      component,
    });
  };

  const showIntervalPicker = (e) => showPopupHandler(e, <IntervalPicker />);
  const showSelectSpeaker = (e) => showPopupHandler(e, <SelectSpeaker />);
  const showMusicFilter = (e) => showPopupHandler(e, <SelectMusicFilter />);

  return (
    <>
      <IonContent id="main">
        <IonPopover
          cssClass="my-custom-class"
          event={popoverState.event}
          isOpen={popoverState.showPopover}
          onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
        >
          {popoverState.component}
        </IonPopover>

        <ToolBar
          showIntervalPicker={showIntervalPicker}
          showSelectSpeaker={showSelectSpeaker}
          showMusicFilter={showMusicFilter}
        />

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
          {/* <BottomModalButton setShowPopover={setShowPopover} /> */}
        </IonGrid>
      </IonContent>
      <IonFooter>
        <BottomButtons
          showIntervalPicker={showIntervalPicker}
          showSelectSpeaker={showSelectSpeaker}
          showMusicFilter={showMusicFilter}
        />
      </IonFooter>
    </>
  );
};

export default Layout;
