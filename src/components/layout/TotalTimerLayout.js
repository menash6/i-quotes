import { IonCol, IonRow } from "@ionic/react";

const TotalTimerLayout = (props) => {
  return (
    <IonRow className=" ion-align-items-center ">
      <IonCol
        className="ion-text-center"
        style={{
          padding: "5vh",
        }}
      >
        {props.children}
      </IonCol>
    </IonRow>
  );
};

export default TotalTimerLayout;
