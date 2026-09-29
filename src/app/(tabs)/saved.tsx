import AppHeader from "@/components/AppHeader";
import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import SavedHeader from "../../../features/saved/components/SavedHeader";
import SavedList from "../../../features/saved/components/SavedList";
import { savedIdsAtom } from "../../../store/saved-store";

const Saved = () => {
  const [ids] = useAtom(savedIdsAtom);

  const { background } = useThemeColors();

  const idCount = ids.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={styles.wrapperContainer}>
        <AppHeader />
        <SavedHeader mealCount={idCount ?? 0} />
        <SavedList ids={ids} />
      </View>
    </SafeAreaView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    gap: 30,
  },
});
