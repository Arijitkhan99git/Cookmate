import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

const COOKMATE_THEME_KEY = "Cookmate_theme_preference";

export type ThemePreference = "light" | "dark" | "system";

export const getStoredThemePreference =
  async (): Promise<ThemePreference | null> => {
    try {
      const storedTheme = await AsyncStorage.getItem(COOKMATE_THEME_KEY);
      if (
        storedTheme === "light" ||
        storedTheme === "dark" ||
        storedTheme === "system"
      ) {
        return storedTheme;
      }
      return null;
    } catch {
      return null;
    }
  };

export const setStoredThemePreference = async (theme: ThemePreference) => {
  try {
    await AsyncStorage.setItem(COOKMATE_THEME_KEY, theme);
  } catch {}
};

export const themeAtom = atom<ThemePreference | null>(null);
