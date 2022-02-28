import {
  IonCol,
  IonContent,
  IonRow,
  IonGrid,
  IonFabList,
  IonIcon,
  IonFabButton,
  IonFab,
  IonModal,
  IonHeader,
  IonTitle,
  IonFooter,
  IonCardSubtitle,
  IonToolbar,
  IonButtons,
  IonButton,
  useIonModal,
  IonDatetime,
} from "@ionic/react";
import { ToolBar } from "./ToolBar";
import QuotesPlayer from "../../features/quotesPlayer/QuotesPlayer";
import { Timers } from "../../features/timers/Timers";
import { PlayPauseRepeatButton } from "../../features/timers/PlayPauseRepeatButton";
import { useRef, useState } from "react";
import SwiperCategories from "./SwiperCategories";
import {
  arrowUp,
  chevronUpOutline,
  logoFacebook,
  logoTwitch,
  logoYoutube,
  videocamOutline,
} from "ionicons/icons";

const Body = ({ count, onDismiss, onIncrement }) => (
  <IonContent>
    <IonHeader>Hey</IonHeader>
    count: {count}
    <IonButton expand="block" onClick={() => onIncrement()}>
      Increment Count
    </IonButton>
    <IonButton expand="block" onClick={() => onDismiss()}>
      Close
    </IonButton>
  </IonContent>
);

const Layout = (props) => {
  const quoteTextRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleDismiss = () => {
    dismiss();
  };

  /**
   * First parameter is the component to show, second is the props to pass
   */
  const [present, dismiss] = useIonModal(Body, {
    onDismiss: handleDismiss,
  });
  const [selectedDate, setSelectedDate] = useState("2012-12-15T13:47:20.789");

  const quotesPlayer = <QuotesPlayer />;
  const timers = (
    <Timers>
      <PlayPauseRepeatButton quoteText={quoteTextRef.current} />
    </Timers>
  );

  return (
    <IonContent id="main">
      <ToolBar />

      <div className="type-wrap">
        <span ref={quoteTextRef} />
      </div>
      {/* Sheet Modal */}
      {/* <IonModal isOpen={true} breakpoints={[0.1, 0.5, 1]} initialBreakpoint={0.5}>
        <IonContent>Modal Content</IonContent>
      </IonModal> */}
      {/* <IonModal
        isOpen={showModal}
        initialBreakpoint={0.2}
        breakpoints={[0, 0.2, 0.5]}
        onDidDismiss={() => setShowModal(false)}
      >
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButtons>
                <IonButton onClick={() => setShowModal(false)}>X</IonButton>
              </IonButtons>
            </IonToolbar>
            <IonTitle>hey</IonTitle>
          </IonHeader>
          <IonFooter>
            <IonCardSubtitle>subtitle</IonCardSubtitle>
          </IonFooter>
        </IonContent>
      </IonModal> */}

      {/*-- fab placed to the bottom and start and on the bottom edge of the content overlapping footer with a list to the right --*/}
      {/* <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonButton
          color="light"
          onClick={() => {
            present({
              initialBreakpoint: 0.3,
              breakpoints: [0, 0.3],
              backdropBreakpoint: 0.3,
              // htmlAttributes: { "--background": "red" },
            });
          }}
        >
          <IonIcon icon={arrowUp} />
        </IonButton>
 
      </IonFab> */}

      {/* <SwiperCategories timers={timers} quotesPlayer={quotesPlayer} /> */}
      <IonGrid className="ion-padding Grid-Fixed-Width" fixed>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol>
            <QuotesPlayer />
          </IonCol>
        </IonRow>
        <Timers>
          <PlayPauseRepeatButton quoteText={quoteTextRef.current} />
        </Timers>
      </IonGrid>
      <IonFooter>
        <IonToolbar className="ion-text-center">
          <IonButton size="large" fill="clear">
            <IonIcon icon={chevronUpOutline} />
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonContent>
  );
};

export default Layout;
