import AppHeader from "@/components/AppHeader";
import { AppText } from "@/components/AppText";
import { useAtom } from "jotai";
import React, { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

// ─── Types ──────────────────────────────────────────────────────────────────

type MilestoneStatus = "active" | "unlocked" | "locked";

interface Milestone {
  icon: string;
  label: string;
  badge: string;
  status: MilestoneStatus;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const MILESTONES: Milestone[] = [
  {
    icon: "🍳",
    label: "Master of\nSearing",
    badge: "Bronze",
    status: "unlocked",
  },
  { icon: "🔥", label: "30-Day Streak", badge: "Active", status: "active" },
  { icon: "🍝", label: "Pasta Artisan", badge: "Silver", status: "unlocked" },
];

const DIETARY_TAGS = ["High Protein", "Low Carb", "Pescatarian"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function DietTag({ label, primary }: { label: string; primary: boolean }) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primary ? colors.primary : colors.muted,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
      }}
    >
      {primary && <AppText style={{ fontSize: 11 }}>⚡</AppText>}
      <AppText
        style={{
          color: primary ? "#fff" : colors.textSecondary,
          fontSize: 12,
          fontFamily: fonts.medium,
        }}
      >
        {label}
      </AppText>
    </View>
  );
}

function SectionHeader({
  title,
  right,
  onRightPress,
}: {
  title: string;
  right?: string;
  onRightPress?: () => void;
}) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
      }}
    >
      <AppText
        style={{ fontSize: 16, fontFamily: fonts.semibold, color: colors.text }}
      >
        {title}
      </AppText>
      {right && (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
          <AppText
            style={{
              fontSize: 13,
              color: colors.primary,
              fontFamily: fonts.medium,
            }}
          >
            {right}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 18,
      }}
    >
      {children}
    </View>
  );
}

function MilestoneCard({ item }: { item: Milestone }) {
  const colors = useThemeColors();
  const isActive = item.status === "active";
  const isLocked = item.status === "locked";

  const badgeColor = isActive
    ? colors.primary
    : isLocked
      ? colors.muted
      : colors.rating;

  const badgeTextColor = isActive
    ? "#fff"
    : isLocked
      ? colors.textSecondary
      : "#fff";

  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        gap: 6,
        opacity: isLocked ? 0.45 : 1,
      }}
    >
      <View
        style={{
          width: 62,
          height: 62,
          borderRadius: 16,
          backgroundColor: isActive
            ? `${colors.primary}18`
            : colors.surfaceSubtle,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: isActive ? 2 : 1,
          borderColor: isActive ? colors.primary : colors.border,
        }}
      >
        <AppText style={{ fontSize: 26 }}>{item.icon}</AppText>
      </View>
      <AppText
        style={{
          fontSize: 11,
          textAlign: "center",
          color: colors.text,
          fontFamily: fonts.medium,
          lineHeight: 15,
        }}
      >
        {item.label}
      </AppText>
      <View
        style={{
          backgroundColor: badgeColor,
          paddingHorizontal: 9,
          paddingVertical: 2,
          borderRadius: 10,
        }}
      >
        <AppText
          style={{
            fontSize: 10,
            color: badgeTextColor,
            fontFamily: fonts.semibold,
          }}
        >
          {item.badge}
        </AppText>
      </View>
    </View>
  );
}

function SettingsRow({
  icon,
  label,
  subtitle,
  right,
  onPress,
  showBorder = true,
}: {
  icon: string;
  label: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  showBorder?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.65 : 1}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        borderBottomWidth: showBorder ? StyleSheet.hairlineWidth : 0,
        borderBottomColor: colors.border,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: colors.surfaceSubtle,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AppText style={{ fontSize: 18 }}>{icon}</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText
          style={{
            fontSize: 14,
            fontFamily: fonts.medium,
            color: colors.text,
          }}
        >
          {label}
        </AppText>
        {subtitle && (
          <AppText
            style={{ fontSize: 11, color: colors.textSecondary, marginTop: 1 }}
          >
            {subtitle}
          </AppText>
        )}
      </View>
      {right}
    </TouchableOpacity>
  );
}

function LogOutButton() {
  const colors = useThemeColors();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }),
      Animated.timing(opacity, {
        toValue: 0.75,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], opacity }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 14,
          borderRadius: 16,
          borderWidth: 1.5,
          borderColor: colors.borderAccent,
          backgroundColor: colors.surfaceSubtle,
        }}
      >
        <AppText style={{ fontSize: 16 }}>↪️</AppText>
        <AppText
          style={{
            fontSize: 15,
            fontFamily: fonts.semibold,
            color: colors.primary,
          }}
        >
          Log Out of MealMate
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

function HelpPrivacyModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const colors = useThemeColors();
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.card,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              backgroundColor: colors.muted,
              borderRadius: 4,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />
          <AppText
            style={{
              fontSize: 18,
              fontFamily: fonts.semibold,
              color: colors.text,
              marginBottom: 16,
            }}
          >
            Help & Privacy
          </AppText>

          {[
            {
              title: "Community Guidelines",
              desc: "Learn how to be a great MealMate community member and keep our space safe and welcoming.",
            },
            {
              title: "Privacy Policy",
              desc: "We take your privacy seriously. Read how we collect, use, and protect your personal data.",
            },
            {
              title: "Terms of Service",
              desc: "By using MealMate, you agree to our terms. Review your rights and responsibilities here.",
            },
            {
              title: "Contact Support",
              desc: "Having trouble? Our support team is available 24/7 to help you with any issues.",
            },
          ].map((item, i, arr) => (
            <View
              key={item.title}
              style={{
                paddingVertical: 14,
                borderBottomWidth:
                  i < arr.length - 1 ? StyleSheet.hairlineWidth : 0,
                borderBottomColor: colors.border,
              }}
            >
              <AppText
                style={{
                  fontSize: 14,
                  fontFamily: fonts.semibold,
                  color: colors.text,
                  marginBottom: 3,
                }}
              >
                {item.title}
              </AppText>
              <AppText
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                  lineHeight: 18,
                }}
              >
                {item.desc}
              </AppText>
            </View>
          ))}

          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.8}
            style={{
              marginTop: 22,
              backgroundColor: colors.primary,
              borderRadius: 14,
              paddingVertical: 13,
              alignItems: "center",
            }}
          >
            <AppText
              style={{
                color: "#fff",
                fontFamily: fonts.semibold,
                fontSize: 15,
              }}
            >
              Close
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// ─── Main Profile Screen ──────────────────────────────────────────────────────

export default function Profile() {
  const colors = useThemeColors();
  const [theme, setTheme] = useAtom(themeAtom);
  const isDark = colors.isDarkMode;

  const [cookAlerts, setCookAlerts] = useState(true);
  const [measureUnit, setMeasureUnit] = useState<"metric" | "imperial">(
    "metric",
  );
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [allergenSelected, setAllergenSelected] = useState(false);
  const [grocerySelected, setGrocerySelected] = useState(false);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    setStoredThemePreference(next);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* ── App Header ─────────────────────────────────────── */}
        <View
          style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}
        >
          <AppHeader />
        </View>

        <View style={{ paddingHorizontal: 16 }}>
          {/* ── Profile Card ──────────────────────────────────── */}
          <SectionCard>
            <View style={{ alignItems: "center", gap: 6 }}>
              {/* Avatar */}
              <View style={{ position: "relative", marginBottom: 4 }}>
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: colors.surfaceAccent,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 3,
                    borderColor: colors.primary,
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
                    backgroundColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 2,
                    borderColor: colors.card,
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
                    color: colors.text,
                  }}
                >
                  Arijit
                </AppText>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}
                >
                  <AppText
                    style={{
                      color: "#fff",
                      fontSize: 10,
                      fontFamily: fonts.bold,
                    }}
                  >
                    PRO
                  </AppText>
                </View>
              </View>

              <AppText style={{ fontSize: 13, color: colors.textSecondary }}>
                Culinary Enthusiast & Home Cook
              </AppText>

              {/* Level badge */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: colors.surfaceSubtle,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <AppText style={{ fontSize: 13 }}>🏅</AppText>
                <AppText
                  style={{
                    fontSize: 12,
                    color: colors.primary,
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
                  borderTopColor: colors.border,
                  paddingTop: 14,
                }}
              >
                {[
                  { value: "18", label: "Saved" },
                  { value: "42", label: "Cooked", highlight: true },
                  { value: "12", label: "Custom" },
                  { value: "4.9★", label: "Rating" },
                ].map((stat, i, arr) => (
                  <View
                    key={stat.label}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      borderRightWidth:
                        i < arr.length - 1 ? StyleSheet.hairlineWidth : 0,
                      borderRightColor: colors.border,
                    }}
                  >
                    <AppText
                      style={{
                        fontSize: 20,
                        fontFamily: fonts.bold,
                        color: stat.highlight ? colors.primary : colors.text,
                      }}
                    >
                      {stat.value}
                    </AppText>
                    <AppText
                      style={{
                        fontSize: 11,
                        color: colors.textSecondary,
                        marginTop: 2,
                      }}
                    >
                      {stat.label}
                    </AppText>
                  </View>
                ))}
              </View>
            </View>
          </SectionCard>

          {/* ── Cooking Milestones ────────────────────────────── */}
          <SectionCard>
            <SectionHeader title="Cooking Milestones" right="3 Unlocked" />
            <View style={{ flexDirection: "row", gap: 8 }}>
              {MILESTONES.map((m) => (
                <MilestoneCard key={m.label} item={m} />
              ))}
            </View>
          </SectionCard>

          {/* ── Cooking Preferences ───────────────────────────── */}
          <SectionCard>
            <SectionHeader title="Cooking Preferences" right="Edit" />

            {/* Skill Level */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: colors.surfaceSubtle,
                borderRadius: 12,
                padding: 12,
                marginBottom: 14,
              }}
            >
              <AppText style={{ fontSize: 18 }}>🎯</AppText>
              <View>
                <AppText
                  style={{
                    fontSize: 11,
                    color: colors.textSecondary,
                    fontFamily: fonts.medium,
                  }}
                >
                  Skill Level
                </AppText>
                <AppText
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.semibold,
                    color: colors.text,
                  }}
                >
                  Intermediate Cook
                </AppText>
              </View>
            </View>

            {/* Dietary Regimen */}
            <AppText
              style={{
                fontSize: 10,
                fontFamily: fonts.semibold,
                color: colors.textSecondary,
                letterSpacing: 0.8,
                marginBottom: 8,
              }}
            >
              DIETARY REGIMEN
            </AppText>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {DIETARY_TAGS.map((tag, i) => (
                <DietTag key={tag} label={tag} primary={i === 0} />
              ))}
            </View>
          </SectionCard>

          {/* ── Settings & Preferences ────────────────────────── */}
          <SectionCard>
            <SectionHeader title="Settings & Preferences" />

            {/* Appearance */}
            <SettingsRow
              icon="🎨"
              label="Appearance"
              subtitle="Switch light & dark tone"
              right={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <AppText style={{ fontSize: 16 }}>
                    {isDark ? "🌙" : "☀️"}
                  </AppText>
                  <Switch
                    trackColor={{
                      false: colors.muted,
                      true: `${colors.primary}55`,
                    }}
                    thumbColor={isDark ? colors.primary : colors.card}
                    ios_backgroundColor={colors.muted}
                    onValueChange={toggleTheme}
                    value={isDark}
                    style={{
                      transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
                    }}
                  />
                </View>
              }
            />

            {/* Measurement Unit */}
            <SettingsRow
              icon="📏"
              label="Measurement Unit"
              subtitle="Recipe ingredient metrics"
              right={
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 10,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  {(["metric", "imperial"] as const).map((u) => (
                    <TouchableOpacity
                      key={u}
                      onPress={() => setMeasureUnit(u)}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor:
                          measureUnit === u ? colors.primary : "transparent",
                      }}
                    >
                      <AppText
                        style={{
                          fontSize: 11,
                          fontFamily: fonts.semibold,
                          color:
                            measureUnit === u ? "#fff" : colors.textSecondary,
                        }}
                      >
                        {u === "metric" ? "Metric" : "Imperial"}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              }
            />

            {/* Cook Alerts & Daily Inspos */}
            <SettingsRow
              icon="🔔"
              label="Cook Alerts & Daily Inspos"
              subtitle="Timers, rest times, dinner picks"
              right={
                <Switch
                  trackColor={{
                    false: colors.muted,
                    true: `${colors.primary}55`,
                  }}
                  thumbColor={cookAlerts ? colors.primary : colors.card}
                  ios_backgroundColor={colors.muted}
                  onValueChange={setCookAlerts}
                  value={cookAlerts}
                  style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                />
              }
            />

            {/* Allergens & Exclusions */}
            <SettingsRow
              icon="🚫"
              label="Allergens & Exclusions"
              subtitle="No Shellfish, Peanuts filtered"
              onPress={() => setAllergenSelected((v) => !v)}
              right={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  {allergenSelected && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: colors.primary,
                      }}
                    />
                  )}
                  <AppText
                    style={{ fontSize: 18, color: colors.textSecondary }}
                  >
                    ›
                  </AppText>
                </View>
              }
            />

            {/* Grocery Auto-Sync */}
            <SettingsRow
              icon="🛒"
              label="Grocery Auto-Sync"
              subtitle="Apple Reminders, Instacart"
              onPress={() => setGrocerySelected((v) => !v)}
              right={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  {grocerySelected && (
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: colors.primary,
                      }}
                    />
                  )}
                  <AppText
                    style={{ fontSize: 18, color: colors.textSecondary }}
                  >
                    ›
                  </AppText>
                </View>
              }
            />

            {/* Help & Privacy */}
            <SettingsRow
              icon="🛡️"
              label="Help & Privacy"
              subtitle="Community guidelines & support"
              showBorder={false}
              onPress={() => setHelpModalVisible(true)}
              right={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  <View
                    style={{
                      backgroundColor: colors.surfaceSubtle,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 6,
                    }}
                  >
                    <AppText
                      style={{
                        fontSize: 10,
                        color: colors.textSecondary,
                        fontFamily: fonts.medium,
                      }}
                    >
                      v2.4.0
                    </AppText>
                  </View>
                  <AppText
                    style={{ fontSize: 18, color: colors.textSecondary }}
                  >
                    ›
                  </AppText>
                </View>
              }
            />
          </SectionCard>

          {/* ── Log Out ───────────────────────────────────────── */}
          <LogOutButton />

          {/* ── Footer ───────────────────────────────────────── */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <AppText
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                fontFamily: fonts.light,
              }}
            >
              Crafted with warmth for home cooks everywhere 🍳
            </AppText>
          </View>
        </View>
      </ScrollView>

      {/* Help & Privacy Modal */}
      <HelpPrivacyModal
        visible={helpModalVisible}
        onClose={() => setHelpModalVisible(false)}
      />
    </SafeAreaView>
  );
}
