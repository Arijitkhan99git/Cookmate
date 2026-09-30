import { AppText } from "@/components/AppText";

import { TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

export function SectionHeader({
  title,
  right,
  onRightPress,
}: {
  title: string;
  right?: string;
  onRightPress?: () => void;
}) {
  const { text: textColor, isDarkMode } = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <AppText
        style={{ fontSize: 16, fontFamily: fonts.semibold, color: textColor }}
      >
        {title}
      </AppText>
      {right && (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
          <AppText
            style={{
              fontSize: 13,
              color: isDarkMode ? "#d87b59ff" : "#df724aff",

              fontFamily: fonts.medium,
            }}
          >
            {right}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}
