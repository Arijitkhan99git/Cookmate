import { Star } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

const RatingBadge = () => {
  const {
    text: textColor,

    isDarkMode,
    secondaryText,
    rating,
  } = useThemeColors();
  const ratingBg = isDarkMode ? "#5e4a4aff" : "#f4e5c9ff";

  return (
    <View style={[styles.statPill, { backgroundColor: ratingBg }]}>
      <Star size={16} fill={rating} stroke={rating} />
      <AppText
        style={{ color: textColor, fontFamily: fonts.bold, fontSize: 12 }}
      >
        4.8
      </AppText>
      <AppText style={{ color: textColor, opacity: 0.8, fontSize: 12 }}>
        (1.2k)
      </AppText>
    </View>
  );
};

export default RatingBadge;

const styles = StyleSheet.create({
  statPill: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 60,
    overflow: "hidden",
  },
});
