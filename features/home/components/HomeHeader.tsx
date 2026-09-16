import { AppText } from "@/components/AppText";
import { useThemeColors } from "@/components/color-pallette";
import { Bell, Utensils } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

const HomeHeader = () => {
  const { text, muted, primary } = useThemeColors();

  return (
    <View
      style={{
        gap: 16,
      }}
    >
      {/* Top Section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo and App name */}
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

        {/* Notofication */}
        <View
          style={{
            backgroundColor: muted,
            padding: 10,
            borderRadius: 50,
            position: "relative",
          }}
        >
          <Bell color={text} size={20} />
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: primary,
              borderRadius: 50,
              position: "absolute",
              top: 0,
              right: 0,
            }}
          ></View>
        </View>
      </View>

      {/* Gretting Section */}
      <View>
        <Text style={[styles.grettingText, { color: text }]}>
          What's cooking
        </Text>
        <Text style={[styles.grettingText, { color: primary }]}>today?</Text>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  grettingText: {
    fontSize: 36,
    fontFamily: "sans-bold",
    lineHeight: 45,
  },
});
