import { useAtom, useAtomValue } from "jotai";
import { Bookmark } from "lucide-react-native";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { isSavedAtom, toggleSavedAtom } from "../../store/saved-store";

const CommonBookmark = ({
  mealId,
  customStyle,
}: {
  mealId: string;
  customStyle?: StyleProp<ViewStyle>;
}) => {
  const [, toggleSaved] = useAtom(toggleSavedAtom);
  const isSaved = useAtomValue(isSavedAtom(mealId));

  const { text: strockColor, primary, surfaceHigh } = useThemeColors();

  const handleBookMark = () => {
    toggleSaved(mealId);
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
        stroke={isSaved ? primary : strockColor}
        fill={isSaved ? primary : "none"}
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
