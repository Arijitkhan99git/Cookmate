import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";
import { AppText } from "./AppText";

interface WelcomingScreenProps {
  onStart?: () => void;
}

export default function WelcomingScreen({ onStart }: WelcomingScreenProps) {
  const { text, background, primary } = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Background image fills most of the screen */}
      <Image
        source={require("@/assets/images/welcoming_img1.jpg")}
        style={styles.image}
        contentFit="cover"
      />

      {/* CTA button anchored to the bottom */}
      <View style={[styles.footer, { backgroundColor: background }]}>
        <Pressable
          onPress={onStart}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <AppText
            style={{ color: "#fff", fontFamily: fonts.semibold, fontSize: 16 }}
          >
            Let's Start Cooking 🍳
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    paddingBottom: 40,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
