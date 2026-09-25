import { Heart } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";

type BookmarkButtonProps = {
  mealId?: string;
  initialSaved?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  size?: number;
};

export const BookmarkButton = ({
  mealId,
  initialSaved = false,
  onPress,
  style,
  size = 16,
}: BookmarkButtonProps) => {
  const [saved, setSaved] = useState(initialSaved);
  const { isDarkMode } = useThemeColors();

  const handleToggle = () => {
    setSaved((prev) => !prev);
    if (onPress) onPress();
  };

  const btnBg = isDarkMode ? "rgba(42, 34, 30, 0.9)" : "#FFFFFFFF";
  const activeColor = "#E53935";
  const inactiveColor = isDarkMode ? "#FFF8F2" : "#444444";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: btnBg,
          opacity: pressed ? 0.75 : 1,
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
        style,
      ]}
      onPress={handleToggle}
      hitSlop={8}
    >
      <Heart
        size={size}
        fill={saved ? activeColor : "none"}
        stroke={saved ? activeColor : inactiveColor}
      />
    </Pressable>
  );
};

export default BookmarkButton;

const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
