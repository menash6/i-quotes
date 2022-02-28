import { IonIcon, IonLabel, IonSegment, IonSegmentButton, IonToolbar } from "@ionic/react";
import React from "react";
import { chatbubbleEllipses, headsetOutline } from "ionicons/icons";

const BottomModalSegments = ({ setShowContent, showContent }) => {
  return (
    <>
      <IonSegment
        color="primary"
        onIonChange={(e) => setShowContent(e.detail.value)}
        value={showContent}
      >
        <IonSegmentButton value="intervalPicker">
          {/* <IonLabel>Daily Values</IonLabel> */}
          <IonIcon icon={chatbubbleEllipses} />
        </IonSegmentButton>
        <IonSegmentButton value="selectSpeaker">
          {/* <IonLabel>Core Values</IonLabel> */}
          <IonIcon icon={headsetOutline} />
        </IonSegmentButton>
      </IonSegment>
    </>
  );
};

export default BottomModalSegments;
