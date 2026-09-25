import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

type BadgeProps = {
  badgeTitle: string;
  lightBgColor?: string;
  darkBgColor?: string;
  fontFamily?: string;
  textColor?: string;
  lightTextColor?: string;
  darkTextColor?: string;
};

const NormalBadge = ({
  badgeTitle,
  lightBgColor = "#faf3e1ff",
  darkBgColor,
  fontFamily = fonts.semibold,
  textColor,
  lightTextColor,
  darkTextColor,
}: BadgeProps) => {
  const { orangeTint, isDarkMode, surfaceHigh } = useThemeColors();

  const backgroundColor = isDarkMode
    ? (darkBgColor ?? surfaceHigh)
    : lightBgColor;

  const color = isDarkMode
    ? (darkTextColor ?? textColor ?? orangeTint)
    : (lightTextColor ?? textColor ?? orangeTint);

  return (
    <View style={[styles.levelPill, { backgroundColor }]}>
      <AppText
        style={{
          fontFamily,
          fontSize: 11,
          color,
        }}
      >
        {badgeTitle}
      </AppText>
    </View>
  );
};

export default NormalBadge;

const styles = StyleSheet.create({
  levelPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
});
