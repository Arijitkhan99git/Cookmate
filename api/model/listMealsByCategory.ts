export interface ListMealsByCategoryResponse {
  meals: CategoryMeal[];
}

export interface CategoryMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea?: string;
  strCountry: string;
}
