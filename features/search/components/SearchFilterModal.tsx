import { AppText } from "@/components/AppText";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useAtom } from "jotai";
import { Check, Layers, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFetchAllCategories } from "../../../api/hooks/useCategories";
import { Category } from "../../../api/model/categories-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { selectedCategoriesAtom } from "../../../store/filter-store";

import ErrorState from "@/components/ErrorState";
import SearchModalSkeleton from "./SearchModalSkeleton";

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

  const [selectedCategories, setSelectedCategories] = useAtom(
    selectedCategoriesAtom,
  );
  const [tempSelected, setTempSelected] =
    useState<string[]>(selectedCategories);

  const { data, isLoading, isError, refetch, isRefetching } =
    useFetchAllCategories();
  const categories = data?.categories || [];

  // Re-sync local selection state whenever modal opens
  useEffect(() => {
    if (visible) {
      setTempSelected(selectedCategories);
    }
  }, [visible, selectedCategories]);

  const modalBackgroundColor = isDarkMode ? "#221b1bff" : "#faf3edff";

  const toggleCategory = (categoryName: string) => {
    setTempSelected((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName],
    );
  };

  const handleClear = () => {
    setTempSelected([]);
    setSelectedCategories([]);
  };

  const handleApply = () => {
    setSelectedCategories(tempSelected);
    onClose();
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = tempSelected.includes(item.strCategory);

    const cardBg = isDarkMode
      ? isSelected
        ? "#30221c"
        : "#29201c"
      : isSelected
        ? "#fff4ed"
        : "#ffffff";

    const cardBorderColor = isSelected
      ? primary
      : isDarkMode
        ? "#3a2c26"
        : "#f0dfd2";

    return (
      <Pressable
        style={({ pressed }) => [
          styles.categoryCard,
          {
            backgroundColor: cardBg,
            borderColor: cardBorderColor,
            borderWidth: isSelected ? 1.5 : 1,
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          },
        ]}
        onPress={() => toggleCategory(item.strCategory)}
      >
        {/* Selection Check Circle (Top Right) */}
        <View style={styles.checkPosition}>
          {isSelected ? (
            <View style={[styles.checkCircle, { backgroundColor: primary }]}>
              <Check size={12} color="#FFFFFF" strokeWidth={3} />
            </View>
          ) : (
            <View
              style={[
                styles.uncheckCircle,
                {
                  borderColor: isDarkMode
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.15)",
                },
              ]}
            />
          )}
        </View>

        {/* Category Thumbnail Image */}
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.categoryThumb}
          contentFit="contain"
          transition={150}
        />

        {/* Category Name */}
        <AppText style={[styles.categoryTitle, { color: textColor }]}>
          {item.strCategory}
        </AppText>
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <BlurView intensity={50} tint="dark" style={styles.container}>
          <Pressable
            onPress={onClose}
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
                  onPress={onClose}
                  hitSlop={8}
                >
                  <X size={16} color={textColor} />
                </Pressable>
              </View>

              {/* Sub-header Bar */}
              <View style={[styles.subHeaderRow, { borderTopColor: border }]}>
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

              {/* ── Category List (2-column Grid / Skeleton / Error) ── */}
              {isLoading ? (
                <SearchModalSkeleton count={6} />
              ) : isError ? (
                <ErrorState
                  fullScreen={false}
                  title="Failed to load categories"
                  message="Could not fetch category list. Please check your connection and try again."
                  onRetry={refetch}
                  isRetrying={isRefetching}
                />
              ) : (
                <FlatList
                  data={categories}
                  keyExtractor={(item) => item.idCategory}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listPadding}
                  style={styles.gridContainer}
                  renderItem={renderCategoryItem}
                />
              )}

              {/* ── Footer Actions Bar (Clear & Apply Buttons) ── */}

              {!isLoading && !isError && (
                <View style={styles.footerRow}>
                  {/* Clear Button */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.clearButton,
                      {
                        borderColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0, 0, 0, 0.15)",
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.04)"
                          : "#ffffff",
                        opacity: pressed ? 0.75 : 1,
                      },
                    ]}
                    onPress={handleClear}
                  >
                    <AppText
                      style={[styles.clearBtnText, { color: textColor }]}
                    >
                      Clear
                    </AppText>
                  </Pressable>

                  {/* Apply Categories Button */}
                  <Pressable
                    style={({ pressed }) => [
                      styles.applyButton,
                      {
                        backgroundColor: primary,
                        opacity: pressed ? 0.9 : 1,
                      },
                    ]}
                    onPress={handleApply}
                  >
                    <AppText style={styles.applyBtnText}>
                      Apply Categories
                    </AppText>

                    {tempSelected.length > 0 && (
                      <View style={styles.countPill}>
                        <AppText style={styles.countPillText}>
                          {tempSelected.length} SELECTED
                        </AppText>
                      </View>
                    )}
                  </Pressable>
                </View>
              )}
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
    maxHeight: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
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
    paddingVertical: 10,
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
  gridContainer: {
    // maxHeight: 450,
    flexShrink: 1,
  },
  columnWrapper: {
    gap: 12,
  },
  listPadding: {
    gap: 12,
    paddingVertical: 6,
  },
  categoryCard: {
    flex: 1,
    borderRadius: 18,
    padding: 12,
    minHeight: 110,
    justifyContent: "space-between",
    position: "relative",
  },
  checkPosition: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 2,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  uncheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
  },
  categoryThumb: {
    width: 60,
    height: 60,
  },
  categoryTitle: {
    fontFamily: fonts.bold,
    fontSize: 14,
    marginTop: 2,
  },
  loadingContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 18,
    paddingTop: 4,
  },
  clearButton: {
    paddingHorizontal: 20,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearBtnText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
  applyButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 16,
  },
  applyBtnText: {
    color: "#FFFFFF",
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  countPill: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countPillText: {
    color: "#FFFFFF",
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
});
