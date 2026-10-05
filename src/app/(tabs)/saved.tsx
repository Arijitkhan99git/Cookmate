import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { useAtom } from "jotai";
import { StyleSheet, View } from "react-native";
import SavedHeader from "../../../features/saved/components/SavedHeader";
import SavedList from "../../../features/saved/components/SavedList";
import { savedIdsAtom } from "../../../store/saved-store";

const Saved = () => {
  const [ids] = useAtom(savedIdsAtom);
  const screenSafeArea = useScreenSafeArea();

  const idCount = ids.length;

  return (
    <View style={[screenSafeArea, styles.container]}>
      <View style={styles.wrapperContainer}>
        {/* <AppHeader /> */}
        <SavedHeader mealCount={idCount ?? 0} />
        <SavedList ids={ids} />
      </View>
    </View>
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
    gap: 20,
  },
});
