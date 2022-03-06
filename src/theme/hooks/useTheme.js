import { useCallback } from "react";
import { CSSTextGenerator } from "../utils/create-chroma-theme";

export function useTheme() {
  const loadTheme = useCallback((colorsStyle) => {
    const cssText = CSSTextGenerator(colorsStyle);
    document.documentElement.style.cssText = cssText;
  }, []);

  return { loadTheme };
}
