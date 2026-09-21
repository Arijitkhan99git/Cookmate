import { CountryMeal } from "../../../api/model/listAllAreas-model";

export function getRandomAreas(
  areas: CountryMeal[],
  count = 10,
  minGap = 10,
): CountryMeal[] {
  if (areas.length === 0) {
    return [];
  }

  if (count <= 0) {
    return [];
  }

  // Maximum number of items that can be selected
  const maxCount = Math.floor((areas.length + minGap - 1) / minGap);

  const actualCount = Math.min(count, maxCount);

  // We transform the indexes so that selecting
  // normal unique indexes automatically guarantees
  // the required minimum gap.
  const availableIndexes = areas.length - (minGap - 1) * (actualCount - 1);

  const indexes = Array.from({ length: availableIndexes }, (_, index) => index);

  // Shuffle
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  // Take the required number of indexes
  const selectedIndexes = indexes
    .slice(0, actualCount)
    .sort((a, b) => a - b)
    .map((index, position) => index + position * (minGap - 1));

  return selectedIndexes.map((index) => areas[index]);
}
