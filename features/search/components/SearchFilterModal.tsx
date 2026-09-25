import { AppText } from "@/components/AppText";
import { BlurView } from "expo-blur";
import { Layers, X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";

interface FilterNewsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchFilterModal({
  visible,
  onClose,
}: FilterNewsModalProps) {
  const {
    border,
    text: textColor,
    secondaryText,
    primary,
    isDarkMode,
  } = useThemeColors();

  const modalBackgroundColor = isDarkMode ? "#221b1bff" : "#faede2ff";

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.container}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <Pressable
            onPress={handleClose}
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.35)",
            }}
          >
            <Pressable
              onPress={(e) => e.stopPropagation()}
              style={[
                styles.modalContainer,
                {
                  backgroundColor: modalBackgroundColor,
                  borderTopColor: border,
                },
              ]}
            >
              {/* Drag Handle Indicator */}
              <View
                style={[
                  styles.dragHandle,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.15)",
                  },
                ]}
              />

              {/* Top Header Row */}
              <View style={styles.headerRow}>
                <View style={{ gap: 2 }}>
                  <AppText style={[styles.title, { color: textColor }]}>
                    Select Categories
                  </AppText>
                  <AppText style={[styles.subtitle, { color: secondaryText }]}>
                    Choose cuisine & recipes
                  </AppText>
                </View>

                {/* Close Button */}
                <Pressable
                  style={({ pressed }) => [
                    styles.closeBtn,
                    {
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.05)",
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  onPress={handleClose}
                  hitSlop={8}
                >
                  <X size={16} color={textColor} />
                </Pressable>
              </View>

              {/* Sub-header Bar */}

              <View
                style={[styles.subHeaderRow, { borderTopColor: "#3d2e1fff" }]}
              >
                <View style={styles.categoryBadgeRow}>
                  <Layers size={16} color={primary} />
                  <AppText
                    style={[styles.categoryBadgeText, { color: primary }]}
                  >
                    ALL CATEGORIES
                  </AppText>
                </View>

                <AppText style={[styles.hintText, { color: secondaryText }]}>
                  Tap to multi-select
                </AppText>
              </View>
            </Pressable>
          </Pressable>
        </BlurView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    marginTop: "auto",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  dragHandle: {
    width: 38,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13,
    opacity: 0.8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  subHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingTop: 8,
    marginBottom: 8,
    borderTopWidth: 1,
  },
  categoryBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 12,
    letterSpacing: 0.5,
  },
  hintText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    opacity: 0.7,
  },
});
