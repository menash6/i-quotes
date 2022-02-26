import { useIonToast } from "@ionic/react";

export function useToast() {
  const [present, dismiss] = useIonToast();

  const customPresent = ({ message, color = "primary", duration = 2000, position = "bottom" }) => {
    const options = {
      // header: "Header should go here",
      message,
      color,
      duration,
      buttons: [{ text: "hide", handler: () => dismiss() }],
      position,
      translucent: true,
    };
    present(options);
  };
  return { present: customPresent, dismiss };
}
