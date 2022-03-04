export const secondsToTime = (remainingSeconds) => {
  const totalSeconds = Math.ceil(remainingSeconds);
  let hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  let mins = Math.floor((totalSeconds % (60 * 60)) / 60);
  let secs = Math.floor(totalSeconds % 60);

  secs = secs > 9 ? secs : "0" + secs;
  mins = mins > 9 ? mins : "0" + mins;

  if (hours <= 0) {
    //no hours - show only mins and secs
    return `${mins}:${secs}`;
  } else {
    hours = hours > 9 ? hours : "0" + hours;
    return `${hours}:${mins}:${secs}`;
  }
};
