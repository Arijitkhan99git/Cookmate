import { AppText } from "@/components/AppText";
import NormalBadge from "@/components/NormalBadge";
import { LinearGradient } from "expo-linear-gradient";
import { Flame } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";

export default function ProfileCard() {
  const {
    surfaceAccent,
    text: textColor,
    textSecondary,
    primary,
    surfaceSubtle,
    card,
    border,
    isDarkMode,
    orangeTint,
    surfaceHigh,
  } = useThemeColors();

  const shadowStyle = useGenericShadow(2);

  const secondGradientColors = isDarkMode
    ? ([card, "#2e1d12ff", "#462d1eff"] as const)
    : (["#ffffffff", "#feeee1ff", "#ffe0c8ff"] as const);

  return (
    <LinearGradient
      colors={secondGradientColors}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[
        shadowStyle,
        {
          alignItems: "center",
          gap: 6,
          borderRadius: 18,
          padding: 16,
        },
      ]}
    >
      {/* Avatar */}
      <View style={{ position: "relative", marginBottom: 4 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: surfaceAccent,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 3,
            borderColor: primary,
          }}
        >
          <AppText style={{ fontSize: 36 }}>👨‍🍳</AppText>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: primary,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: card,
          }}
        >
          <AppText style={{ fontSize: 11 }}>📷</AppText>
        </View>
      </View>

      {/* Name + Pro badge */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <AppText
          style={{
            fontSize: 22,
            fontFamily: fonts.bold,
            color: textColor,
            opacity: 0.9,
          }}
        >
          Arijit
        </AppText>
        {/* User Tag Badge */}
        <View>
          <NormalBadge
            badgeTitle="PRO"
            fontFamily={fonts.semibold}
            lightBgColor="#eadbceff"
            lightTextColor={orangeTint}
          />
        </View>
      </View>

      <AppText
        style={{
          fontSize: 13,
          fontFamily: fonts.medium,
          color: isDarkMode ? "#c4a487ff" : "#ca9a70ff",
        }}
      >
        Culinary Enthusiast & Home Cook
      </AppText>

      {/* Level badge */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: surfaceSubtle,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Flame size={16} color={"#b7863cff"} fill={"#b7863cff"} />
        <AppText
          style={{
            fontSize: 12,
            color: primary,
            fontFamily: fonts.semibold,
          }}
        >
          Level 4 Gourmet
        </AppText>
      </View>

      {/* Stats row */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 12,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: border,
          paddingTop: 14,
        }}
      >
        {[
          { value: "18", label: "Saved" },
          { value: "42", label: "Cooked" },
          { value: "12", label: "Custom" },
          { value: "4.9", label: "Rating" },
        ].map((stat, i, arr) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth:
                i < arr.length - 1 ? StyleSheet.hairlineWidth : 0,
              borderRightColor: border,
            }}
          >
            <AppText
              style={{
                fontSize: 22,
                fontFamily: fonts.bold,
                color: textColor,
                opacity: 0.8,
              }}
            >
              {stat.value}
            </AppText>
            <AppText
              style={{
                fontSize: 11,
                color: textSecondary,
                marginTop: 2,
              }}
            >
              {stat.label}
            </AppText>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
