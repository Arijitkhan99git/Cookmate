import { Alert, Linking } from "react-native";

/**
 * Formats a URL to ensure it has a valid protocol (http:// or https://)
 */
export const formatUrl = (url: string): string => {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

/**
 * Generic helper to safely open external links in browser or native app.
 * Can be imported and used anywhere in the project.
 */
export const openExternalUrl = async (url?: string | null): Promise<boolean> => {
  if (!url || typeof url !== "string" || !url.trim()) {
    Alert.alert("Invalid Link", "No valid URL was provided.");
    return false;
  }

  const formattedUrl = formatUrl(url);

  try {
    const supported = await Linking.canOpenURL(formattedUrl);
    if (supported) {
      await Linking.openURL(formattedUrl);
      return true;
    } else {
      // Fallback: try opening directly if canOpenURL check is overly strict on some devices
      await Linking.openURL(formattedUrl);
      return true;
    }
  } catch (error) {
    console.error("Error opening URL:", error);
    Alert.alert("Error", "Could not open the link.");
    return false;
  }
};
