import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  FaceGrinning,
  FaceSlightlySmiling,
  User,
  Utensils,
} from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { AppText } from "../AppText";
import { FloatingBadgeBottom, FloatingBadgeRight, FloatingBadgeTop } from "./FloatingBadges";
import ImageDetails from "./ImageDetails";

interface WelcomingScreenProps {
  onStart?: () => void;
}

function StatIcon() {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={[styles.statIconWrapper, { backgroundColor: "#f1c4b5ff" }]}>
        <User color={"#783939ff"} size={16} />
      </View>
      <View
        style={[
          styles.statIconWrapper,
          { backgroundColor: "#fdcf6aff", marginLeft: -8 },
        ]}
      >
        <FaceGrinning color={"#482424ff"} size={16} />
      </View>

      <View
        style={[
          styles.statIconWrapper,
          { backgroundColor: "#f5a594ff", marginLeft: -8 },
        ]}
      >
        <FaceSlightlySmiling color={"#471e1eff"} size={16} />
      </View>
    </View>
  );
}
export default function WelcomingScreen({ onStart }: WelcomingScreenProps) {
  const { text, background, primary, surface, card } = useThemeColors();

  return (
    <View style={styles.container}>
      {/* Background image fills most of the screen */}
      <View style={[styles.imageContainer]}>
        <Image
          source={require("@/assets/images/welcoming_img1.jpg")}
          style={styles.imageBox}
          contentFit="cover"
        />

        <View style={styles.darkOverlay} />

        {/* Gradient fade – blends the bottom of the image into the card */}
        <LinearGradient
          colors={["transparent", "#333131ff"]}
          style={styles.fadeGradient}
          pointerEvents="none"
        />

        <FloatingBadgeTop />
        <FloatingBadgeBottom />
        <FloatingBadgeRight />
        <ImageDetails />
      </View>

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
            style={{ color: "#fff", fontFamily: fonts.medium, fontSize: 16 }}
          >
            Let's Start Cooking
          </AppText>

          <View style={styles.iconWrapper}>
            <Utensils color={"#ab4040ff"} size={20} />
          </View>
        </Pressable>

        {/* stats */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StatIcon />
          <View style={{ flexDirection: "row" }}>
            <AppText style={{ color: surface }}>
              Joined by{" "}
              <AppText
                style={{ color: "#353434ff", fontFamily: fonts.semibold }}
              >
                45,000+
              </AppText>{" "}
              happy home cooks
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: "75%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    marginBottom: 30,
  },
  imageBox: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(69, 65, 65, 0.4)",
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fadeGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "15%",
    // how tall the fade is
  },
  footer: {
    paddingHorizontal: 18,
    paddingVertical: 28,
    paddingBottom: 40,
    alignItems: "center",
    gap: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  statIconWrapper: {
    position: "relative",
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    overflow: "hidden",
  },
});
