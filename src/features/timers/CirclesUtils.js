import { CountdownCircleTimer } from "react-countdown-circle-timer";

export const outerEdge = 240;
export const innerEdge = 56;
export const maxWidth = 25;

const colorsRainbowOLD = [
  ["#8B00FF", 0.14285714285],
  ["#0000FF", 0.14285714285],
  ["#0099cc", 0.14285714285],
  ["#00FF00", 0.14285714285],
  ["#FFFF00", 0.14285714285],
  ["#FF7F00", 0.14285714285],
  ["#FF0000", 0.14285714285],
];

// d941ca-ef476f-f78c6b-ffd166-eeeb10-83d483-06d6a0-0cb0a9-118ab2-2166b5

export const colorsRainbow = [
  "#0cb0a9",

  "#2166b5",

  "#d941ca",
  "#ef476f",
  "#f78c6b",
  "#ffd166",
  "#eeeb10",
  "#83d483",
  "#06d6a0",
];

// export const colorsRainbow = [
//   "#0fb002",
//   "#03a4d2",
//   "#045dbe",
//   "#070faf",
//   "#6C0E61",
//   "#d30081",
//   "#fd0002",
//   "#ffcc01",
//   "#ff9205",
//   "#91cb05",
// ];

// export const colorsRainbow = [
//   "#ea6e0a",
//   "#f60010",
//   "#bc29a1",
//   "#6129ba",
//   "#195ebf",
//   "#1291bb",
//   "#10afbd",
//   "#13c09a",
//   "#0dd921",
//   "#dfd112",
// ];

// export const colorsRainbow = [
//   "#f29e4c",
//   "#54478c",
//   "#2c699a",
//   "#048ba8",
//   "#0db39e",
//   "#16db93",
//   "#83e377",
//   "#b9e769",
//   "#efea5a",
//   "#f1c453",
// ];

// export const colorsRainbow = [
//   //older rainbow
//   "#8B00FF",
//   "#0000FF",
//   "#0099cc",
//   "#00FF00",
//   "#FFFF00",
//   "#FF7F00",
//   "#FF0000",
// ];

export const getFilteredColors = (currFilter) => {
  if (currFilter === -1) return colorsRainbow;
  return colorsByFilter[currFilter];
};

export const colorsByFilter = [
  // ["#eb531c", "#ec6b20", "#ec7c20", "#ee9322", "#eea422", "#f2bb23", "#f5d95a"],

  // d64b19-eb531c-ec6b20-ec7c20-ee9322-eea422-f0b023-f2bb23-f4ca3f-f5d95a

  [
    "#f5d95a",

    "#d64b19",
    "#eb531c",
    "#ec6b20",
    "#ec7c20",
    "#ee9322",
    "#eea422",
    "#f0b023",
    "#f2bb23",
    "#f4ca3f",
  ],

  // ["#0b0d0d", "#313535", "#585e5e", "#7f8686", "#a5aeae", "#ccd7d7", "#f2ffff"],

  // [ // BACLK TO WHITE INSIDE
  //   "#f2ffff",
  //   "#0b0d0d",
  //   "#1e2121",
  //   "#282b2b",
  //   "#313535",
  //   "#454a4a",
  //   "#585e5e",
  //   "#7f8686",
  //   "#a6afaf",
  //   "#ccd7d7",
  // ]

  [
    "#caf0f8",

    "#023e8a",
    "#015ba0",
    "#0077b6",
    "#0096c7",
    "#00b4d8",
    "#48cae4",
    "#6cd5ea",
    "#90e0ef",
    "#ade8f4",
  ],

  // a80011-cf0007-fb0000-ff3b09-ff560e-ff6d12-ff891b-ff9e1f-ffb224-ffc32c

  // [ // red workout
  //   "#ffc32c",
  //   "#a80011",
  //   "#cf0007",
  //   "#fb0000",
  //   "#ff3b09",
  //   "#ff560e",
  //   "#ff6d12",
  //   "#ff891b",
  //   "#ff9e1f",
  //   "#ffb224",
  // ],

  // 007f5f-2b9348-95c944-cae442-ffff3f-fce137-f8c22f-f79224-f56118-f10000
  [
    // green yellow orange workout
    "#f10000",

    "#007f5f",

    "#2b9348",

    "#95c944",
    "#cae442",
    "#ffff3f",
    "#fce137",
    "#f8c22f",
    "#f79224",
    "#f56118",
  ],
  // [
  //   // green yellow orange workout
  //   "#f45c1b",

  //   "#007f5f",

  //   "#2b9348",
  //   "#95c944",
  //   "#cae442",
  //   "#ffff3f",
  //   "#fce137",
  //   "#f8c22f",
  //   "#f4a327",
  //   "#f0841f",
  // ],
  //   // green yellow  workout
  //   "#007f5f",

  //   "#ffff3f",
  //   "#eeef20",
  //   "#dddf00",
  //   "#d4d700",
  //   "#bfd200",
  //   "#aacc00",
  //   "#80b918",
  //   "#55a630",
  //   "#2b9348",
  // ],

  // [// brown red
  //   "#ffba08",
  //   "#6a040f",
  //   "#9d0208",
  //   "#d00000",
  //   "#dc2f02",
  //   "#e24603",
  //   "#e85d04",
  //   "#ee7505",
  //   "#f48c06",
  //   "#faa307",
  // ],

  // ["#050255", "#15025b", "#250261", "#360267", "#46016c", "#560172", "#660178"],

  // ["#ca937f", "#f1b5b5", "#f1cbcf", "#f0e1e8", "#9fd5f1", "#88c6ee", "#70b6ea"],

  // 9410ab-7209b7-640ab2-560bad-480ca8-3a0ca3-3d22b6-3f37c9-414cdc-4361ee
  [
    "#4361ee",
    "#9410ab",
    "#7209b7",
    "#640ab2",
    "#560bad",
    "#480ca8",
    "#3a0ca3",
    "#3d22b6",
    "#3f37c9",
    "#414cdc",
  ],

  // 6a040f-9d0208-d00000-dc2f02-e24603-e85d04-ee7505-f48c06-faa307-ffba08

  [
    "#9ae3a2",

    "#1a745c",

    "#03664c",

    "#147355",
    "#24825e",
    "#369069",
    "#479e73",
    "#55ab7a",
    "#67b985",
    "#79c78f",
  ],
  // [
  //   "#1a745c",
  //   "#9ae3a2",
  //   "#79c78f",
  //   "#67b985",
  //   "#55ab7a",
  //   "#479e73",
  //   "#369069",
  //   "#24825e",
  //   "#147355",
  //   "#03664c",
  // ],
  // [
  //   "#fbf8cc",
  //   "#fde4cf",
  //   "#ffcfd2",
  //   "#f1c0e8",
  //   "#cfbaf0",
  //   "#a3c4f3",
  //   "#90dbf4",
  //   "#8eecf5",
  //   "#98f5e1",
  //   "#b9fbc0",
  // ],
];

const firstCircleTransition = 0.99;

export const get2Colors = (colorsArray, index) => {
  index %= colorsArray.length;
  index = colorsArray.length - index;
  return [
    [colorsArray[index % colorsArray.length], firstCircleTransition],
    [colorsArray[(index + 1) % colorsArray.length], 1 - firstCircleTransition],
  ];
};

const rotate = (arr, count = 1) => {
  return [...arr.slice(count, arr.length), ...arr.slice(0, count)];
};

export const calculateCircleSize = ({ strokeWidth, numOfTimers, activeInterval: i }) => {
  if (numOfTimers === 1) return outerEdge;
  // if (numOfTimers === 2) {
  //   return i === 0 ? innerEdge + 2 * strokeWidth : outerEdge; // if 2 circles - one is the outer and the other is the inner
  // } //todo include in next step

  if (i === 0) return innerEdge + 2 * strokeWidth;
  if (i === numOfTimers - 1) return outerEdge;

  const spaceForLayoutOfCircles = outerEdge - innerEdge - 4 * strokeWidth;
  const spaceForOnlyCircles = (numOfTimers - 2) * 2 * strokeWidth; //without 2 inner and outer circles
  const spaceForOnlySpaces = spaceForLayoutOfCircles - spaceForOnlyCircles;
  const spaceForOneSpace = spaceForOnlySpaces / (numOfTimers - 2 + 1); //devided by number of spaces
  const spaceForFirstCircle = innerEdge + 2 * strokeWidth;
  const calculatedSize = spaceForFirstCircle + (spaceForOneSpace + 2 * strokeWidth) * i;
  // console.log({
  //   spaceForLayoutOfCircles,
  //   spaceForOnlyCircles,
  //   spaceForOnlySpaces,
  //   spaceForOneSpace,
  //   spaceForFirstCircle,
  //   calculatedSize,
  // });
  return calculatedSize;
};

const colorsOdd = [
  ["#004777", 0.33],
  ["#F7B801", 0.33],
];
const colorsEven = [
  ["#F7B801", 0.33],
  ["#004777", 0.33],
];

export const CreateCircleTimer = ({
  isLoop = false,
  colors,
  strokeWidth,
  key,
  isPlaying,
  size,
  duration,
  timeRemaining,
  innertimer = null,
}) => {
  return (
    <CountdownCircleTimer
      rotation="counterclockwise"
      trailStrokeWidth={0.9 * strokeWidth}
      strokeWidth={strokeWidth} //make it wider for less circles to fill the space
      key={key}
      isPlaying={isPlaying}
      duration={duration}
      initialRemainingTime={timeRemaining}
      colors={colors}
      size={size}
      onComplete={() => {
        console.warn("CountdownCircleTimer ON COMPLETE");
        return [isLoop, 200];
      }}
    >
      {innertimer}
    </CountdownCircleTimer>
  );
};
