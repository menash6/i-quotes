import { useContext } from "react";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { useDispatch } from "react-redux";
import { timersActions } from "./timersSlice";
import { IonButton, IonIcon } from "@ionic/react";
import { reload } from "ionicons/icons";

const ResetTotalTimer = ({ style }) => {
  const dispatch = useDispatch();

  const { restart: restartMusic, shuffle: shuffleMusic } = useContext(MusicPlayerContext);
  const {
    restart: restartQuotes,
    shuffle: shuffleQuotes,
    endingControls,
  } = useContext(QuotesPlayerContext);

  return (
    <IonButton
      style={style}
      fill="clear"
      onClick={() => {
        restartMusic();
        shuffleMusic();
        restartQuotes();
        shuffleQuotes();
        endingControls.restart();
        endingControls.shuffle();
        dispatch(timersActions.restartTotalTimer());
      }}
    >
      <IonIcon icon={reload} />
    </IonButton>
  );
};

export default ResetTotalTimer;
