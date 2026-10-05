import { BlurView } from "expo-blur";
import { Cookie, Timer, Utensils } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { fonts } from "../../../constants/typography";
import { AppText } from "../AppText";

export function FloatingBadgeTop() {
  return (
    <BlurView
      intensity={30}
      tint="light"
      style={[
        styles.badgePill,
        {
          position: "absolute",
          top: 60,
          left: 16,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: 1,
        },
      ]}
    >
      <Cookie color={"#ffcd98ff"} size={16} />

      <AppText
        style={{
          color: "#fff",
          fontFamily: fonts.semibold,
          fontSize: 11,
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        MEALMATE
      </AppText>
    </BlurView>
  );
}

export function FloatingBadgeBottom() {
  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={[
        styles.badgePill,
        {
          position: "absolute",
          top: "45%",
          left: "10%",
          backgroundColor: "rgba(75, 58, 58, 0.15)",
          borderColor: "rgba(133, 131, 131, 0.3)",
          borderWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 8,
        },
      ]}
    >
      <Timer color={"#fa9f3dff"} size={16} />

      <AppText
        style={{
          color: "#fff",
          fontFamily: fonts.semibold,
          fontSize: 10,
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        Quick & Fresh
      </AppText>
    </BlurView>
  );
}

export function FloatingBadgeRight() {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Ping pong bounce animation for the entire badge
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 15, // Drop down
          duration: 1300,
          easing: Easing.in(Easing.quad), // Accelerate going down
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0, // Bounce up
          duration: 1000,
          easing: Easing.out(Easing.quad), // Decelerate going up
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Blink animation for the active dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim, blinkAnim]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: "30%",
        right: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 5,
        overflow: "visible",
        transform: [{ translateY: bounceAnim }],
      }}
    >
      <BlurView
        intensity={60}
        tint="light"
        style={[
          styles.badgePill,
          {
            backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent for glass
            paddingHorizontal: 6,
            paddingVertical: 6,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "rgba(188, 181, 181, 0.7)",
            gap: 12,
            overflow: "hidden", // Important for BlurView border radius
          },
        ]}
      >
        {/* Icon Circle */}
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#fcdbc3",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Utensils color="#a93a12" size={16} />
        </View>

        {/* Text block */}
        <View style={{ paddingRight: 10 }}>
          <AppText
            style={{
              color: "#222",
              fontFamily: fonts.bold,
              fontSize: 12,
            }}
          >
            10k+ Recipes
          </AppText>
          <AppText
            style={{
              color: "#84553bff",
              fontFamily: fonts.medium,
              fontSize: 11,
            }}
          >
            Chef Curated
          </AppText>
        </View>
      </BlurView>

      {/* Active Dot */}
      <Animated.View
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#f37a3c",
          opacity: blinkAnim,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badgePill: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    overflow: "hidden",
  },
});
