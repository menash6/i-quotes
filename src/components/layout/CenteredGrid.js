import "./centered-grid.css";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

const CenteredGrid = ({ component1, component2 }) => {
  return (
    <div className="container">
      <IonGrid className="ion-align-items-center">
        <IonRow className="ion-justify-content-between">
          <IonCol>{component1}</IonCol>
        </IonRow>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol className="ion-align-self-center ion-text-center">{component2}</IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default CenteredGrid;
