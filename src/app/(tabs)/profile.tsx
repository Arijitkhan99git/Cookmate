import AppHeader from "@/components/AppHeader";
import { AppText } from "@/components/AppText";
import { useAtom } from "jotai";
import {
  Bandage,
  BellRing,
  CircleGauge,
  HelpCircle,
  LogOut,
  Moon,
  Palette,
  Ruler,
  ShoppingCart,
  Sun,
} from "lucide-react-native";
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
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import MileStonesCard from "../../../features/profile/components/MileStonesCard";
import ProfileCard from "../../../features/profile/components/ProfileCard";
import { SectionHeader } from "../../../features/profile/components/SectionHeader";
import {
  setStoredThemePreference,
  themeAtom,
} from "../../../store/theme-store";

const DIETARY_TAGS = ["High Protein", "Low Carb", "Pescatarian"];

// ─── Sub-components ──────────────────────────────────────────────────────────

function DietTag({ label, primary }: { label: string; primary: boolean }) {
  const colors = useThemeColors();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: primary ? colors.surface : colors.muted,
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

function SettingsRow({
  icon,
  iconBg,
  label,
  subtitle,
  right,
  onPress,
  showBorder = true,
}: {
  icon: React.ReactNode;
  iconBg?: string;
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
          backgroundColor: iconBg || colors.surfaceSubtle,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
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
  const shadowStyle = useGenericShadow(1);

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
        style={[
          shadowStyle,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            paddingVertical: 14,
            borderRadius: 16,
            backgroundColor: colors.card,
          },
        ]}
      >
        <LogOut color={colors.primary} />
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

        <View style={{ paddingHorizontal: 16, gap: 18 }}>
          {/* ── Profile Card ──────────────────────────────────── */}
          <ProfileCard />

          {/* ── Cooking Milestones ────────────────────────────── */}
          <MileStonesCard />

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
              <CircleGauge size={20} color={colors.surface} />
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
              icon={
                <Palette size={20} color={isDark ? "#ffb4a6" : "#c44c33"} />
              }
              iconBg={isDark ? "#3d221c" : "#ffe4df"}
              label="Appearance"
              subtitle="Switch light & dark tone"
              right={
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
                >
                  {isDark ? (
                    <Moon size={20} color={colors.textSecondary} />
                  ) : (
                    <Sun size={20} color={colors.textSecondary} />
                  )}
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
                      transform: [{ scaleX: 1.0 }, { scaleY: 1.0 }],
                    }}
                  />
                </View>
              }
            />

            {/* Measurement Unit */}
            <SettingsRow
              icon={<Ruler size={20} color={isDark ? "#ffd382" : "#b57d16"} />}
              iconBg={isDark ? "#403114" : "#ffebd1"}
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
                          measureUnit === u ? colors.surface : "transparent",
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
              icon={
                <BellRing size={20} color={isDark ? "#ff9c9c" : "#d13838"} />
              }
              iconBg={isDark ? "#3d1e1e" : "#ffe0e0"}
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
                  style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                />
              }
            />

            {/* Allergens & Exclusions */}
            <SettingsRow
              icon={
                <Bandage size={20} color={isDark ? "#e0b094" : "#a86c48"} />
              }
              iconBg={isDark ? "#36261d" : "#faeadf"}
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
              icon={
                <ShoppingCart
                  size={20}
                  color={isDark ? "#a1d48c" : "#4a8a31"}
                />
              }
              iconBg={isDark ? "#24361c" : "#eaf7e4"}
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
              icon={
                <HelpCircle size={20} color={isDark ? "#9caeff" : "#3b54ba"} />
              }
              iconBg={isDark ? "#21263d" : "#e4e8ff"}
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
              Crafted with warmth for home cooks everywhere
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
