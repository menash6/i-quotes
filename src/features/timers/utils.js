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

export const getSeconds = (duration) => {
  //pickerFormat="HH:mm:ss" to seconds
  const durationHours = parseInt(duration.substring(0, 2)); //get HH
  const durationMins = parseInt(duration.substring(3, 5)); //get mm
  const durationSeconds = parseInt(duration.substring(6, 8)); //get ss
  return durationHours * 3600 + durationMins * 60 + durationSeconds;
};

export const getISOString = (seconds) => {
  //pickerFormat="HH:mm:ss" to seconds
  // console.log("getISOString", { seconds });
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
