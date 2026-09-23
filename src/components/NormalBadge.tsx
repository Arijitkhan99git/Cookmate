import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

type BadgeProps = {
  badgeTitle: string;
};

const NormalBadge = ({ badgeTitle }: BadgeProps) => {
  const { orangeTint, isDarkMode, surfaceHigh } = useThemeColors();

  return (
    <View
      style={[
        styles.levelPill,
        { backgroundColor: isDarkMode ? surfaceHigh : "#e8d5c4ff" },
      ]}
    >
      <AppText
        style={{
          fontFamily: fonts.semibold,
          fontSize: 11,
          color: orangeTint,
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
