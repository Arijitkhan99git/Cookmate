import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * A hook that provides a standard base style for screens.
 * It applies flex: 1 and a dynamic marginBottom for Android devices
 * to avoid system navigation bars, while leaving iOS alone (since iOS uses its home indicator).
 */
export function useScreenSafeArea() {
  const insets = useSafeAreaInsets();

  return {
    flex: 1,
    marginBottom: Platform.OS === "ios" ? 0 : insets.bottom,
  };
}
