import { openExternalUrl } from "@/utils/openExternalUrl";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { AppText } from "@/components/AppText";
import { Bubbles, ExternalLink } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { fonts } from "../../constants/typography";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const MealBlogLinkCard = ({
  blogUrl,
  cardBg,
  textColor,
  secondaryTextColor,
  successColor,
  isDarkMode,
  surfaceHighColor,
  shadowStyle,
}: {
  blogUrl: string;
  cardBg: string;
  textColor: string;
  secondaryTextColor?: string;
  successColor: string;
  isDarkMode: boolean;
  surfaceHighColor: string;
  shadowStyle: any;
}) => {
  const scale = useSharedValue(1);
  const iconTranslateX = useSharedValue(0);
  const iconTranslateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: iconTranslateX.value },
      { translateY: iconTranslateY.value },
    ],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 250 });
    iconTranslateX.value = withSpring(3, { damping: 12 });
    iconTranslateY.value = withSpring(-3, { damping: 12 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    iconTranslateX.value = withSpring(0, { damping: 15 });
    iconTranslateY.value = withSpring(0, { damping: 15 });
  };

  const getDomain = (url: string) => {
    try {
      const formatted = url.startsWith("http") ? url : `https://${url}`;
      return new URL(formatted).hostname.replace(/^www\./, "");
    } catch {
      return "Original source";
    }
  };

  return (
    <AnimatedPressable
      style={[
        styles.mealBlogWrapper,
        shadowStyle,
        {
          backgroundColor: cardBg,
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.05)",
          borderWidth: 1,
        },
        animatedStyle,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => openExternalUrl(blogUrl)}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View
            style={{
              backgroundColor: isDarkMode
                ? "rgba(34, 197, 94, 0.15)"
                : "#e8f7ee",
              padding: 10,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bubbles size={22} color={successColor} />
          </View>
          <View style={{ gap: 2 }}>
            <AppText
              style={{
                fontFamily: fonts.bold,
                color: textColor,
                fontSize: 16,
              }}
            >
              See full recipe blog
            </AppText>
            <AppText
              style={{
                fontFamily: fonts.regular,
                color: secondaryTextColor ?? textColor,
                fontSize: 12,
                opacity: 0.7,
              }}
            >
              {getDomain(blogUrl)}
            </AppText>
          </View>
        </View>

        <Animated.View
          style={[
            {
              backgroundColor: isDarkMode ? surfaceHighColor : "#FFE0CC",
              padding: 10,
              borderRadius: 100,
            },
            iconAnimatedStyle,
          ]}
        >
          <ExternalLink size={18} color={textColor} style={{ opacity: 0.9 }} />
        </Animated.View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  mealBlogWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
