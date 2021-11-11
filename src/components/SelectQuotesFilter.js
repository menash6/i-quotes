import {
  IonLabel,
  IonListHeader,
  IonRadioGroup,
  IonRadio,
  IonItem,
  IonIcon,
} from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectQuotesFilter,
  quotesPlayerActions,
} from "../features/quotesPlayer/quotesPlayerSlice";

import {
  sunnyOutline,
  moonOutline,
  barbellOutline,
  scanCircleOutline,
  happyOutline,
  locateOutline,
} from "ionicons/icons";

export const SelectQuotesFilter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectQuotesFilter);

  return (
    <>
      <IonRadioGroup
        value={currentFilter}
        onIonChange={(e) => {
          dispatch(quotesPlayerActions.setFilter(e.detail.value));
        }}
      >
        <IonListHeader>
          <IonLabel>
            <IonLabel>Filter the Quotes</IonLabel>
          </IonLabel>
          {/* <IonLabel>Choose Your Program</IonLabel> */}
        </IonListHeader>

        <IonItem>
          <IonLabel>All</IonLabel>
          <IonRadio slot="start" value={-1} />
        </IonItem>

        <IonItem>
          <IonLabel>Morning</IonLabel>
          <IonRadio slot="start" value={0} />
          <IonIcon icon={sunnyOutline} />
        </IonItem>

        <IonItem>
          <IonLabel>Focus</IonLabel>
          <IonRadio slot="start" value={1} />
          <IonIcon icon={locateOutline} />
          {/* <IonIcon icon={scanCircleOutline} /> */}
        </IonItem>

        <IonItem>
          <IonLabel>Workout</IonLabel>
          <IonRadio slot="start" value={2} />
          <IonIcon icon={barbellOutline} />
        </IonItem>
        <IonItem>
          <IonLabel>Night</IonLabel>
          <IonRadio slot="start" value={3} />
          <IonIcon icon={moonOutline} />
        </IonItem>
        <IonItem>
          <IonLabel>Mindfullness</IonLabel>
          <IonRadio slot="start" value={4} />
          <IonIcon src="assets\meditation-svgrepo-com.svg" />
        </IonItem>
      </IonRadioGroup>
    </>
  );
};
