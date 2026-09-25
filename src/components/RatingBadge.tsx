import { Star } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

type RatingBadgeProps = {
  ratingValue?: number | string;
  ratingCount?: string;
  backgroundColor?: string;
  textColor?: string;
  starSize?: number;
  showCount?: boolean;
};

const RatingBadge = ({
  ratingValue = "4.8",
  ratingCount = "1.2k",
  backgroundColor,
  textColor,
  starSize = 14,
  showCount = true,
}: RatingBadgeProps) => {
  const {
    text: defaultTextColor,
    isDarkMode,
    rating: starColor,
  } = useThemeColors();

  const ratingBg = backgroundColor || (isDarkMode ? "#5e4a4aff" : "#f4e5c9ff");
  const finalTextColor = textColor || defaultTextColor;

  return (
    <View style={[styles.statPill, { backgroundColor: ratingBg }]}>
      <Star size={starSize} fill={starColor} stroke={starColor} />
      <AppText
        style={{ color: finalTextColor, fontFamily: fonts.bold, fontSize: 12 }}
      >
        {ratingValue}
      </AppText>
      {showCount && ratingCount ? (
        <AppText style={{ color: finalTextColor, opacity: 0.8, fontSize: 12 }}>
          ({ratingCount})
        </AppText>
      ) : null}
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
