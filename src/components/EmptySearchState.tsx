import { AppText } from "@/components/AppText";
import { SearchX, XCircle } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";

export interface EmptySearchStateProps {
  searchQuery?: string;
  title?: string;
  message?: string;
  onClearSearch?: () => void;
  clearButtonText?: string;
  icon?: React.ReactNode;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const EmptySearchState: React.FC<EmptySearchStateProps> = ({
  searchQuery = "",
  title = "No results found",
  message,
  onClearSearch,
  clearButtonText = "Clear Search",
  icon,
  fullScreen = false,
  style,
}) => {
  const {
    background,
    primary,
    text: textColor,
    secondaryText,
    isDarkMode,
    surfaceHigh,
    surfaceSecondary,
  } = useThemeColors();

  const computedMessage =
    message ??
    (searchQuery.trim()
      ? `We couldn't find anything matching "${searchQuery}". Try checking for spelling errors or searching another keyword.`
      : "No items match your search criteria. Try adjusting your keywords or filters.");

  const content = (
    <View style={styles.contentContainer}>
      {/* Icon Badge */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDarkMode
              ? "rgba(249, 115, 22, 0.15)"
              : "#FFF0E6",
          },
        ]}
      >
        {icon ?? <SearchX size={36} color={primary} />}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <AppText style={[styles.title, { color: textColor }]}>{title}</AppText>
        <AppText style={[styles.message, { color: secondaryText }]}>
          {computedMessage}
        </AppText>
      </View>

      {/* Clear Search Action */}
      {onClearSearch && (
        <Pressable
          style={({ pressed }) => [
            styles.clearButton,
            {
              backgroundColor: primary,
              opacity: pressed ? 0.85 : 1,
            },
          ]}
          onPress={onClearSearch}
          hitSlop={6}
        >
          <XCircle size={16} color="#FFFFFF" />
          <AppText style={styles.clearText}>{clearButtonText}</AppText>
        </Pressable>
      )}
    </View>
  );

  if (fullScreen) {
    return (
      <View
        style={[
          styles.fullScreenContainer,
          { backgroundColor: background },
          style,
        ]}
      >
        {content}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.inlineContainer,
        {
          backgroundColor: isDarkMode ? surfaceSecondary : "#FAFAFA",
          borderColor: isDarkMode ? surfaceHigh : "#F0F0F0",
        },
        style,
      ]}
    >
      {content}
    </View>
  );
};

export default EmptySearchState;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  inlineContainer: {
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  contentContainer: {
    alignItems: "center",
    maxWidth: 320,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.bold,
    textAlign: "center",
  },
  message: {
    fontSize: 13.5,
    fontFamily: fonts.regular,
    textAlign: "center",
    lineHeight: 20,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  clearText: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontFamily: fonts.semibold,
  },
});
