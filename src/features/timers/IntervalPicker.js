import { IonItem, IonRange, IonIcon, IonButton, IonText, IonLabel } from "@ionic/react";
import { addOutline, removeOutline } from "ionicons/icons";
import { timersActions, selectNumOfIntervals, selectMaxNumIntervals } from "./timersSlice";
import { useSelector, useDispatch } from "react-redux";

export const IntervalPicker = () => {
  const dispatch = useDispatch();
  const maxNumIntervals = useSelector(selectMaxNumIntervals);
  const numIntervals = useSelector(selectNumOfIntervals);

  return (
    <>
      <IonItem className="ion-text-center">
        <IonLabel className="ion-text-center">
          <IonText color="dark">Total Quotes : {numIntervals}</IonText>
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonRange
          debounce={500} //todo implement waiting for 0.5 second for the same value like in REACT VIDEO 2021
          value={numIntervals}
          // pin={true}
          min={1}
          max={maxNumIntervals}
          step={1}
          snaps={true}
          color="dark"
          // onIonChange={(e) => setIntervalValue(e.detail.value)}
          onIonChange={(e) =>
            // dispatch(timersActions.setIntervalPercent(e.detail.value))
            dispatch(timersActions.setNumOfIntervals(e.detail.value))
          }
        >
          <IonButton
            disabled={numIntervals <= 1 ? true : false}
            slot="start"
            color="dark"
            fill="clear"
            onClick={() => dispatch(timersActions.setNumOfIntervals(numIntervals - 1))}
          >
            <IonIcon icon={removeOutline} />
          </IonButton>

          <IonButton
            disabled={numIntervals === maxNumIntervals ? true : false}
            slot="end"
            color="dark"
            fill="clear"
            onClick={() => dispatch(timersActions.setNumOfIntervals(numIntervals + 1))}
          >
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonRange>
      </IonItem>
    </>
  );
};
