import { AppText } from "@/components/AppText";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { Image } from "expo-image";
import { Play, Video } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";
import { fonts } from "../../constants/typography";
import { SectionHeading } from "../home/components/SectionHeading";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getYoutubeVideoId = (url: string | null): string | null => {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

interface WatchRecipeProps {
  videoUrl: string | null;
  imageUrl?: string | null;
}

const WatchRecipe = ({ videoUrl, imageUrl }: WatchRecipeProps) => {
  const { text: textColor, primary, isDarkMode } = useThemeColors();
  const cardShadow = useGenericShadow(2);
  const [imageError, setImageError] = useState(false);

  const scale = useSharedValue(1);
  const playButtonScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const playBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
  }));

  if (!videoUrl || !videoUrl.trim()) {
    return null;
  }

  const videoId = getYoutubeVideoId(videoUrl);
  const youtubeThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  const displayImage =
    !imageError && youtubeThumbnail ? youtubeThumbnail : imageUrl;

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 250 });
    playButtonScale.value = withSpring(1.12, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
    playButtonScale.value = withSpring(1, { damping: 15, stiffness: 180 });
  };

  return (
    <View style={styles.container}>
      {/* Section Title */}

      <View style={{ marginTop: 4, marginBottom: 12 }}>
        <SectionHeading>Watch Recipe</SectionHeading>
      </View>

      {/* Video Card */}
      <AnimatedPressable
        style={[
          styles.card,
          cardShadow,
          {
            borderColor: isDarkMode
              ? "rgba(255, 255, 255, 0.12)"
              : "rgba(0, 0, 0, 0.06)",
          },
          animatedStyle,
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => openExternalUrl(videoUrl)}
      >
        {/* Thumbnail Image */}
        {displayImage ? (
          <Image
            source={{ uri: displayImage }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={300}
            onError={() => setImageError(true)}
          />
        ) : (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: isDarkMode ? "#2A2A2E" : "#E2E8F0" },
            ]}
          />
        )}

        {/* Gradient / Dark Overlay */}
        <View style={styles.overlay} />

        {/* Center Play Button */}
        <View style={styles.playBtnContainer}>
          <Animated.View
            style={[
              styles.playBtn,
              { backgroundColor: primary },
              playBtnAnimatedStyle,
            ]}
          >
            <Play
              size={28}
              color="#FFFFFF"
              fill="#FFFFFF"
              style={{ marginLeft: 3 }}
            />
          </Animated.View>
        </View>

        {/* Tag at bottom left */}
        <View
          style={[
            styles.tagPill,
            {
              backgroundColor: isDarkMode
                ? "rgba(24, 24, 27, 0.88)"
                : "rgba(245, 245, 245, 0.94)",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            },
          ]}
        >
          <Video size={18} color={primary} />
          <AppText
            style={[
              styles.tagText,
              { color: isDarkMode ? "#FFFFFF" : "#1F2937" },
            ]}
          >
            Step-by-step masterclass
          </AppText>
        </View>
      </AnimatedPressable>
    </View>
  );
};

export default WatchRecipe;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  card: {
    height: 225,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.32)",
  },
  playBtnContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF5A1F",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 8,
  },
  tagPill: {
    position: "absolute",
    left: 14,
    bottom: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: fonts.bold,
    fontSize: 12,
  },
});
