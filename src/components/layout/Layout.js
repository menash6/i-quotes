import {
  IonCol,
  IonContent,
  IonRow,
  IonGrid,
  IonFooter,
  IonButton,
  IonIcon,
  IonToolbar,
  IonPopover,
  useIonPopover,
} from "@ionic/react";
import { ToolBar } from "./ToolBar";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";
import { Timers } from "../../features/timers/Timers";
import { PlayPauseRepeatButton } from "../../features/timers/PlayPauseRepeatButton";
import { useRef, useState } from "react";
import { chevronUpOutline } from "ionicons/icons";
import SelectSpeaker from "../SelectSpeaker";
import BottomModal from "./BottomModal";
import { IntervalPicker } from "../../features/timers/IntervalPicker";
import Menu from "./Menu";
import BottomModalButton from "./BottomModalButton";
import BottomModalSelect from "./BottomModalSelect";

const Layout = (props) => {
  const quoteTextRef = useRef(null);

  // const [present, dismiss] = useIonPopover(BottomModal, { onHide: () => dismiss() });
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  // const [popoverState, setShowPopover] = useState({
  //   showPopover: false,
  //   component: (
  //     <BottomModal dismiss={() => setShowPopover({ showPopover: false, event: undefined })} />
  //   ),
  // });

  // const showPopupHandler = (event) => {
  //   event.persist();
  //   setShowPopover({
  //     showPopover: true,
  //     event,
  //   });
  // };

  return (
    <IonContent id="main">
      <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        <BottomModalSelect
          onHide={() => setShowPopover({ showPopover: false, event: undefined })}
        />
      </IonPopover>

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
        <BottomModalButton setShowPopover={setShowPopover} />
      </IonGrid>
    </IonContent>
  );
};

export default Layout;
