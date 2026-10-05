import { Sparkles } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { fonts } from "../../../constants/typography";
import { AppText } from "../AppText";

export default function ImageDetails() {
  const yellow = "#f6cd48ff";
  return (
    <View style={{ position: "absolute", left: 16, bottom: 20, gap: 4 }}>
      <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
        <Sparkles color={yellow} fill={yellow} size={14} />
        <AppText
          style={[
            styles.textShadow,
            {
              color: yellow,
              fontSize: 12,
              fontFamily: fonts.medium,
              textTransform: "uppercase",
            },
          ]}
        >
          Your Everyday Culinary Muse
        </AppText>
      </View>

      <View style={{ paddingVertical: 8 }}>
        <AppText
          style={[
            styles.textShadow,
            {
              color: "#fff",
              fontSize: 44,
              fontFamily: fonts.bold,
              lineHeight: 42,
            },
          ]}
        >
          Let's cook{"\n"}something{"\n"}
          <AppText
            style={[
              styles.textShadow,
              ,
              {
                color: "#ffb38a",
                fontSize: 44,
                fontFamily: fonts.bold,
                lineHeight: 50,
              },
            ]}
          >
            amazing!
          </AppText>
        </AppText>
      </View>

      <AppText
        style={[
          styles.textShadow,
          {
            color: "#ebe8e8ff",
            fontSize: 14,
            fontFamily: fonts.medium,
            lineHeight: 24,
            marginTop: 8,
            paddingRight: 20,
          },
        ]}
      >
        Discover delicious recipes, explore new {"\n"} flavors, and make every
        meal special.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
