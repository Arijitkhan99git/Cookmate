import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Network from "expo-network";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../constants/color-pallette";
import { getStoredSavedIds, savedIdsAtom } from "../../store/saved-store";
import { getStoredThemePreference, themeAtom } from "../../store/theme-store";
import WelcomingScreen from "../components/WelcomingScreen";

onlineManager.setEventListener((setOnline) => {
  let initialised = false;

  // Listen for changes
  const eventSubscription = Network.addNetworkStateListener((state) => {
    initialised = true;
    setOnline(!!state.isConnected);
  });

  // Fetch the initial state immediately on boot
  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) {
        setOnline(!!state.isConnected);
      }
    })
    .catch(() => {
      /* Handle optional native error safely */
    });

  // Return unsubscribe cleanup function
  return () => {
    if (eventSubscription && typeof eventSubscription.remove === "function") {
      eventSubscription.remove();
    }
  };
});

export default function RootLayout() {
  // Create a client
  const queryClient = new QueryClient();

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

  //    * Synchronous atom holding saved recipe IDs.
  //  * Hydrate once on app mount:

  const [, setSavedIds] = useAtom(savedIdsAtom);

  useEffect(() => {
    getStoredSavedIds().then(setSavedIds);
  }, []);

  // ── Welcome screen gate ───────────────────────────────────────────
  // Default false = show welcome screen immediately (no black screen).
  // AsyncStorage check upgrades to true for returning users.
  const [welcomeSeen, setWelcomeSeen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("cookmate-welcome-seen").then((val) => {
      if (val === "true") setWelcomeSeen(true);
    });
  }, []);

  const handleStart = async () => {
    await AsyncStorage.setItem("cookmate-welcome-seen", "true");
    setWelcomeSeen(true);
  };

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

  // Wait for both fonts and the AsyncStorage check to complete
  if (!fontsLoaded) return null;

  // Show welcome screen on first launch
  if (!welcomeSeen) {
    return (
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <WelcomingScreen
        // onStart={handleStart}
        />
        <StatusBar style={colors.isDarkMode ? "light" : "dark"} />
      </SafeAreaView>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: colors.background }}
      >
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
      </SafeAreaView>
    </QueryClientProvider>
  );
}
