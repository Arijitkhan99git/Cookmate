import { AppText } from "@/components/AppText";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
    useFetchAllAreaList,
    useFetchMealsByAreasLists,
} from "../../../api/hooks/useListAllAreas";
import { useThemeColors } from "../../../constants/color-pallette";
import { VALID_MEAL_AREAS } from "../constants/validMealAreas";
import { useRandomValidAreas } from "../hooks/useRandomAreas";
import AreaCuisinesHomeCard from "./AreaCuisinesHomeCard";
import { SectionHeading } from "./SectionHeading";

const HomeAreaList = () => {
  const { primary, danger, secondaryText, surfaceSecondary, muted } =
    useThemeColors();

  const {
    data: areaList,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useFetchAllAreaList();

  //   const randomAreas = useRandomAreas(areaList?.meals || [], 10, 10);

  const randomAreas = useRandomValidAreas(VALID_MEAL_AREAS, 10);

  const {
    areaData,
    isLoading: isMealsLoading,
    isError: isMealsError,
    error: mealsError,
  } = useFetchMealsByAreasLists(randomAreas);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!isError && !isLoading) {
    return (
      <View style={styles.container}>
        {/* ── Header ── */}
        <View style={styles.titleRow}>
          <SectionHeading>Explore Cuisines</SectionHeading>
          <Pressable onPress={() => {}}>
            <AppText style={{ color: primary, fontSize: 13 }}>Explore</AppText>
          </Pressable>
        </View>

        <FlatList
          data={areaData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <AreaCuisinesHomeCard area={item} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 10, gap: 16 }}
        />
      </View>
    );
  }
};

export default HomeAreaList;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
    marginBottom: 16,
  },
});
