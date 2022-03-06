import { Stopwatch } from "./Stopwatch";
import { IonDatetime } from "@ionic/react";
import {
  selectStatusTotalTimers,
  STATUS,
  timersActions,
  selectIsTotalTimeHours,
  selectTotalTime,
} from "../../features/timers/timersSlice";

import { useSelector, useDispatch } from "react-redux";
import { getISOString, getSeconds } from "./utils";
import { useContext } from "react";
import { MusicPlayerContext } from "../../providers/musicPlayer/musicPlayer.provider";
import { isLight } from "../../theme/utils/gradients";
import ShowTimer from "./ShowTimer";
import chroma from "chroma-js";

const TotalTimer = ({ remainingTime }) => {
  const statusTotalTimer = useSelector(selectStatusTotalTimers);
  const isTotalTimeHours = useSelector(selectIsTotalTimeHours);
  const totalTime = useSelector(selectTotalTime);

  const dispatch = useDispatch();
  const { getCategoryStyle } = useContext(MusicPlayerContext);

  const { background, circles } = getCategoryStyle();

  const padding = "10px";

  const createStyle = () => {
    switch (isLight(background[2])) {
      case false:
        return {
          background: "#F4F5F8",
          // background: chroma(circles[1]).brighten().desaturate(),
          color: "black",
          mixBlendMode: "lighten",
          paddingLeft: padding,
          paddingRight: padding,
        };

      default:
        return {
          background: chroma(circles[0]).desaturate(),
          color: "#F4F5F8",
          // color: "white",
          // mixBlendMode: "darken",
          paddingLeft: padding,
          paddingRight: padding,
        };
    }
  };

  return (
    <>
      {statusTotalTimer === STATUS.READY && (
        <IonDatetime
          style={createStyle()}
          className="Timer pulse"
          mode="ios"
          display-format={isTotalTimeHours ? "HH:mm:ss" : "mm:ss"}
          pickerFormat="H:mm:ss"
          value={getISOString(totalTime)} // value="00:10:00"
          // onIonChange={(e) => setTimerDuration(getSeconds(e.detail.value))}
          onIonChange={(e) => dispatch(timersActions.setTotalTime(getSeconds(e.detail.value)))}
        ></IonDatetime>
      )}
      {(statusTotalTimer === STATUS.RUNNING || statusTotalTimer === STATUS.PAUSED) && (
        <ShowTimer remainingTime={remainingTime} />
      )}
      {statusTotalTimer === STATUS.ENDED && <Stopwatch />}
    </>
  );
};

export default TotalTimer;
