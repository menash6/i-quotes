import React, { useRef, useState } from "react";
import { ToolBar } from "./ToolBar";
import { IntervalPicker } from "./../../features/timers/IntervalPicker";
import SelectSpeaker from "../SelectSpeaker";
import { SelectMusicFilter } from "./../SelectMusicFilter";
import { IonPopover, IonContent, IonFooter } from "@ionic/react";
import BottomButtons from "./BottomButtons";

const PageLayout = ({ children }) => {
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
      <ToolBar
        showIntervalPicker={showIntervalPicker}
        showSelectSpeaker={showSelectSpeaker}
        showMusicFilter={showMusicFilter}
      />
      <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        {popoverState.component}
      </IonPopover>
      <IonContent
        id="main"
        // style={{
        //   backgroundImage: `linear-gradient(45deg, ${color}, transparent)`,
        //   // backgroundColor: color,
        //   // "--background": `linear-gradient(45deg, ${color})!important`,
        //   // backgroundImage: `linear-gradient(45deg, ${color})!important`,
        // }}
      >
        {children}
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

export default PageLayout;
