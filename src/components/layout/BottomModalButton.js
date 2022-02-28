import React from "react";
import { IonRow, IonCol, IonToolbar, IonButton, IonIcon } from "@ionic/react";
import { chevronUpOutline } from "ionicons/icons";

const BottomModalButton = ({ setShowPopover }) => {
  return (
    <IonRow className="ion-text-center ion-no-padding ion-no-margin">
      <IonCol>
        <IonToolbar>
          {/* <IonButton size="large" fill="clear" onClick={(e) => showPopupHandler(e)}> */}
          <IonButton
            size="large"
            fill="clear"
            onClick={(e) => {
              e.persist();
              setShowPopover({ showPopover: true, event: e });
            }}
          >
            <IonIcon icon={chevronUpOutline} />
          </IonButton>
        </IonToolbar>
      </IonCol>
    </IonRow>
  );
};

export default BottomModalButton;
