import { IonIcon, IonFab, IonFabButton } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";
import { selectStatusTotalTimers } from "./timersSlice";
import { timersActions, STATUS } from "./timersSlice";
import { play, pauseCircle, reloadOutline } from "ionicons/icons";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";
import { useContext } from "react";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";

export const PlayPauseRepeatButton = () => {
  const dispatch = useDispatch();
  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  const musicControls = useContext(MusicPlayerContext);
  const quotesControls = useContext(QuotesPlayerContext);

  const restartMusic = musicControls.restart;
  const restartQuotes = quotesControls.restart;
  const shuffleMusic = musicControls.shuffle;
  const shuffleQuotes = quotesControls.shuffle;

  return (
    <>
      <IonFab vertical="center" horizontal="center" slot="fixed">
        <IonFabButton
          color="light"
          onClick={() => {
            if (statusTotalTimer === STATUS.RUNNING) {
              dispatch(timersActions.setStatusTimer(STATUS.PAUSED));

              musicControls.pause();
              quotesControls.pause();
              //todo typer pause()
            } else {
              //if it was paused... play it again
              if (statusTotalTimer === "ENDED") {
                dispatch(timersActions.restartTotalTimer());

                restartMusic();
                shuffleMusic();
                restartQuotes();
                shuffleQuotes();
                quotesControls.endingControls.restart(); //stop them
                quotesControls.endingControls.shuffle(); //shuffle them for next time
              } else {
                dispatch(timersActions.setStatusTimer(STATUS.RUNNING));

                musicControls.play();
                //todo typer play()

                // if (quotesControls.isEnded) return;
                quotesControls.play();
              }
            }
          }}
        >
          <IonIcon
            size={"large"}
            color="dark"
            icon={
              statusTotalTimer === STATUS.RUNNING
                ? pauseCircle
                : statusTotalTimer === STATUS.ENDED
                ? reloadOutline
                : play
            }
          />
        </IonFabButton>
      </IonFab>
    </>
  );
};
