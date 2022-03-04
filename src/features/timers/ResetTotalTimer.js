import { useContext } from "react";
import { MusicPlayerContext } from "./../../providers/musicPlayer/musicPlayer.provider";
import { QuotesPlayerContext } from "../../providers/quotesPlayer/quotesPlayer.provider";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalTime, timersActions } from "./timersSlice";
import { getISOString, getSeconds } from "./utils";
import { IonButton, IonDatetime, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { reload } from "ionicons/icons";

const ResetTotalTimer = () => {
  const dispatch = useDispatch();

  const { restart: restartMusic, shuffle: shuffleMusic } = useContext(MusicPlayerContext);
  const {
    restart: restartQuotes,
    shuffle: shuffleQuotes,
    endingControls,
  } = useContext(QuotesPlayerContext);

  const totalTime = useSelector(selectTotalTime);

  return (
    <IonButton
      //   color="light"
      //   color="light"
      //   fill="clear"
      style={{ color: "var(--ion-text-color)" }}
      fill="clear"
      onClick={() => {
        restartMusic();
        shuffleMusic();
        restartQuotes();
        shuffleQuotes();
        endingControls.restart();
        endingControls.shuffle();
        dispatch(timersActions.restartTotalTimer());
      }}
    >
      <IonIcon icon={reload} />
      {/* <IonLabel>reset</IonLabel> */}
    </IonButton>
  );
};

export default ResetTotalTimer;
//  <IonItem button>
//       <IonLabel>Reset</IonLabel>
//       <IonDatetime
//         value={getISOString(totalTime)}
//         pickerOptions={
//           {
//             // buttons: [
//             //   {
//             //     text: "Save",
//             //     handler: () => console.log("Clicked Save!"),
//             //   },
//             //   {
//             //     text: "Log",
//             //     handler: () => {
//             //       console.log("Clicked Log. Do not Dismiss.");
//             //       return false;
//             //     },
//             //   },
//             // ],
//           }
//         }
//         // defaultValue={getISOString(totalTime)}
//         //   defaultValue="16:16"
//         mode="ios"
//         display-format={"mm:ss"}
//         pickerFormat="H:mm:ss"
//         placeholder="Restart"
//         onIonChange={(e) => {
//           restartMusic();
//           shuffleMusic();
//           restartQuotes();
//           shuffleQuotes();
//           endingControls.restart();
//           endingControls.shuffle();
//           console.log("~😎😎😎😎 getSeconds(e.detail.value)", getSeconds(e.detail.value));
//           console.log("~😎😎😎😎 e.detail.value", e.detail.value);
//           dispatch(timersActions.restartTotalTimer());
//           setTimeout(() => {
//             dispatch(timersActions.setTotalTime(getSeconds(e.detail.value)));
//           }, 1000);
//         }}
//       ></IonDatetime>
//     </IonItem>
