import { Text, TextProps } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

export function SectionHeading({ style, ...props }: TextProps) {
  const { text: textColor } = useThemeColors();

  return (
    <Text
      style={[
        { fontFamily: fonts.semibold, color: textColor, fontSize: 16 },
        style,
      ]}
      {...props}
    />
  );
}
