import chroma from "chroma-js";
import { defaultColor } from "../constants";

export const createShinyGradient = (primaryHex) => {
  const white = "white";
  // const linearGradient =
  return `linear-gradient( -72deg, ${primaryHex}, ${white} 16%, ${primaryHex} 21%, ${white} 24%, ${chroma(
    primaryHex
  )
    .darken(0.5)
    .hex()} 27%, ${primaryHex} 36%, ${white} 45%, ${primaryHex} 60%, ${primaryHex} 72%, ${white} 80%, ${primaryHex} 84%,  ${primaryHex} )`;
  // return `linear-gradient( -72deg, ${primaryHex}, ${white} 16%, ${primaryHex} 21%, ${white} 24%, #e5bf12 27%, ${primaryHex} 36%, ${white} 45%, ${primaryHex} 60%, ${primaryHex} 72%, ${white} 80%, ${primaryHex} 84%,  ${primaryHex} )`;
};
export const create2ColorsGradient = (primaryHex, secondaryHex = null) => {
  if (secondaryHex === null) {
    return `linear-gradient( -72deg, ${primaryHex}, ${chroma(primaryHex).darken(2)})`;
  } else {
    return `linear-gradient(  ${primaryHex}, ${secondaryHex})`;
  }
};

export const create6CornersGradient = ({
  color180 = "white",
  color45 = "white",
  color_45 = "white",
  color90 = "white",
  color_90 = "white",
  color_180 = "white",
}) => {
  const gradient45 = `
        linear-gradient(
            45deg,
            ${chroma(color45).alpha(0).css()}  20%,
            ${chroma(color45).alpha(0.4).css()}  20%,
            ${chroma(color45).alpha(0.4).css()}  40%,
            ${chroma(color45).alpha(0.5).css()}  40%,
            ${chroma(color45).alpha(0.5).css()}  60%,
            ${chroma(color45).alpha(0.6).css()}  60%,
            ${chroma(color45).alpha(0.6).css()}  80%,
            ${chroma(color45).alpha(0.7).css()}  80%
        )`;
  const gradient_45 = `
        linear-gradient(
            -45deg,
            ${chroma(color_45).alpha(0).css()}  20%,
            ${chroma(color_45).alpha(0.4).css()}  20%,
            ${chroma(color_45).alpha(0.4).css()}  40%,
            ${chroma(color_45).alpha(0.6).css()}  40%,
            ${chroma(color_45).alpha(0.6).css()}  60%,
            ${chroma(color_45).alpha(0.8).css()}  60%,
            ${chroma(color_45).alpha(0.8).css()}  80%,
            ${chroma(color_45).alpha(0.95).css()}  80%
        )`;
  const gradient180 = `
        linear-gradient(
            180deg,
            ${chroma(color180).alpha(0).css()}  20%,
            ${chroma(color180).alpha(0.1).css()}  20%,
            ${chroma(color180).alpha(0.1).css()}  40%,
            ${chroma(color180).alpha(0.2).css()}  40%,
            ${chroma(color180).alpha(0.2).css()}  60%,
            ${chroma(color180).alpha(0.4).css()}  60%,
            ${chroma(color180).alpha(0.4).css()}  80%,
            ${chroma(color180).alpha(0.5).css()}  80%
        )`;
  const gradient90 = `
        linear-gradient(
            34deg,
            ${chroma(color90).alpha(0).css()}    20%,
            ${chroma(color90).alpha(0.4).css()}  20%,
            ${chroma(color90).alpha(0.4).css()}  40%,
            ${chroma(color90).alpha(0.6).css()}  40%,
            ${chroma(color90).alpha(0.6).css()}  60%,
            ${chroma(color90).alpha(0.8).css()}  60%,
            ${chroma(color90).alpha(0.8).css()}  80%,
            ${chroma(color90).alpha(0.9).css()}  80%
        )`;
  const gradient_90 = `
        linear-gradient(
            -25deg,
            ${chroma(color_90).alpha(0).css()}    20%,
            ${chroma(color_90).alpha(0.4).css()}  20%,
            ${chroma(color_90).alpha(0.4).css()}  40%,
            ${chroma(color_90).alpha(0.5).css()}  40%,
            ${chroma(color_90).alpha(0.5).css()}  60%,
            ${chroma(color_90).alpha(0.6).css()}  60%,
            ${chroma(color_90).alpha(0.6).css()}  80%,
            ${chroma(color_90).alpha(0.8).css()}  80%
        )`;
  const gradient_180 = `
        linear-gradient(
            -34deg,
            ${chroma(color_180).alpha(0).css()}    20%,
            ${chroma(color_180).alpha(0.4).css()}  20%,
            ${chroma(color_180).alpha(0.4).css()}  40%,
            ${chroma(color_180).alpha(0.5).css()}  40%,
            ${chroma(color_180).alpha(0.5).css()}  60%,
            ${chroma(color_180).alpha(0.6).css()}  60%,
            ${chroma(color_180).alpha(0.6).css()}  80%,
            ${chroma(color_180).alpha(0.8).css()}  80%
        )`;

  return [gradient45, gradient_45, gradient180, gradient_180, gradient90, gradient_90].join(",");
};

export const getToolBarBackground = ({ primary, secondary }) => {
  // const primary = !style ? defaultColor : style.primaryColor;
  // const secondary = !style ? defaultColor : style.secondaryColor;

  const primaryColor = chroma(primary);
  const secondaryColor = chroma(secondary !== undefined ? secondary : primaryColor.darken(2).hex());

  // if (!style || !style.type) {
  //   return create2ColorsGradient(primaryColor.hex());
  // }

  // switch (style.type) {
  switch ("2colors") {
    case "2colors":
      return create2ColorsGradient(primaryColor.hex(), secondaryColor.hex());
    case "shiny":
      return createShinyGradient(primaryColor.hex());
    case "cornerGradient":
      return create6CornersGradient({
        color45: primaryColor.darken(2).hex(),
        color_45: secondaryColor.saturate(2).darken(2).hex(),
        color90: secondaryColor.darken(3).hex(),
        color180: secondaryColor.darken(1).hex(),
        color_90: primaryColor.brighten(3).hex(),
        color_180: primaryColor.brighten(3).hex(),
      });
    //   case "2colors":
    //     return create2ColorsGradient(primaryColor.hex(), secondaryColor.hex());

    default:
      return primaryColor.hex();
  }
};

export const getContrastColor = (color) => {
  return chroma(color).luminance() > 0.4 ? chroma("#000") : chroma("#fff");
};
export const isLight = (color) => {
  return chroma(color).luminance() > 0.4 ? true : false;
};
// export const getPrimaryColor = (style) => {
//   const primary = !style ? defaultColor : style.primaryColor;
//   return chroma(primary);
// };
