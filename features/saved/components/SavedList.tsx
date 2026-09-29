import { FlatList, StyleSheet, View } from "react-native";

import { useFetchMealsByIds } from "../../../api/hooks/useFetchMealsByIds";
import SavedMealCard from "./SavedMealCard";

export default function SavedList({ ids }: { ids: string[] }) {
  const { meals, isLoading, isError, error } = useFetchMealsByIds(ids);

  return (
    <View style={styles.container}>
      <FlatList
        data={meals}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => <SavedMealCard item={item} />}
        keyExtractor={(item) => item.idMeal}
        scrollEventThrottle={16}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={4}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 90,
    gap: 12,
  },
});
