import { AppText } from "@/components/AppText";
import { Utensils } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";

const AppHeader = () => {
  const { text, primary } = useThemeColors();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          backgroundColor: primary,
          padding: 8,
          borderRadius: 50,
        }}
      >
        <Utensils color="#fff" size={25} />
      </View>
      <AppText
        style={{
          color: text,
          fontSize: 20,
          fontFamily: "sans-semibold",
          opacity: 0.9,
        }}
      >
        MealMate
      </AppText>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
