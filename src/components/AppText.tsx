import { Text, TextProps } from "react-native";
import { fonts } from "../../constants/typography";

export function AppText({ style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: fonts.regular,
          includeFontPadding: false,
          // textAlignVertical: "center",
        },
        style,
      ]}
      {...props}
    />
  );
}
