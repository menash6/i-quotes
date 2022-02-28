import {
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonPopover,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { appsOutline, chatbubbleEllipses, headsetOutline, reload } from "ionicons/icons";
import { useState, useContext } from "react";
import SelectSpeaker from "../SelectSpeaker";
import { IntervalPicker } from "../../features/timers/IntervalPicker";

import { useDispatch, useSelector } from "react-redux";
import { selectStatusTotalTimers, timersActions, STATUS } from "../../features/timers/timersSlice";
// import { SelectQuotesFilter } from "../SelectQuotesFilter";
import { SelectMusicFilter } from "../SelectMusicFilter";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

export const ToolBar = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  // const [popoverState, setShowPopover] = useState({
  //   showPopover: false,
  //   component: null,
  //   event: undefined,
  // });
  // const showPopupHandler = (event, component) => {
  //   event.persist();
  //   setShowPopover({
  //     showPopover: true,
  //     event,
  //     component,
  //   });
  // };

  const dispatch = useDispatch();

  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const { restart: restartMusic, shuffle: shuffleMusic } = useContext(MusicPlayerContext);
  const {
    restart: restartQuotes,
    shuffle: shuffleQuotes,
    endingControls,
  } = useContext(QuotesPlayerContext);

  const onTimerRestart = () => {
    restartMusic();
    shuffleMusic();
    restartQuotes();
    shuffleQuotes();
    endingControls.restart();
    endingControls.shuffle();

    dispatch(timersActions.restartTotalTimer());
  };

  return (
    <>
      {/* <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        {popoverState.component}
      </IonPopover> */}

      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>

        <IonButtons slot="end">
          <IonButton onClick={onTimerRestart}>
            <IonIcon icon={reload} />
          </IonButton>
          {statusTotalTimer !== STATUS.ENDED && (
            <>
              <IonButton onClick={showIntervalPicker}>
                {/* <IonButton onClick={(e) => showPopupHandler(e, <IntervalPicker />)}> */}
                <IonIcon icon={chatbubbleEllipses} />
              </IonButton>

              <IonButton onClick={showSelectSpeaker}>
                {/* <IonButton onClick={(e) => showPopupHandler(e, <SelectSpeaker />)}> */}
                <IonIcon icon={headsetOutline} />
              </IonButton>
              {/* not filtering quotes right now  - maybe will do it with the characters
              
              <IonButton onClick={(e) => showPopupHandler(e, <SelectQuotesFilter />)}>
                <IonIcon icon={filterOutline} /> 
              </IonButton> */}
            </>
          )}

          <IonButton onClick={showMusicFilter}>
            {/* <IonButton onClick={(e) => showPopupHandler(e, <SelectMusicFilter />)}> */}
            <IonIcon icon={appsOutline} />
          </IonButton>
        </IonButtons>
        {/* <IonTitle>Quotes Timer</IonTitle> */}
      </IonToolbar>
    </>
  );
};
