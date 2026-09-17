export interface ListAllAreasResponse {
  meals: Meal[];
}
interface Meal {
  strArea: string;
  strCountry: string;
}
