import { IonLabel, IonListHeader, IonRadioGroup, IonRadio, IonItem, IonIcon } from "@ionic/react";
import { useSelector, useDispatch } from "react-redux";

import {
  sunnyOutline,
  moonOutline,
  barbellOutline,
  locateOutline,
  chatbubblesOutline,
  appsOutline,
} from "ionicons/icons";
import { selectStatusTotalTimers, STATUS } from "../features/timers/timersSlice";
import { useContext } from "react";
import { QuotesPlayerContext } from "../providers/quotesPlayer/quotesPlayer.provider";
import { timersActions } from "./../features/timers/timersSlice";
import { MusicPlayerContext } from "../providers/musicPlayer/musicPlayer.provider";

export const categoriesIcons = {
  Morning: sunnyOutline,
  Focus: locateOutline,
  Workout: barbellOutline,
  Night: moonOutline,
  Mindfulness: { src: "assetsmeditation-svgrepo-com.svg" },
};

export const categoriesIconsJsx = {
  Morning: sunnyOutline,
  Focus: locateOutline,
  Workout: barbellOutline,
  Night: moonOutline,
  Mindfulness: { src: "assetsmeditation-svgrepo-com.svg" },
};

export const getCategoryIcon = (name) => {
  switch (name) {
    case "Morning":
      return <IonIcon icon={sunnyOutline} />;
    case "Focus":
      return <IonIcon icon={locateOutline} />;
    case "Workout":
      return <IonIcon icon={barbellOutline} />;
    case "Night":
      return <IonIcon icon={moonOutline} />;
    case "Mindfulness":
      return <IonIcon src="assets\meditation-svgrepo-com.svg" />;

    default:
      //All

      return <IonIcon icon={appsOutline} />;
  }
};

const createCategoryRadioButton = ({ id, name }) => {
  if (name === "Mindfulness") {
    return (
      <IonItem key={id}>
        <IonLabel>Mindfulness</IonLabel>
        <IonRadio slot="start" value={id} />
        <IonIcon src="assets\meditation-svgrepo-com.svg" />
      </IonItem>
    );
  }

  return (
    <IonItem key={id}>
      <IonLabel>{name}</IonLabel>
      <IonRadio slot="start" value={id} />
      <IonIcon icon={categoriesIcons[name]} />
    </IonItem>
  );
};

export const SelectMusicFilter = () => {
  const dispatch = useDispatch();
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const quotesControls = useContext(QuotesPlayerContext);
  const { allMusicCategories, currCategory, setCategory, controlledSwiper, getSlideId } =
    useContext(MusicPlayerContext);

  return (
    <>
      <IonRadioGroup
        value={currCategory}
        onIonChange={(e) => {
          if (statusTotalTimer === STATUS.ENDED) {
            //todo if ENDED stop quotes?? and restart timer and other playlists...
            dispatch(timersActions.restartTotalTimer());

            quotesControls.endingControls.restart();
            quotesControls.endingControls.shuffle();
          }
          const nextSlide = getSlideId(e.detail.value);

          // controlledSwiper.slideTo(nextSlide, 0, false);
          controlledSwiper.slideToLoop(nextSlide, 0, false);
          // setCategory(e.detail.value);
        }}
      >
        <IonListHeader>
          <IonLabel>
            <IonLabel>Choose Your Vibe</IonLabel>
          </IonLabel>
        </IonListHeader>

        <IonItem>
          <IonLabel>All</IonLabel>
          <IonRadio slot="start" value={""} />
        </IonItem>

        {allMusicCategories.map((e) => createCategoryRadioButton({ id: e._id, name: e.name }))}
      </IonRadioGroup>
    </>
  );
};
