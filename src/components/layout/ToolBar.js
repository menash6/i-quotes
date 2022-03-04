import {
  IonButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { appsOutline, chatbubbleEllipses, headsetOutline, reload } from "ionicons/icons";
import { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectStatusTotalTimers, timersActions, STATUS } from "../../features/timers/timersSlice";
// import { SelectQuotesFilter } from "../SelectQuotesFilter";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";

import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { getCategoryIcon } from "../SelectMusicFilter";

export const ToolBar = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  const dispatch = useDispatch();

  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const {
    restart: restartMusic,
    shuffle: shuffleMusic,
    currCategoryName,
  } = useContext(MusicPlayerContext);
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
    <IonToolbar color="primary">
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      {/* <IonTitle className="ion-text-center"> */}
      {/* {currCategoryName} */}
      {/* {getCategoryIcon(currCategoryName, "large")} */}
      {/* </IonTitle> */}

      <IonButtons slot="end">
        {/* <IonButton onClick={onTimerRestart}>
          <IonIcon icon={reload} />
        </IonButton> */}
        {statusTotalTimer !== STATUS.ENDED && (
          <>
            {/* <IonButton onClick={showIntervalPicker}>
              <IonIcon icon={chatbubbleEllipses} />
            </IonButton>

            <IonButton onClick={showSelectSpeaker}>
              <IonIcon icon={headsetOutline} />
            </IonButton> */}

            {/* <IonButton onClick={(e) => showPopupHandler(e, <SelectQuotesFilter />)}>
                <IonIcon icon={filterOutline} /> 
              </IonButton>  */}
          </>
        )}

        <IonButton onClick={showMusicFilter}>
          {getCategoryIcon(currCategoryName)}
          {/* <IonIcon icon={appsOutline} /> */}
        </IonButton>
      </IonButtons>
    </IonToolbar>
  );
};
