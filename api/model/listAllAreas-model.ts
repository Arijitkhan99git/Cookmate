export interface ListAllAreasResponse {
  meals: CountryMeal[];
}
export interface CountryMeal {
  strArea: string;
  strCountry: string;
}
