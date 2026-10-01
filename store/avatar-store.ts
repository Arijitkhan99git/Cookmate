import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<string | null>(() => AsyncStorage);

export const avatarUriAtom = atomWithStorage<string | null>(
  "cookmate-avatar-uri",
  null,
  storage,
);
