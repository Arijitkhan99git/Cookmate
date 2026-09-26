export interface FilterByAreaResponse {
  meals: Meal[];
}
export interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea: string;
  strCountry: string;
}
