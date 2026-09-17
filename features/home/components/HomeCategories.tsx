import { AppText } from "@/components/AppText";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFetchAllCategories } from "../../../api/hooks/useCategories";
import { Category } from "../../../api/model/categories-model";
import { useThemeColors } from "../../../constants/color-pallette";
import { fonts } from "../../../constants/typography";
import { SectionHeading } from "./SectionHeading";

const CategoryItem = ({ item }: { item: Category }) => {
  const { mutedText: catText } = useThemeColors();

  const handlePress = (category: string) => {
    console.log(category);
  };

  return (
    <Pressable onPress={() => handlePress(item.strCategory)}>
      {/* Thumbnail */}
      <View style={styles.categoryItem}>
        <Image
          source={{ uri: item.strCategoryThumb }}
          resizeMode="contain"
          style={styles.categoryImage}
        />
      </View>

      <Text style={[styles.categoryName, { color: catText }]} numberOfLines={1}>
        {item.strCategory}
      </Text>
    </Pressable>
  );
};

const HomeCategories = () => {
  const { data: categoriesData, isLoading } = useFetchAllCategories();
  const { primary } = useThemeColors();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <SectionHeading>Categories</SectionHeading>
        <Pressable>
          <AppText style={{ color: primary, fontSize: 13 }}>See all</AppText>
        </Pressable>
      </View>

      <View>
        <FlatList
          data={categoriesData?.categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.idCategory}
          renderItem={({ item }) => <CategoryItem item={item} />}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 10,
            gap: 16,
          }}
        />
      </View>
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },
  categoryItem: {
    gap: 5,
  },
  categoryImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    // borderColor: "#FF5A1F",
    // borderWidth: 1,
  },
  categoryName: {
    fontSize: 12,
    fontFamily: fonts.medium,
    textAlign: "center",
  },
});
