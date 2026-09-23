import { View } from "react-native";
import { useThemeColors } from "../../constants/color-pallette";

import { AppText } from "@/components/AppText";
import { Gauge, Timer, Users, Utensils } from "lucide-react-native";
import { fonts } from "../../constants/typography";

const RecipeStats = ({ cuisineType }: { cuisineType: string }) => {
  const {
    text: textColor,
    danger,
    primary,
    success,
    rating,
    isDarkMode,
  } = useThemeColors();
  const statBg = isDarkMode ? "#3e2f2fff" : "#faf2e3ff";

  const statData = [
    {
      icon: <Timer color={primary} />,
      title: "Time",
      description: "25-30m",
    },
    {
      icon: <Utensils color={rating} />,
      title: "Cuisine",
      description: cuisineType,
    },
    {
      icon: <Gauge color={success} />,
      title: "Level",
      description: "Easy",
    },
    {
      icon: <Users color={danger} />,
      title: "Servings",
      description: "2 Serves",
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
      }}
    >
      {statData.map((stat) => (
        <View
          key={stat.title}
          style={{
            backgroundColor: statBg,
            paddingHorizontal: 5,
            paddingVertical: 12,
            borderRadius: 20,
            gap: 4,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>{stat.icon}</View>
          <AppText
            style={{
              color: textColor,
              fontFamily: fonts.medium,
              opacity: 0.8,
              fontSize: 12,
            }}
          >
            {stat.title}
          </AppText>
          <AppText
            style={{ color: textColor, fontFamily: fonts.bold, fontSize: 12 }}
          >
            {stat.description}
          </AppText>
        </View>
      ))}
    </View>
  );
};

export default RecipeStats;
