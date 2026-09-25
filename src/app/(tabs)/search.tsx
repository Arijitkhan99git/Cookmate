import AppHeader from "@/components/AppHeader";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import { SearchList } from "../../../features/search/components/SearchList";

const Search = () => {
  const { background } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={styles.wrapperContainer}>
        <AppHeader />
        <SearchList />
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperContainer: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    rowGap: 30,
  },
});
