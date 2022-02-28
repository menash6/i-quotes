import { IonButton, IonToolbar, IonIcon, IonRow, IonCol } from "@ionic/react";
import { chatbubbleOutline, headsetOutline } from "ionicons/icons";

const BottomButtons = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  return (
    <IonToolbar color="light">
      <IonRow>
        <IonCol>
          <IonButton
            fill="clear"
            expand="block"
            value="intervalPicker"
            onClick={showIntervalPicker}
          >
            <IonIcon icon={chatbubbleOutline} />
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton fill="clear" expand="block" value="selectSpeaker" onClick={showSelectSpeaker}>
            <IonIcon icon={headsetOutline} />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonToolbar>
  );
};

export default BottomButtons;
