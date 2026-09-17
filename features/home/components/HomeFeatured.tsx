import { AppText } from "@/components/AppText";
import { ArrowRight } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { SectionHeading } from "./SectionHeading";

const HomeFeatured = () => {
  const { primary, orangeTint, isDarkMode } = useThemeColors();

  const swipeTint = isDarkMode ? "#dc956dff" : "#8d6046ff";

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={{ gap: 0 }}>
          <AppText style={{ color: orangeTint, fontSize: 11 }}>
            CHEF'S SPOTLIGHT
          </AppText>
          <SectionHeading>Popular Lunch</SectionHeading>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <AppText
            style={{
              color: swipeTint,
              fontSize: 13,
              includeFontPadding: false,
              textAlignVertical: "center",
            }}
          >
            Swipe
          </AppText>
          <ArrowRight size={15} color={swipeTint} />
        </View>
      </View>

      <View></View>
    </View>
  );
};

export default HomeFeatured;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
});
