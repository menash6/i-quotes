import { IonButton, IonToolbar, IonIcon, IonRow, IonCol } from "@ionic/react";
import { chatbubbleOutline, headsetOutline } from "ionicons/icons";

const BottomButtons = ({ showIntervalPicker, showSelectSpeaker, showMusicFilter }) => {
  return (
    <IonToolbar color="primary">
      <IonRow>
        <IonCol>
          <IonButton
            // color="light"
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
            // color="light"
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
