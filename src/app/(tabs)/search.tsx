import AppHeader from "@/components/AppHeader";
import { useScreenSafeArea } from "@/hooks/useScreenSafeArea";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SearchList } from "../../../features/search/components/SearchList";

const Search = () => {
  const { focus } = useLocalSearchParams<{ focus?: string }>();
  const screenSafeArea = useScreenSafeArea();

  return (
    <View style={[screenSafeArea, styles.container]}>
      <View style={styles.wrapperContainer}>
        <AppHeader />
        <SearchList autoFocus={focus === "true"} />
      </View>
    </View>
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
