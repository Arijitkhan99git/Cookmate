import { AppText } from "@/components/AppText";
import { AlertCircle, RefreshCw } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { fonts } from "../../constants/typography";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  icon?: React.ReactNode;
  fullScreen?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "Failed to load data. Please check your connection and try again.",
  onRetry,
  isRetrying = false,
  icon,
  fullScreen = true,
  style,
}) => {
  const {
    background,
    card,
    danger,
    primary,
    text: textColor,
    secondaryText,
    isDarkMode,
    surfaceSecondary,
  } = useThemeColors();

  const content = (
    <View style={styles.contentContainer}>
      {/* Icon */}
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isDarkMode ? "rgba(220, 38, 38, 0.15)" : "#FEE2E2",
          },
        ]}
      >
        {icon ?? <AlertCircle size={32} color={danger} />}
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <AppText style={[styles.title, { color: textColor }]}>{title}</AppText>
        <AppText style={[styles.message, { color: secondaryText }]}>
          {message}
        </AppText>
      </View>

      {/* Retry Action */}
      {onRetry && (
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            {
              backgroundColor: primary,
              opacity: pressed || isRetrying ? 0.8 : 1,
            },
          ]}
          onPress={onRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <ActivityIndicator size="small" color="#FFFFFF" />
              <AppText style={styles.retryText}>Retrying…</AppText>
            </View>
          ) : (
            <>
              <RefreshCw size={16} color="#FFFFFF" />
              <AppText style={styles.retryText}>Try Again</AppText>
            </>
          )}
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
          backgroundColor: isDarkMode ? surfaceSecondary : card,
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.05)",
        },
        style,
      ]}
    >
      {content}
    </View>
  );
};

export default ErrorState;

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  inlineContainer: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    maxWidth: 320,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 18,
    textAlign: "center",
  },
  message: {
    fontFamily: fonts.medium,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    opacity: 0.8,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 6,
  },
  retryText: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: "#FFFFFF",
  },
});
