import { useMemo } from "react";

import { CountryMeal } from "../../../api/model/listAllAreas-model";
import { getRandomAreas } from "../utils/randomAreas";

export function useRandomAreas(areas: CountryMeal[], count = 10, minGap = 10) {
  return useMemo(
    () => getRandomAreas(areas, count, minGap),
    [areas, count, minGap],
  );
}
