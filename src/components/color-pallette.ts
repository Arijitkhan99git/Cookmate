import { useAtomValue } from "jotai";
import { useColorScheme } from "react-native";
import { themeAtom } from "../../store/theme-store";

export type ColorVariants =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

export type ColorsType = typeof Colors.light & {
  isDarkMode: boolean;
};

export const Colors = {
  light: {
    // Surfaces
    background: "#fbf3ebff",
    foreground: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceSecondary: "#FFF2E8",
    surfaceSubtle: "#F6EFE9",
    surfaceHigh: "#FFFFFF",
    surfaceAccent: "#FFE0CC",
    card: "#FFFFFF",
    cardElevated: "#FFFFFF",
    // Brand
    primary: "#FF5A1F",
    primaryText: "#FFFFFF",
    orangeGlow: "#FF6A2A",
    orangeTint: "#FF5A1F",
    brandOrange: "#FF5A1F",
    brandOrangeGlow: "#FF6A2A",
    // Text
    text: "#171717",
    textSecondary: "#6B6B6B",
    mutedText: "#999999",
    // Semantic
    secondary: "#FFF2E8",
    secondaryText: "#171717",
    muted: "#ece9e7ff",
    popover: "#FFFFFF",
    popoverText: "#171717",
    // Feedback
    rating: "#F6B73C",
    success: "#3FA66B",
    successText: "#FFFFFF",
    warning: "#E57A28",
    warningText: "#FFFFFF",
    danger: "#DC2626",
    dangerText: "#FFFFFF",
    // Borders
    border: "#F1E5DC",
    borderAccent: "#FFD2B8",
    borderFocus: "#FFD2B8",
    // Input / Focus
    input: "#F1E5DC",
    ring: "#FFD2B8",
    // Utility
    shadow: "rgba(230, 140, 90, 0.08)",
    buttonShadow: "rgba(255, 90, 31, 0.35)",
    isDarkMode: false,
  },
  dark: {
    // Surfaces
    background: "#171311",
    foreground: "#29201C",
    surface: "#29201C",
    surfaceSecondary: "#211A17",
    surfaceSubtle: "#30251F",
    surfaceHigh: "#3D302A",
    surfaceAccent: "#4A2B1D",
    card: "#29201C",
    cardElevated: "#30251F",
    // Brand
    primary: "#FF6A2A",
    primaryText: "#FFFFFF",
    orangeGlow: "#FF6A2A",
    orangeTint: "#FF5A1F",
    brandOrange: "#FF6A2A",
    brandOrangeGlow: "#FF6A2A",
    // Text
    text: "#FFF8F2",
    textSecondary: "#C9BDB6",
    mutedText: "#8E817A",
    // Semantic
    secondary: "#211A17",
    secondaryText: "#FFF8F2",
    muted: "#30251F",
    popover: "#29201C",
    popoverText: "#FFF8F2",
    // Feedback
    rating: "#F6B73C",
    success: "#63C78A",
    successText: "#171311",
    warning: "#E57A28",
    warningText: "#171311",
    danger: "#FF6467",
    dangerText: "#FFFFFF",
    // Borders
    border: "#3D302A",
    borderAccent: "#5A453C",
    borderFocus: "#5A453C",
    // Input / Focus
    input: "#3D302A",
    ring: "#5A453C",
    // Utility
    shadow: "rgba(0, 0, 0, 0.5)",
    buttonShadow: "rgba(255, 106, 42, 0.32)",
    isDarkMode: true,
  },
};

export const useThemeColors = (): ColorsType => {
  const theme = useAtomValue(themeAtom);
  const systemColorScheme = useColorScheme();

  const isDarkMode =
    theme === "system" ? systemColorScheme === "dark" : theme === "dark";
  return isDarkMode ? Colors.dark : Colors.light;
};
