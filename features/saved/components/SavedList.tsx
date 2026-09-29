import { FlatList, StyleSheet, View } from "react-native";

import EmptySearchState from "@/components/EmptySearchState";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useFetchMealsByIds } from "../../../api/hooks/useFetchMealsByIds";
import { selectedSavedCategoriesAtom } from "../../../store/savedFilter-store";
import SavedFilterModal from "./SavedFilterModal";
import SavedMealCard from "./SavedMealCard";
import { SavedSearchBox } from "./SavedSearchBox";

export default function SavedList({ ids }: { ids: string[] }) {
  const { meals, isLoading, isError, error } = useFetchMealsByIds(ids);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const selectedCategories = useAtomValue(selectedSavedCategoriesAtom);

  const [selectedCategories, setSelectedCategories] = useAtom(
    selectedSavedCategoriesAtom,
  );

  const filteredMeals = useMemo(() => {
    if (selectedCategories.length > 0) {
      return meals.filter((m) => selectedCategories.includes(m.strCategory));
    }

    if (searchQuery.trim()) {
      return meals.filter((m) =>
        m.strMeal.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return meals;
  }, [meals, selectedCategories, searchQuery]);

  const handleClear = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  return (
    <View style={styles.container}>
      <SavedSearchBox
        query={searchQuery}
        onChangeQuery={setSearchQuery}
        setModalVisible={setIsModalVisible}
        activeFilterCount={selectedCategories.length}
      />
      <FlatList
        data={filteredMeals}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => <SavedMealCard item={item} />}
        keyExtractor={(item) => item.idMeal}
        scrollEventThrottle={16}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={4}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptySearchState
            searchQuery={searchQuery}
            onClearSearch={handleClear}
          />
        }
      />

      {isModalVisible && (
        <SavedFilterModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 100,
    gap: 12,
  },
});
