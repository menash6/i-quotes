import { IonCol, IonRow } from "@ionic/react";
import { selectStatusTotalTimers, STATUS } from "../../features/timers/timersSlice";
import MusicButton from "./MusicButton";
import { useSelector } from "react-redux";

const MusicControls = (props) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);

  return (
    <IonRow className="ion-justify-content-center ion-align-items-center ion-nowrap">
      <IonCol className="ion-text-center ion-no-padding ion-no-margin">
        {(statusTotalTimer === STATUS.RUNNING || statusTotalTimer === STATUS.PAUSED) && (
          <MusicButton prevOrNext="prev" />
        )}
      </IonCol>
      <IonCol className="ion-justify-content-center ion-no-padding ion-no-margin">
        {props.children}
      </IonCol>
      <IonCol className="ion-text-center ion-no-padding ion-no-margin">
        {(statusTotalTimer === STATUS.RUNNING || statusTotalTimer === STATUS.PAUSED) && (
          <MusicButton prevOrNext="next" />
        )}
      </IonCol>
    </IonRow>
  );
};

export default MusicControls;
