import { AppText } from "@/components/AppText";
import { Flame } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useFetchRandomMeal } from "../../../api/hooks/useRandomMeal";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { SectionHeading } from "./SectionHeading";

const DiscoverySection = () => {
  const { orangeTint, isDarkMode } = useThemeColors();
  const { data } = useFetchRandomMeal();

  //   console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={{ gap: 0 }}>
          <AppText
            style={{
              color: orangeTint,
              fontSize: 11,
              textTransform: "uppercase",
            }}
          >
            Trending Right Now
          </AppText>
          <SectionHeading>Recipe of the Moment</SectionHeading>
        </View>

        <View style={[styles.badge, { backgroundColor: "#d2ae66ff" }]}>
          <Flame size={15} color="#2a2929ff" />
          <AppText
            style={{
              fontFamily: fonts.medium,
              fontSize: 11,
              color: "#2a2929ff",
            }}
          >
            Popular
          </AppText>
        </View>
      </View>

      {/* Random Meal Card */}
      <View></View>
    </View>
  );
};

export default DiscoverySection;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 15,
  },
  badge: {
    flexDirection: "row",
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 50,
  },
});
