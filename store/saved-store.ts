import AsyncStorage from "@react-native-async-storage/async-storage";
import { atom } from "jotai";

const COOKMATE_SAVED_KEY = "Cookmate_saved_recipes";

// ─── AsyncStorage helpers ──────────────────────────────────────────────────

export const getStoredSavedIds = async (): Promise<string[]> => {
  try {
    const raw = await AsyncStorage.getItem(COOKMATE_SAVED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const setStoredSavedIds = async (ids: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(COOKMATE_SAVED_KEY, JSON.stringify(ids));
  } catch {}
};

// ─── Atoms ─────────────────────────────────────────────────────────────────

/**
 * Synchronous atom holding saved recipe IDs.
 * Hydrate once on app mount:
 *
 *   const [, setSavedIds] = useAtom(savedIdsAtom);
 *   useEffect(() => { getStoredSavedIds().then(setSavedIds); }, []);
 */
export const savedIdsAtom = atom<string[]>([]);

/** Read-only derived atom – true if the given meal is saved. */
export const isSavedAtom = (mealId: string) =>
  atom((get) => get(savedIdsAtom).includes(mealId));

/** Write atom – toggles a meal and auto-persists to AsyncStorage. */
export const toggleSavedAtom = atom(null, (get, set, mealId: string) => {
  const current = get(savedIdsAtom);
  const next = current.includes(mealId)
    ? current.filter((id) => id !== mealId)
    : [...current, mealId];
  set(savedIdsAtom, next);
  setStoredSavedIds(next);
});
