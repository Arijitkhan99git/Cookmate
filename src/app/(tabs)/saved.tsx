import { useAtom } from "jotai";
import { Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useThemeColors } from "../../../constants/color-pallette";
import { savedIdsAtom } from "../../../store/saved-store";

const Saved = () => {
  const [ids] = useAtom(savedIdsAtom);

  const { text: textColor } = useThemeColors();

  console.log(ids);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View entering={FadeIn.duration(1000)} exiting={FadeOut}>
        <Text style={{ color: textColor }}>Appears with a fade</Text>
        {ids.map((id) => (
          <Text key={id} style={{ color: textColor }}>
            {id}
          </Text>
        ))}
      </Animated.View>
    </View>
  );
};

export default Saved;
