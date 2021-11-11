import { IonItem, IonRange, IonIcon, IonButton, IonText } from "@ionic/react";
import {
  addCircleOutline,
  addCircleSharp,
  addOutline,
  personAddOutline,
  personRemoveOutline,
  removeCircleSharp,
  removeOutline,
  sunny,
  thermometer,
} from "ionicons/icons";
import { RangeValue } from "@ionic/core";
import {
  timersActions,
  selectIntervalTime,
  // selectIntervalPercent,
  selectNumOfIntervals,
  selectMaxNumIntervals,
} from "./timersSlice";
import { useSelector, useDispatch } from "react-redux";
import { quotesPlayerActions } from "../quotesPlayer/quotesPlayerSlice";

export const IntervalPicker = () => {
  // const [value, setValue] = useState(0);
  // const [intervalValue, setIntervalValue] = useState();
  const dispatch = useDispatch();
  // const intervalTime = useSelector(selectIntervalTime);
  // const intervalPercent = useSelector(selectIntervalPercent);
  const maxNumIntervals = useSelector(selectMaxNumIntervals);
  const numIntervals = useSelector(selectNumOfIntervals);

  return (
    <>
      <IonItem>
        <IonText color="dark">
          <h6> Total Quotes : {numIntervals} </h6>
        </IonText>
      </IonItem>

      <IonItem>
        {/* <IonLabel position="stacked">Quotes: {numIntervals}</IonLabel> */}
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
            onClick={() =>
              dispatch(timersActions.setNumOfIntervals(numIntervals - 1))
            }
          >
            <IonIcon icon={removeOutline} />
          </IonButton>

          <IonButton
            disabled={numIntervals === maxNumIntervals ? true : false}
            slot="end"
            color="dark"
            fill="clear"
            onClick={() =>
              dispatch(timersActions.setNumOfIntervals(numIntervals + 1))
            }
          >
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonRange>
      </IonItem>
    </>
  );
};
