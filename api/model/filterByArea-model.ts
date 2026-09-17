export interface FilterByAreaResponse {
  meals: Meal[];
}
interface Meal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strArea: string;
  strCountry: string;
}
