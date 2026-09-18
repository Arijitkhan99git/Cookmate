// import { Text, View } from "react-native";
// import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// const Saved = () => {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut}>
//         <Text style={{ color: "white" }}>Appears with a fade</Text>
//       </Animated.View>
//     </View>
//   );
// };

// export default Saved;

import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function FadeInCard() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    scale.value = withSpring(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.text}>Hello Reanimated</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#4f46e5",
  },
  text: { color: "white", fontSize: 16, fontWeight: "600" },
});
