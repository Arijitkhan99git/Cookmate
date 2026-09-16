import { Search, Soup } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";

const HomeSearch = () => {
  const [inputText, setInputText] = useState("");
  const { foreground, orangeGlow, primary, mutedText, isDarkMode } =
    useThemeColors();

  const iconColor = isDarkMode ? "#8E817A" : "#A07060";

  return (
    <View
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
      <TextInput
        style={[styles.input, { color: isDarkMode ? "#FFF8F2" : "#3D2B1F" }]}
        placeholder="Let's cook something..."
        placeholderTextColor={mutedText}
        onChangeText={setInputText}
        value={inputText}
        returnKeyType="search"
      />

      {/* Right search button */}
      <Pressable
        style={({ pressed }) => [
          styles.searchButton,
          {
            backgroundColor: primary,
            opacity: pressed ? 0.85 : 1,
            shadowColor: orangeGlow,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Search color="#FFFFFF" size={20} strokeWidth={2.5} />
      </Pressable>
    </View>
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
    marginRight: 10,
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
