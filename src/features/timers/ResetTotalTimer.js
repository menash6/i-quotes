import { useContext } from "react";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { useDispatch } from "react-redux";
import { timersActions } from "./timersSlice";
import { IonButton, IonIcon } from "@ionic/react";
import { reload } from "ionicons/icons";
import { isLight } from "../../theme/utils/gradients";
import chroma from "chroma-js";

const ResetTotalTimer = ({ style }) => {
  const dispatch = useDispatch();

  const {
    restart: restartMusic,
    shuffle: shuffleMusic,
    getCategoryStyle,
  } = useContext(MusicPlayerContext);
  const {
    restart: restartQuotes,
    shuffle: shuffleQuotes,
    endingControls,
  } = useContext(QuotesPlayerContext);

  const { background, circles } = getCategoryStyle();

  const createStyle = () => {
    switch (isLight(background[2])) {
      case false:
        return { color: chroma(circles[1]).brighten(2).alpha(0.4) };

      default:
        return { color: chroma(circles[0]).darken(2).alpha(0.4) };
    }
  };

  return (
    <IonButton
      style={createStyle()}
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
