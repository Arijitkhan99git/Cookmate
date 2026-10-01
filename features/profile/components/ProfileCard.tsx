import { AppText } from "@/components/AppText";
import NormalBadge from "@/components/NormalBadge";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useAtom } from "jotai";
import { Camera, Flame, ImageOff, Plus, User, X } from "lucide-react-native";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useThemeColors } from "../../../constants/color-pallette";
import { useGenericShadow } from "../../../constants/genericShadowStyle";
import { fonts } from "../../../constants/typography";
import { avatarUriAtom } from "../../../store/avatar-store";

export default function ProfileCard() {
  const {
    surfaceAccent,
    text: textColor,
    textSecondary,
    primary,
    surfaceSubtle,
    card,
    border,
    isDarkMode,
    orangeTint,
    surfaceHigh,
  } = useThemeColors();

  const shadowStyle = useGenericShadow(2);
  const [avatarUri, setAvatarUri] = useAtom(avatarUriAtom);
  const [modalVisible, setModalVisible] = useState(false);

  const ringColors = isDarkMode
    ? (["#d8b9ab", "#b57a42", "#6c574c"] as const)
    : (["#ffb37a", "#ff8c42", "#c0603a"] as const);

  const secondGradientColors = isDarkMode
    ? ([card, "#2e1d12ff", "#462d1eff"] as const)
    : (["#ffffffff", "#feeee1ff", "#ffe0c8ff"] as const);

  //Image picker helper function
  const pickImage = async () => {
    setModalVisible(false);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]?.uri) return;

    const pickedUri = result.assets[0].uri;
    const fileExt = pickedUri.split(".").pop() ?? "jpg";

    try {
      // Delete the previous avatar file, if any
      if (avatarUri) {
        //create the File object from the exsisting uri
        const oldFile = new File(avatarUri);
        if (oldFile.exists) {
          oldFile.delete();
        }
      }

      //Create the File object with picked uri
      const sourceFile = new File(pickedUri);

      //Create a file reference inside my application's document directory with this filename.
      const destFile = new File(
        Paths.document,
        `avatar-${Date.now()}.${fileExt}`,
      );

      //Take the file represented by sourceFile and make a copy of it at the location represented by destFile.
      await sourceFile.copy(destFile);

      setAvatarUri(destFile.uri);
    } catch (err) {
      console.error("Failed to save avatar:", err);
    }
  };

  const deleteAvatar = () => {
    if (avatarUri) {
      try {
        const file = new File(avatarUri);
        if (file.exists) file.delete();
      } catch (err) {
        console.error("Failed to delete avatar:", err);
      }
    }
    setAvatarUri(null);
    setModalVisible(false);
  };

  return (
    <LinearGradient
      colors={secondGradientColors}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={[
        shadowStyle,
        {
          alignItems: "center",
          gap: 6,
          borderRadius: 18,
          padding: 16,
        },
      ]}
    >
      {/* ── Avatar Options Modal ──────────────────────────────── */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          {/* Prevent taps inside the card from closing the modal */}
          <Pressable
            style={[
              styles.modalCard,
              {
                backgroundColor: card,
                borderColor: border,
              },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={[
                styles.closeBtn,
                { backgroundColor: isDarkMode ? "#3d2920" : "#f5e8e0" },
              ]}
              hitSlop={8}
            >
              <X size={16} color={textSecondary} strokeWidth={2.5} />
            </TouchableOpacity>

            {/* Avatar preview */}
            <LinearGradient
              colors={ringColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.previewRing}
            >
              {avatarUri ? (
                <Image
                  source={{ uri: avatarUri }}
                  style={styles.previewImage}
                />
              ) : (
                <View
                  style={[
                    styles.previewFallback,
                    { backgroundColor: isDarkMode ? "#29201C" : "#fcf1edff" },
                  ]}
                >
                  <User
                    size={52}
                    color={isDarkMode ? "#d8b9abff" : "#6c574cff"}
                  />
                </View>
              )}
            </LinearGradient>

            <AppText
              style={{
                fontSize: 15,
                fontFamily: fonts.semibold,
                color: textColor,
                marginTop: 4,
                marginBottom: 16,
              }}
            >
              Profile Photo
            </AppText>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              {/* Change / Add photo */}
              <TouchableOpacity
                onPress={pickImage}
                style={[
                  styles.actionBtn,
                  {
                    backgroundColor: isDarkMode ? "#3a2318" : "#fff4ee",
                    borderColor: isDarkMode ? "#6b3a2a" : "#f5c8ab",
                  },
                ]}
                activeOpacity={0.75}
              >
                <LinearGradient
                  colors={ringColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.actionIconCircle}
                >
                  <Camera size={20} color="#fff" strokeWidth={2} />
                </LinearGradient>
                <AppText
                  style={{
                    fontSize: 13,
                    fontFamily: fonts.semibold,
                    color: textColor,
                    marginTop: 6,
                  }}
                >
                  {avatarUri ? "Change" : "Add Photo"}
                </AppText>
              </TouchableOpacity>

              {/* Delete photo — only visible when there's an avatar */}
              {avatarUri && (
                <TouchableOpacity
                  onPress={deleteAvatar}
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: isDarkMode ? "#2e1a1a" : "#fff0f0",
                      borderColor: isDarkMode ? "#5e2828" : "#f5baba",
                    },
                  ]}
                  activeOpacity={0.75}
                >
                  <View
                    style={[
                      styles.actionIconCircle,
                      { backgroundColor: isDarkMode ? "#8b2020" : "#e53e3e" },
                    ]}
                  >
                    <ImageOff size={20} color="#fff" strokeWidth={2} />
                  </View>
                  <AppText
                    style={{
                      fontSize: 13,
                      fontFamily: fonts.semibold,
                      color: isDarkMode ? "#f08080" : "#c53030",
                      marginTop: 6,
                    }}
                  >
                    Remove
                  </AppText>
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Avatar ───────────────────────────────────────────── */}
      <Pressable
        onPress={avatarUri ? () => setModalVisible(true) : pickImage}
        style={{ position: "relative", marginBottom: 8 }}
      >
        {/* Gradient border ring */}
        <LinearGradient
          colors={ringColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            shadowStyle,
            {
              width: 84,
              height: 84,
              borderRadius: 42,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
          ) : (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: isDarkMode ? "#29201C" : "#fcf1edff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={35} color={isDarkMode ? "#d8b9abff" : "#6c574cff"} />
            </View>
          )}
        </LinearGradient>

        {/* Camera edit badge (always visible to signal tappability) */}
        <LinearGradient
          colors={ringColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: card,
          }}
        >
          {avatarUri ? (
            <Camera color="#fff" size={13} strokeWidth={2.5} />
          ) : (
            <Plus color="#fff" size={16} strokeWidth={2} />
          )}
        </LinearGradient>
      </Pressable>

      {/* Name + Pro badge */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <AppText
          style={{
            fontSize: 22,
            fontFamily: fonts.bold,
            color: textColor,
            opacity: 0.9,
          }}
        >
          Arijit
        </AppText>
        <View>
          <NormalBadge
            badgeTitle="PRO"
            fontFamily={fonts.semibold}
            lightBgColor="#eadbceff"
            lightTextColor={orangeTint}
          />
        </View>
      </View>

      <AppText
        style={{
          fontSize: 13,
          fontFamily: fonts.medium,
          color: isDarkMode ? "#c4a487ff" : "#ca9a70ff",
        }}
      >
        Culinary Enthusiast & Home Cook
      </AppText>

      {/* Level badge */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          backgroundColor: surfaceSubtle,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
        }}
      >
        <Flame size={16} color={"#b7863cff"} fill={"#b7863cff"} />
        <AppText
          style={{
            fontSize: 12,
            color: primary,
            fontFamily: fonts.semibold,
          }}
        >
          Level 4 Gourmet
        </AppText>
      </View>

      {/* Stats row */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginTop: 12,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: border,
          paddingTop: 14,
        }}
      >
        {[
          { value: "18", label: "Saved" },
          { value: "42", label: "Cooked" },
          { value: "12", label: "Custom" },
          { value: "4.9", label: "Rating" },
        ].map((stat, i, arr) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: "center",
              borderRightWidth:
                i < arr.length - 1 ? StyleSheet.hairlineWidth : 0,
              borderRightColor: border,
            }}
          >
            <AppText
              style={{
                fontSize: 22,
                fontFamily: fonts.bold,
                color: textColor,
                opacity: 0.8,
              }}
            >
              {stat.value}
            </AppText>
            <AppText
              style={{
                fontSize: 11,
                color: textSecondary,
                marginTop: 2,
              }}
            >
              {stat.label}
            </AppText>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  modalCard: {
    width: "100%",
    borderRadius: 24,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  previewRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  previewImage: {
    width: 114,
    height: 114,
    borderRadius: 57,
  },
  previewFallback: {
    width: 114,
    height: 114,
    borderRadius: 57,
    alignItems: "center",
    justifyContent: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});
