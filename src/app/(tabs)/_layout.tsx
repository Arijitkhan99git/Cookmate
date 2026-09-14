import { useThemeColors } from "@/components/color-pallette";
import { Tabs } from "expo-router";
import { Bookmark, House, Search, User } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { components } from "../../../constants/theme";

const Tablayout = () => {
  const insets = useSafeAreaInsets();
  const tabBar = components.tabBar;
  const { foreground, orangeGlow, textSecondary } = useThemeColors();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: orangeGlow,
          tabBarInactiveTintColor: textSecondary,
          tabBarStyle: {
            position: "absolute",
            bottom: Math.max(insets.bottom, tabBar.horizontalInset),
            height: tabBar.height,
            marginHorizontal: 30,
            borderRadius: tabBar.radius,
            backgroundColor: foreground,
            borderTopWidth: 0,
            elevation: 0,
          },
          //   tabBarItemStyle: {
          //     paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
          //   },
          tabBarIconStyle: {
            width: tabBar.iconFrame,
            height: tabBar.iconFrame,
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <House color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Search color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Bookmark color={color} size={size} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          }}
        />
      </Tabs>
    </>
  );
};

export default Tablayout;
