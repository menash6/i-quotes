import { IonButton, IonToolbar, IonIcon, IonRow, IonCol } from "@ionic/react";
import { chatbubbleOutline, headsetOutline } from "ionicons/icons";
import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";

const BottomButtons = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  const { getCategoryStyle } = useContext(MusicPlayerContext);
  const { background, circles } = getCategoryStyle();

  return (
    <IonToolbar color="primary">
      <IonRow>
        <IonCol>
          <IonButton
            style={{ "--background": "#ffffff22" }}
            fill="solid"
            expand="block"
            value="intervalPicker"
            onClick={showIntervalPicker}
          >
            <IonIcon icon={chatbubbleOutline} />
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            style={{ "--background": "#ffffff22" }}
            fill="solid"
            expand="block"
            value="selectSpeaker"
            onClick={showSelectSpeaker}
          >
            <IonIcon icon={headsetOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonToolbar>
  );
};

export default BottomButtons;
