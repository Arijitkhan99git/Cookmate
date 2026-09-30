import { AppText } from "@/components/AppText";
import { useRouter } from "expo-router";
import { Search, Soup } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";

const HomeSearch = () => {
  const router = useRouter();

  const [inputText, setInputText] = useState("");
  const { foreground, orangeGlow, primary, mutedText, isDarkMode } =
    useThemeColors();

  const iconColor = isDarkMode ? "#8E817A" : "#A07060";

  const hanldeSearch = () => {
    router.push({ pathname: "/(tabs)/search", params: { focus: "true" } });
  };

  return (
    <Pressable
      onPress={hanldeSearch}
      style={[
        styles.container,
        {
          backgroundColor: foreground,
          shadowColor: isDarkMode ? "#000000" : "#C08060",
        },
      ]}
    >
      {/* Left ladle icon */}
      <Soup
        color={iconColor}
        size={22}
        strokeWidth={1.8}
        style={styles.leftIcon}
      />

      {/* Text input */}
      <AppText style={[styles.input, { color: mutedText }]}>
        Let's cook something...
      </AppText>

      {/* Right search button */}
      <View
        style={[
          styles.searchButton,
          {
            backgroundColor: primary,
            shadowColor: orangeGlow,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Search color="#FFFFFF" size={20} strokeWidth={2.5} />
      </View>
    </Pressable>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    // Android shadow
    elevation: Platform.OS === "android" ? 8 : 0,
  },
  leftIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    fontSize: 15.5,
    fontFamily: "sans-regular",
    paddingVertical: 12,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    // iOS button shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    // Android
    elevation: Platform.OS === "android" ? 6 : 0,
  },
});
