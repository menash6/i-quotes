import { appsSharp, chatboxEllipses, headsetSharp } from "ionicons/icons";
import { filterCategories } from "../features/quotesPlayer/quotesPlayerAPI";

import {
  IonLabel,
  IonIcon,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonSelectOption,
  IonItem,
  IonSelect,
  useIonPopover,
} from "@ionic/react";

import "./Menu.css";
import { useSelector, useDispatch } from "react-redux";

import {
  selectSpeaker,
  selectMixedSpeakers,
  selectQuotesFilter,
} from "../features/quotesPlayer/quotesPlayerSlice";

import quotesPlayerActions from "../features/quotesPlayer/quotesPlayerSlice";

import { IntervalPicker } from "../features/timers/IntervalPicker";

const totalSpeakers = 3;

function radomNextSpeaker(currentSpeaker) {
  const moveForwardsCount = Math.floor(Math.random() * (totalSpeakers - 1)) + 1;
  console.log({ currentSpeaker });
  console.log({ moveForwardsCount });
  console.log("next:", (currentSpeaker + moveForwardsCount) % totalSpeakers);
  return (currentSpeaker + moveForwardsCount) % totalSpeakers;
}

export default function Menu() {
  const dispatch = useDispatch();
  const currentSpeaker = useSelector(selectSpeaker);
  const mixedSpeakers = useSelector(selectMixedSpeakers);
  const currentFilter = useSelector(selectQuotesFilter);

  const [present, dismiss] = useIonPopover(IntervalPicker, {
    onHide: () => dismiss(),
  });

  console.log({ currentSpeaker });
  console.log({ mixedSpeakers });

  return (
    <IonMenu
      className="MenuWidth"
      side="start"
      // menuId="first"
      contentId="main"
    >
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons>
            <IonTitle>
              {/* <IonIcon icon={headsetOutline} />  */}
              Options
            </IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonButton
          expand="block"
          onClick={(e) =>
            present({
              event: e.nativeEvent,
            })
          }
        >
          Show Popover
        </IonButton> */}

        <IonItem>
          <IonLabel>
            <IonIcon size="large" icon={headsetSharp} />
          </IonLabel>
          <IonSelect
            // interface="action-sheet"
            value={mixedSpeakers === true ? totalSpeakers : currentSpeaker}
            onIonChange={(e) => {
              if (e.detail.value == totalSpeakers) {
                //choose random speaker 0,1,2 - different than the current speaker
                dispatch(quotesPlayerActions.setIsMixedSpeaker(true));
                dispatch(quotesPlayerActions.setSpeaker(radomNextSpeaker(currentSpeaker, 3)));
              } else {
                dispatch(quotesPlayerActions.setIsMixedSpeaker(false));
                dispatch(quotesPlayerActions.setSpeaker(e.detail.value));
              }
            }}
          >
            <IonSelectOption value={totalSpeakers}>Mix</IonSelectOption>
            <IonSelectOption value={0}>Marcus</IonSelectOption>
            <IonSelectOption value={1}>Stacey</IonSelectOption>
            <IonSelectOption value={2}>Lila</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>
            <IonIcon size="large" icon={appsSharp} />
          </IonLabel>
          <IonSelect
            className="ion-text-capitalize"
            // interface="popover"
            value={currentFilter}
            onIonChange={(e) => {
              dispatch(quotesPlayerActions.setFilter(e.detail.value));
            }}
          >
            <IonSelectOption className="ion-text-capitalize" value={1}>
              {filterCategories[1]}
            </IonSelectOption>
            <IonSelectOption className="ion-text-capitalize" value={2}>
              {filterCategories[2]}
            </IonSelectOption>
            <IonSelectOption className="ion-text-capitalize" value={3}>
              {filterCategories[3]}
            </IonSelectOption>
            <IonSelectOption className="ion-text-capitalize" value={4}>
              {filterCategories[4]}
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>
            <IonIcon size="large" icon={chatboxEllipses} />
          </IonLabel>
          <IonSelect
            className="ion-text-capitalize"
            // interface="popover"
            value={1}
          >
            <IonSelectOption className="ion-text-capitalize" value={1}>
              Quotes
            </IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* 
        <IonSegment
          //   className="fancy-segment-button"
          className="VerticalMenu"
          color="tertiary"
          // value={nextValue}
          value={mixedSpeakers === true ? totalSpeakers : currentSpeaker}
          onIonChange={(e) => {
            console.log(
              "value:typeof e.detail.value",
              e.detail.value,
              ":",
              typeof e.detail.value
            );
            if (e.detail.value == totalSpeakers) {
              //choose random speaker 0,1,2 - different than the current speaker
              dispatch(setIsMixedSpeaker(true));
              dispatch(setSpeaker(radomNextSpeaker(currentSpeaker, 3)));
            } else {
              dispatch(setIsMixedSpeaker(false));
              dispatch(setSpeaker(e.detail.value));
            }

            // console.log("e.detail.value", e.detail.value);
          }}
        >
          <IonSegmentButton value={totalSpeakers} layout="icon-start">
            <IonIcon icon={people} />
            <IonLabel>Mix</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={0} layout="icon-start">
            <IonIcon icon={man} />
            <IonLabel>Marcus</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value={1} layout="icon-start">
            <IonIcon icon={woman} />
            <IonLabel>Stacey</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton
            value={2}
            layout="icon-start"
            // className="fancy-segment-button"
          >
            <IonIcon icon={happy} />
            <IonLabel>Lila</IonLabel>
          </IonSegmentButton>
        </IonSegment> */}
      </IonContent>
    </IonMenu>
  );
}
