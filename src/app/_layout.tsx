import { useThemeColors } from "@/components/color-pallette";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { Platform, View } from "react-native";
import { getStoredThemePreference, themeAtom } from "../../store/theme-store";

export default function RootLayout() {
  const [, setTheme] = useAtom(themeAtom);
  const colors = useThemeColors();

  // Runs once on app launch — reads persisted preference and initialises the atom
  useEffect(() => {
    (async () => {
      const stored = await getStoredThemePreference();
      setTheme(stored ?? (Platform.OS === "ios" ? "system" : "light"));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigationTheme = useMemo(() => {
    const base = colors.isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        card: colors.foreground,
        text: colors.text,
        border: colors.surface,
        primary: colors.primary,
      },
    };
  }, [colors]);

  const [fontsLoaded] = useFonts({
    "sans-regular": require("@/assets/fonts/PlusJakartaSans-Regular.ttf"),
    "sans-bold": require("@/assets/fonts/PlusJakartaSans-Bold.ttf"),
    "sans-medium": require("@/assets/fonts/PlusJakartaSans-Medium.ttf"),
    "sans-semibold": require("@/assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "sans-extrabold": require("@/assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "sans-light": require("@/assets/fonts/PlusJakartaSans-Light.ttf"),
  });

  // In _layout.tsx
  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemeProvider value={navigationTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
      <StatusBar style={colors.isDarkMode ? "light" : "dark"} />
    </View>
  );
}
