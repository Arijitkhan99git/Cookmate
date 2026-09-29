import { AppText } from "@/components/AppText";
import { BookmarkCheck } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";

export default function SavedHeader({ mealCount }: { mealCount: number }) {
  const {
    primary,
    isDarkMode,
    text: textColor,
    secondaryText,
  } = useThemeColors();

  return (
    <View style={{ gap: 5 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <BookmarkCheck
          size={32}
          fill={primary}
          stroke={isDarkMode ? "#000" : "#fff"}
          strokeWidth={1.8}
        />

        <AppText
          style={{
            color: textColor,
            fontSize: 26,
            fontFamily: "sans-semibold",
          }}
        >
          My Saved Recipes
        </AppText>
      </View>

      <View>
        <AppText
          style={{
            color: secondaryText,
            fontSize: 14,
          }}
        >
          {mealCount} recipes bookmarked for cooking
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
