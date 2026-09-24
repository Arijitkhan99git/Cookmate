import AppHeader from "@/components/AppHeader";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../../../constants/color-pallette";
import { SearchList } from "../../../features/search/components/SearchList";

const Search = () => {
  const { background } = useThemeColors();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            rowGap: 30,
            paddingBottom: 100,
          }}
        >
          <AppHeader />
          <SearchList />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
