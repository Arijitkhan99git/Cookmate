import { fonts } from "@/components/typography";
import { BottomTabBarProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Bookmark, House, LucideIcon, Search, User } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColors } from "./color-pallette";

const ICONS: Record<string, LucideIcon> = {
  index: House,
  search: Search,
  saved: Bookmark,
  profile: User,
};

const LABELS: Record<string, string> = {
  index: "Home",
  search: "Search",
  saved: "Saved",
  profile: "Profile",
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { foreground, surfaceSubtle, orangeGlow, isDarkMode } =
    useThemeColors();

  const inactiveColor = isDarkMode ? "#aca19bff" : "#705E54";
  // Active pill bg is slightly off from the tab bar bg so it's visible
  const activePillBg = isDarkMode ? "#3D302A" : "#f9f7f5ff";
  const activeShadow = isDarkMode ? "#000000" : "#D4784A";

  return (
    <View
      style={[
        styles.container,
        {
          bottom: Math.max(insets.bottom + 8, 20),
          backgroundColor: foreground,
          shadowColor: isDarkMode ? "#000000" : "#C08060",
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const Icon = ICONS[route.name] ?? House;
        const label = LABELS[route.name] ?? route.name;
        const color = isFocused ? orangeGlow : inactiveColor;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            <View
              style={[
                styles.pill,
                isFocused && [
                  styles.activePill,
                  {
                    backgroundColor: activePillBg,
                    shadowColor: activeShadow,
                  },
                ],
              ]}
            >
              <Icon
                color={color}
                size={22}
                strokeWidth={isFocused ? 2.2 : 1.8}
              />
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  { color },
                  isFocused && styles.activeLabel,
                ]}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderRadius: 35,
    paddingHorizontal: 6,
    // iOS outer shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    // Android outer shadow
    elevation: Platform.OS === "android" ? 8 : 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  pill: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 30,
    gap: 2,
    minWidth: 80,
    overflow: "hidden",
  },
  activePill: {
    // iOS pill shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    // Android
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
    letterSpacing: 0.1,
  },
  activeLabel: {
    fontFamily: fonts.semibold,
  },
});
