import { AppText } from "@/components/AppText";
import { Coffee, Croissant, TrendingUp } from "lucide-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { SectionHeading } from "../../home/components/SectionHeading";
// ─── Types ──────────────────────────────────────────────────────────────────

interface Milestone {
  icon: React.ReactNode;
  iconLightBg: string;
  iconDarkBg: string;
  label: string;
  badge: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  {
    icon: <Coffee color={"#232222ff"} strokeWidth={2} size={24} />,
    iconLightBg: "#e1c8bdff",
    iconDarkBg: "#cfaa9bff",
    label: "Master of\nSearing",
    badge: "Perfect Char",
  },
  {
    icon: <TrendingUp color={"#1f1e1eff"} strokeWidth={2} size={24} />,
    iconLightBg: "#f5b397ff",
    iconDarkBg: "#e18862ff",
    label: "30-Day Streak",
    badge: "Daily Chef",
  },
  {
    icon: <Croissant color={"#1f1e1eff"} strokeWidth={2} size={24} />,
    iconLightBg: "#ebd293ff",
    iconDarkBg: "rgba(215, 181, 113, 1)",
    label: "Croissant Artisan",
    badge: "Fresh Dough",
  },
];

function MilestoneCard({ item }: { item: Milestone }) {
  const {
    card,
    text: textColor,
    background,
    textSecondary,
    isDarkMode,
  } = useThemeColors();

  return (
    <View style={[styles.card, { backgroundColor: card }]}>
      <View
        style={[
          styles.iconBox,
          { backgroundColor: isDarkMode ? item.iconDarkBg : item.iconLightBg },
        ]}
      >
        {item.icon}
      </View>
      <AppText
        style={{
          fontSize: 12,
          fontFamily: fonts.medium,
          color: textColor,
          textAlign: "center",
          opacity: 0.9,
          marginBottom: 4,
        }}
      >
        {item.label}
      </AppText>
      <AppText
        style={{
          fontSize: 11,
          color: textSecondary,
          textAlign: "center",
        }}
      >
        {item.badge}
      </AppText>

      <View
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          height: 35,
          width: 35,
          borderRadius: 50,
          overflow: "hidden",
          backgroundColor: background,
        }}
      ></View>
    </View>
  );
}

export default function MileStonesCard() {
  return (
    <View style={styles.container}>
      <SectionHeading>Milestones</SectionHeading>
      <View style={{ flexDirection: "row", gap: 12 }}>
        {MILESTONES.map((item, index) => (
          <MilestoneCard key={index} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,

    paddingHorizontal: 8,
    paddingVertical: 14,
    borderRadius: 6,
  },
  iconBox: {
    borderRadius: 50,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
});
