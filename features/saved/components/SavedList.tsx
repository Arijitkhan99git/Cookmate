import { FlatList, StyleSheet, View } from "react-native";

import EmptySearchState from "@/components/EmptySearchState";
import ErrorState from "@/components/ErrorState";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { useFetchMealsByIds } from "../../../api/hooks/useFetchMealsByIds";
import { selectedSavedCategoriesAtom } from "../../../store/savedFilter-store";
import SavedFilterModal from "./SavedFilterModal";
import SavedMealCard from "./SavedMealCard";
import { SavedSearchBox } from "./SavedSearchBox";
import SavedListSkeleton from "./SavedListSkeleton";

export default function SavedList({ ids }: { ids: string[] }) {
  const { meals, isLoading, isError, error } = useFetchMealsByIds(ids);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  //   const selectedCategories = useAtomValue(selectedSavedCategoriesAtom);

  const [selectedCategories, setSelectedCategories] = useAtom(
    selectedSavedCategoriesAtom,
  );

  const filteredMeals = useMemo(() => {
    let result = meals || [];

    if (selectedCategories.length > 0) {
      result = result.filter((m) => selectedCategories.includes(m?.strCategory));
    } else if (searchQuery.trim()) {
      result = result.filter(
        (m) =>
          m?.strMeal?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m?.strArea?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m?.strCategory?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Reverse the array to show the most recently saved items at the top
    return [...result].reverse();
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
      {isLoading ? (
        <SavedListSkeleton count={4} />
      ) : isError ? (
        <ErrorState
          fullScreen={false}
          title="Failed to load saved recipes"
          message="Could not fetch your saved recipes. Please check your connection and try again."
        />
      ) : (
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
      )}

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
