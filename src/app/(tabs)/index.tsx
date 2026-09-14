import { AppText } from "@/components/AppText";
import { useThemeColors } from "@/components/color-pallette";
import { useAtom } from "jotai";
import { StyleSheet, Switch, Text, View } from "react-native";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

export default function Index() {
  const { background, text } = useThemeColors();
  const colors = useThemeColors();
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = colors.isDarkMode;

  const toggleSwitch = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    setStoredThemePreference(next);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: background }}>
        <Text
          style={{
            color: text,
            fontFamily: "sans-regular",
            fontSize: 15,
          }}
        >
          Edit src/app/index.tsx to edit this screen.
        </Text>

        <AppText style={{ color: text, fontSize: 15, userSelect: "text" }}>
          Edit src/app/index.tsx to edit this screen.
        </AppText>

        <View style={{ padding: 10 }}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isDark}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
