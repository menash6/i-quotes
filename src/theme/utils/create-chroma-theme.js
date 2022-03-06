import chroma from "chroma-js";
import { defaultColor } from "./../constants";
import { getContrastColor, getToolBarBackground } from "./gradients";

const darkestPercent = -100;
const lightestPercent = 200;

export function CSSTextGenerator(colorsStyle) {
  const { background, circles } = colorsStyle;
  // const style = colorsStyle; //!to update

  const primary = background[0];
  const secondary = circles[0];

  const primaryColor = chroma(primary);
  const secondaryColor = chroma(secondary);

  const primaryLCH = chroma(primary).lch();
  const primaryChroma = primaryLCH[1];
  const primaryHue = primaryLCH[2];
  const primaryDarkest = chroma.lch(darkestPercent, primaryChroma, primaryHue);
  const primaryLightest = chroma.lch(lightestPercent, primaryChroma, primaryHue);

  const genLightToDark = chroma.scale([primaryLightest, primaryDarkest]).domain([0, 100]);
  // const genLightToDark = chroma.scale([secondaryColor, primaryColor]).domain([0, 100]);

  const contrastColor = getContrastColor(primary);

  const lightColor = chroma(primaryLightest.brighten(3));
  const darkColor = chroma(primaryDarkest.darken(3));

  return `
    --ion-item-background: ${lightColor.hex()};
    --ion-item-text: ${darkColor.hex()};

    --ion-toolbar-background: ${getToolBarBackground({ primary, secondary })}; 
    --ion-toolbar-color: ${contrastColor.hex()};

    --ion-tab-bar-background:  ${primaryColor.darken(1).hex()};
    --ion-tab-bar-color: ${contrastColor.alpha(0.5).hex()};
    --ion-tab-bar-color-selected: ${contrastColor.hex()};

    --ion-searchbar-background: ${lightColor.hex()};
    --ion-searchbar-text-color: ${darkColor.hex()};

    --ion-color-primary:  ${primaryColor.darken().hex()};
    --ion-color-primary-rgb: ${primaryColor.rgb()};
    --ion-color-primary-contrast: ${contrastColor.hex()};
    --ion-color-primary-contrast-rgb: ${contrastColor.rgb()};
    --ion-color-primary-shade:  ${primaryColor.darken().hex()};
    --ion-color-primary-tint:  ${primaryColor.brighten().hex()};
    ${genColorSteps50to950({ genColorSteps: genLightToDark })}
    `;
}

function genColorSteps50to950({ genColorSteps }) {
  const colorSteps = [];

  colorSteps.push(`--ion-background-color: ${genColorSteps(0)};`);
  colorSteps.push(`--ion-background-color-rgb: ${genColorSteps(0).rgb()};`);
  colorSteps.push(`--ion-text-color: ${genColorSteps(100)};`);
  colorSteps.push(`--ion-text-color-rgb:${genColorSteps(100).rgb()};`);

  for (let i = 0; i <= 100; i += 5) {
    colorSteps.push(`--ion-color-step-${i}0: ${genColorSteps(i)};`);
  }

  return colorSteps.join("\n");
}
