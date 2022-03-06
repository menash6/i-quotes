import {
  IonMenu,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonList,
  IonContent,
  IonFooter,
  IonAvatar,
  IonButton,
  IonItemDivider,
  IonText,
  IonToolbar,
  IonButtons,
  IonToggle,
} from "@ionic/react";
import {
  analyticsOutline,
  chatbubbleEllipsesOutline,
  heartCircleOutline,
  chevronForwardOutline,
  timeOutline,
  bugOutline,
} from "ionicons/icons";

import { useDispatch, useSelector } from "react-redux";
import PlayersDevtools from "./../../app/PlayersDevtools";
import {
  selectDebugMode,
  quotesPlayerActions,
} from "../../features/quotesPlayer/quotesPlayerSlice";
import MusicDevtools from "../../app/MusicDevtools";

const Menu = () => {
  const currDebugMode = useSelector(selectDebugMode);
  const dispatch = useDispatch();

  return (
    <IonMenu contentId="main">
      <IonToolbar className="ion-padding">
        <IonButtons slot="start" className="ion-padding-end">
          <IonAvatar>
            <img src="https://i.pravatar.cc/50" alt="pravatar" />
          </IonAvatar>
        </IonButtons>
        <IonLabel>
          <h1>Hello Marcus</h1>
          <IonButton size="small" fill="clear">
            Edit profile
            <IonIcon icon={chevronForwardOutline} />
          </IonButton>
        </IonLabel>
      </IonToolbar>

      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem>
              <IonIcon slot="start" icon={timeOutline} />
              <IonLabel>Today</IonLabel>
            </IonItem>
          </IonMenuToggle>

          <IonItemDivider />
          {/* <IonMenuToggle> */}
          {/* <IonItem button routerLink="/user/quotes">
            <IonIcon slot="start" icon={bugOutline} />
            <IonLabel>Debug Mode</IonLabel>
            <IonToggle
              checked={currDebugMode}
              onIonChange={(e) => dispatch(quotesPlayerActions.setDebugMode(e.detail.checked))}
            />
          </IonItem> */}
          {/* </IonMenuToggle> */}
        </IonList>
        <IonItem>
          <IonIcon slot="start" icon={bugOutline} />
          <IonLabel>Debug Mode</IonLabel>
          <IonToggle
            checked={currDebugMode}
            onIonChange={(e) => dispatch(quotesPlayerActions.setDebugMode(e.detail.checked))}
          />
        </IonItem>
        {currDebugMode && <MusicDevtools />}
      </IonContent>
      <IonToolbar>
        <IonFooter className="ion-padding ion-text-center">
          <IonText>©2022 Quotes Timer</IonText>
        </IonFooter>
      </IonToolbar>
    </IonMenu>
  );
};

export default Menu;
