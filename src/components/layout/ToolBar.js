import { IonButton, IonButtons, IonIcon, IonPopover, IonToggle, IonToolbar } from "@ionic/react";
import {
  appsOutline,
  chatbubbleEllipses,
  filterOutline,
  headsetOutline,
  reload,
  shuffle,
} from "ionicons/icons";
import { useState, useContext } from "react";
import SelectSpeaker from "../SelectSpeaker";
import { IntervalPicker } from "../../features/timers/IntervalPicker";

import { useDispatch, useSelector } from "react-redux";
import { selectStatusTotalTimers, timersActions, STATUS } from "../../features/timers/timersSlice";
import { SelectQuotesFilter } from "../SelectQuotesFilter";
import { SelectMusicFilter } from "../SelectMusicFilter";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

import {
  selectQuotesFilter,
  selectDebugMode,
  quotesPlayerActions,
} from "../../features/quotesPlayer/quotesPlayerSlice";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

export const ToolBar = () => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    component: null,
    event: undefined,
  });
  const dispatch = useDispatch();

  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const currDebugMode = useSelector(selectDebugMode);

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

    console.log("onTimerRestart");
    dispatch(timersActions.restartTotalTimer());
    dispatch(quotesPlayerActions.restartQuotesAndMusic());
  };

  const showPopupHandler = (event, component) => {
    event.persist();
    setShowPopover({
      showPopover: true,
      event,
      component,
    });
  };

  return (
    <>
      <IonPopover
        cssClass="my-custom-class"
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        {popoverState.component}
      </IonPopover>

      <IonToolbar color="primary">
        <IonButtons slot="start">
          <IonButton onClick={onTimerRestart}>
            <IonIcon icon={reload} />
          </IonButton>
        </IonButtons>

        <IonButtons slot="end">
          <IonToggle
            checked={currDebugMode}
            onIonChange={(e) => dispatch(quotesPlayerActions.setDebugMode(e.detail.checked))}
          />

          {statusTotalTimer !== STATUS.ENDED && (
            <>
              <IonButton onClick={(e) => showPopupHandler(e, <IntervalPicker />)}>
                <IonIcon icon={chatbubbleEllipses} />
              </IonButton>
              <IonButton onClick={(e) => showPopupHandler(e, <SelectSpeaker />)}>
                <IonIcon icon={headsetOutline} />
              </IonButton>
              <IonButton onClick={(e) => showPopupHandler(e, <SelectQuotesFilter />)}>
                <IonIcon icon={filterOutline} />
              </IonButton>
            </>
          )}

          <IonButton onClick={(e) => showPopupHandler(e, <SelectMusicFilter />)}>
            <IonIcon icon={appsOutline} />
          </IonButton>
        </IonButtons>
        {/* <IonTitle>Quotes Timer</IonTitle> */}
      </IonToolbar>
    </>
  );
};
