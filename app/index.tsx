import FloatingActionButton from "@/components/FloatingActionButton";
import {
  CameraAddIcon,
  PenIcon,
  PhotoIcon,
  PlusIcon,
} from "@/components/Icons";
import { globalStyles } from "@/themes/globalStyles";
import { useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image, View } from "react-native-ui-lib";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const router = useRouter();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    setDropdownVisible(!isDropdownVisible);
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [{ rotate: withTiming(rotateValue) }],
    };
  });

  const handleTakePhoto = async () => {
    setDropdownVisible(!isDropdownVisible);
    isExpanded.value = !isExpanded.value;
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need camera access to take photos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "/analyze",
        params: { imageUri: result.assets[0].uri },
      });
    }
  };

  const handlePickFromGallery = async () => {
    setDropdownVisible(!isDropdownVisible);
    isExpanded.value = !isExpanded.value;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "We need gallery access to pick images."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: "/analyze",
        params: { imageUri: result.assets[0].uri },
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Overlay */}
      {isDropdownVisible && (
        <Pressable style={globalStyles.overlay} onPress={handlePress} />
      )}
      <View style={styles.imageContainer}>
        {/* Image */}
        <Image
          source={require("../assets/images/home-starter.png")}
          style={styles.image}
          resizeMode="contain"
        />
        {/* Dropdown */}
        <View style={styles.buttonContainer}>
          <AnimatedPressable
            onPress={handlePress}
            hitSlop={15}
            style={[styles.floatingButton, globalStyles.shadow]}
          >
            <Animated.View style={[plusIconStyle]}>
              <PlusIcon />
            </Animated.View>
          </AnimatedPressable>
          <FloatingActionButton
            isExpanded={isExpanded}
            index={3}
            buttonLabel="Take a New Photo"
            buttonEndIcon={<CameraAddIcon />}
            buttonOnPress={handleTakePhoto}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={2}
            buttonLabel="Pick from Gallery"
            buttonEndIcon={<PhotoIcon />}
            buttonOnPress={handlePickFromGallery}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={1}
            buttonLabel="Enter Manually"
            buttonEndIcon={<PenIcon />}
            buttonOnPress={handlePickFromGallery}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative", // Enables the button to position relative to this container
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 560,
  },
  floatingButton: {
    width: 52,
    height: 52,
    backgroundColor: "#FB8232",
    borderRadius: 30,
    borderWidth: 1.5,
    display: "flex",
    zIndex: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 240,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    bottom: 4,
    right: 4,
    zIndex: 300,
  },
});
