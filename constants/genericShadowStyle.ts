import { useAtomValue } from "jotai";
import { Platform, useColorScheme } from "react-native";
import { themeAtom } from "../store/theme-store";

// Standard elevation → iOS shadow mapping formula.
// Based on the reference table used by React Native Paper and other libraries.
const getIOSShadow = (elevation: number) => ({
  shadowOffset: {
    width: 0,
    height: Math.round(elevation * 0.5),
  },
  shadowOpacity: 0.18 + elevation * 0.01,
  shadowRadius: elevation * 0.75,
});

export const useGenericShadow = (elevation: number = 3) => {
  const theme = useAtomValue(themeAtom);
  const systemColorScheme = useColorScheme();

  const isDarkMode =
    theme === "system" ? systemColorScheme === "dark" : theme === "dark";

  const shadowColor = isDarkMode ? "#000000" : "#c17a4bff";

  // Return platform-specific full style objects.
  // React Native ignores elevation on iOS and shadow* props on Android.
  if (Platform.OS === "android") {
    return {
      shadowColor: shadowColor,
      elevation: elevation,
    };
  }

  return {
    shadowColor: shadowColor,
    ...getIOSShadow(elevation),
  };
};
