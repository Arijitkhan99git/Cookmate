import { AppText } from "@/components/AppText";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";
import { useGenericShadow } from "../../constants/genericShadowStyle";
import { fonts } from "../../constants/typography";

interface ParsedStep {
  id: number;
  title: string | null;
  body: string;
}

// Function to split strInstructions by numbers (1., 2., 3.), double line breaks (\r\n\r\n), or single line breaks
const parseInstructions = (rawText: string): ParsedStep[] => {
  if (!rawText || !rawText.trim()) return [];

  const text = rawText.trim();
  let rawBlocks: string[] = [];

  // Check if text contains numbered step patterns like "\r\n2. ", "\n3. ", "2) ", "STEP 2"
  const hasNumberedSteps =
    /(?:^|\r?\n|\s)(?:STEP\s*)?[2-9]\d*\s*[\.\)]\s+/i.test(text);

  if (hasNumberedSteps) {
    // Split on numbered step boundaries e.g. "2. ", "3. ", "10. ", "STEP 2 "
    rawBlocks = text
      .split(/(?:^|\r?\n+)(?=(?:STEP\s*)?\d+\s*[\.\)]\s+)/i)
      .map((b) => b.trim())
      .filter(Boolean);
  } else if (/\r?\n\r?\n+/.test(text)) {
    // Split by double line breaks (\r\n\r\n or \n\n)
    rawBlocks = text
      .split(/\r?\n\r?\n+/)
      .map((b) => b.trim())
      .filter(Boolean);
  } else {
    // Split by single line breaks (\r\n or \n)
    rawBlocks = text
      .split(/\r?\n+/)
      .map((b) => b.trim())
      .filter((b) => b.length > 5);
  }

  return rawBlocks.map((block, index) => {
    // Strip leading step number prefixes like "1. ", "2) ", "STEP 3: "
    const cleanBlock = block
      .replace(/^(?:STEP\s*)?\d+\s*[\.\):]\s*/i, "")
      .trim();

    let title: string | null = null;
    let body = cleanBlock;

    const lines = cleanBlock
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);

    // Case 1: First line is a heading ending with ':' or short header
    if (lines.length > 1 && (lines[0].endsWith(":") || lines[0].length <= 40)) {
      title = lines[0].replace(/:$/, "").trim();
      body = lines.slice(1).join(" ").trim();
    } else {
      // Case 2: Title separated by a colon like "Cook the filling: In a large skillet..."
      const colonIndex = cleanBlock.indexOf(":");
      if (
        colonIndex > 0 &&
        colonIndex <= 45 &&
        !cleanBlock.slice(0, colonIndex).includes(".")
      ) {
        title = cleanBlock.slice(0, colonIndex).trim();
        body = cleanBlock.slice(colonIndex + 1).trim();
      } else {
        body = lines.join(" ").trim();
      }
    }

    body = body.replace(/\s+/g, " ");

    return {
      id: index + 1,
      title: title && title.length > 0 ? title : null,
      body,
    };
  });
};

interface PreparationStepsProps {
  instructions: string;
}

const PreparationSteps = ({ instructions }: PreparationStepsProps) => {
  const {
    text: textColor,
    primary,
    card,
    secondaryText,
    isDarkMode,
  } = useThemeColors();
  const cardShadow = useGenericShadow(2);

  const [showAll, setShowAll] = useState<boolean>(false);

  const steps = useMemo(() => parseInstructions(instructions), [instructions]);

  const visibleSteps = useMemo(
    () => (showAll ? steps : steps.slice(0, 5)),
    [steps, showAll],
  );

  const hasMore = steps.length > 5;
  const remainingCount = steps.length - 5;

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.cardContainer,
        cardShadow,
        {
          backgroundColor: card,
          borderColor: isDarkMode
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.05)",
        },
      ]}
    >
      {/* Header Row */}
      <View style={styles.headerRow}>
        <AppText style={[styles.headingTitle, { color: textColor }]}>
          How to make it
        </AppText>

        <AppText style={[styles.stepCountText, { color: secondaryText }]}>
          {steps.length} {steps.length === 1 ? "Step" : "Simple Steps"}
        </AppText>
      </View>

      {/* Steps List */}
      <View style={styles.stepsList}>
        {visibleSteps.map((step, index) => {
          const isLast = index === visibleSteps.length - 1;

          return (
            <View
              key={`step-${step.id}`}
              style={[styles.stepRow, !isLast && styles.stepRowMargin]}
            >
              {/* Order Badge (1, 2, 3...) */}
              <View
                style={[
                  styles.numberBadge,
                  {
                    backgroundColor: isDarkMode
                      ? "rgba(255, 106, 42, 0.16)"
                      : "#FDE8E1",
                  },
                ]}
              >
                <AppText style={[styles.numberText, { color: primary }]}>
                  {step.id}
                </AppText>
              </View>

              {/* Step Title & Body */}
              <View style={styles.stepContent}>
                {step.title ? (
                  <AppText style={[styles.stepTitle, { color: textColor }]}>
                    {step.title}
                  </AppText>
                ) : null}

                <AppText
                  style={[
                    styles.stepBody,
                    {
                      color: isDarkMode
                        ? "rgba(255, 248, 242, 0.82)"
                        : "rgba(30, 30, 30, 0.8)",
                    },
                  ]}
                >
                  {step.body}
                </AppText>
              </View>
            </View>
          );
        })}
      </View>

      {/* Show All / Show Less Toggle Button */}
      {hasMore && (
        <Pressable
          style={({ pressed }) => [
            styles.toggleBtn,
            {
              backgroundColor: isDarkMode
                ? "rgba(255, 255, 255, 0.06)"
                : "rgba(255, 106, 42, 0.08)",
              borderColor: isDarkMode
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 106, 42, 0.2)",
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          onPress={() => setShowAll((prev) => !prev)}
        >
          <AppText style={[styles.toggleText, { color: primary }]}>
            {showAll
              ? "Show fewer steps"
              : `View all ${steps.length} steps (${remainingCount} more)`}
          </AppText>
          {showAll ? (
            <ChevronUp size={18} color={primary} />
          ) : (
            <ChevronDown size={18} color={primary} />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default PreparationSteps;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 28,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headingTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
  },
  stepCountText: {
    fontFamily: fonts.medium,
    fontSize: 13,
    opacity: 0.8,
  },
  stepsList: {
    gap: 0,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
  },
  stepRowMargin: {
    marginBottom: 22,
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  numberText: {
    fontFamily: fonts.bold,
    fontSize: 15,
  },
  stepContent: {
    flex: 1,
    gap: 4,
    marginTop: 4,
  },
  stepTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    marginBottom: 2,
  },
  stepBody: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
  },
  toggleBtn: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  toggleText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
  },
});
