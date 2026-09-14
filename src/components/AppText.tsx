import { fonts } from "@/components/typography";
import { Text, TextProps } from "react-native";

export function AppText({ style, ...props }: TextProps) {
  return <Text style={[{ fontFamily: fonts.regular }, style]} {...props} />;
}
