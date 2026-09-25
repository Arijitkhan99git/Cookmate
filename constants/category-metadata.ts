export interface CategoryMetadata {
  strCategory: string;
  recipeCount: number;
  tag: string;
}

export const MEAL_CATEGORIES: CategoryMetadata[] = [
  {
    strCategory: "Beef",
    recipeCount: 95,
    tag: "Hearty Picks",
  },
  {
    strCategory: "Chicken",
    recipeCount: 81,
    tag: "Popular",
  },
  {
    strCategory: "Dessert",
    recipeCount: 168,
    tag: "Sweet Treats",
  },
  {
    strCategory: "Lamb",
    recipeCount: 33,
    tag: "Rich & Tender",
  },
  {
    strCategory: "Miscellaneous",
    recipeCount: 33,
    tag: "Unique Picks",
  },
  {
    strCategory: "Pasta",
    recipeCount: 12,
    tag: "Comfort Food",
  },
  {
    strCategory: "Pork",
    recipeCount: 61,
    tag: "Savory Faves",
  },
  {
    strCategory: "Seafood",
    recipeCount: 84,
    tag: "Wild Catch",
  },
  {
    strCategory: "Side",
    recipeCount: 84,
    tag: "Perfect Pairings",
  },
  {
    strCategory: "Starter",
    recipeCount: 14,
    tag: "Begin Here",
  },
  {
    strCategory: "Vegan",
    recipeCount: 7,
    tag: "Plant Powered",
  },
  {
    strCategory: "Vegetarian",
    recipeCount: 100,
    tag: "Fresh & Green",
  },
  {
    strCategory: "Breakfast",
    recipeCount: 19,
    tag: "Morning Faves",
  },
  {
    strCategory: "Goat",
    recipeCount: 2,
    tag: "Rare Finds",
  },
];
