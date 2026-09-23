import { Bookmark } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";

const CommonBookmark = ({
  mealId,
  customStyle,
}: {
  mealId: string;
  customStyle?: StyleProp<ViewStyle>;
}) => {
  const [saved, setSaved] = useState(false);

  const { text: strockColor, primary, surfaceHigh } = useThemeColors();

  const handleBookMark = () => {
    setSaved((prev) => !prev);
    console.log(mealId);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.bookmarkBtn,
        customStyle,
        {
          backgroundColor: surfaceHigh,
          opacity: pressed ? 0.7 : 1,
          transform: [{ scale: pressed ? 0.92 : 1 }],
        },
      ]}
      onPress={handleBookMark}
      hitSlop={8}
    >
      <Bookmark
        size={18}
        stroke={saved ? primary : strockColor}
        fill={saved ? primary : "none"}
      />
    </Pressable>
  );
};

export default CommonBookmark;

const styles = StyleSheet.create({
  bookmarkBtn: {
    // position: "absolute",
    // top: 8,
    // right: 8,
    width: 38,
    height: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
});
