import FloatingActionButton from "@/components/FloatingActionButton";
import {
  CameraAddIcon,
  PenIcon,
  PhotoIcon,
  PlusIcon,
} from "@/components/Icons";
import { globalStyles } from "@/themes/globalStyles";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  Button,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HomeScreen() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    setDropdownVisible(!isDropdownVisible);
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Overlay */}
      {isDropdownVisible && (
        <Pressable
          style={globalStyles.overlay}
          onPress={handlePress} // Close dropdown when overlay is tapped
        />
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
            style={[styles.floatingButton, globalStyles.shadow]}
          >
            <Animated.Text style={[plusIconStyle, styles.floatingButtonText]}>
              +
            </Animated.Text>
          </AnimatedPressable>
          <FloatingActionButton
            isExpanded={isExpanded}
            index={3}
            buttonLabel="Take a New Photo"
            buttonEndIcon={<CameraAddIcon />}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={2}
            buttonLabel="Pick from Gallery"
            buttonEndIcon={<PhotoIcon />}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={1}
            buttonLabel="Enter Manually"
            buttonEndIcon={<PenIcon />}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    position: "relative",
  },
  imageContainer: {
    position: "relative", // Enables the button to position relative to this container
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 560,
  },
  floatingButton: {
    padding: 0,
    width: 52,
    height: 52,
    backgroundColor: "#FB8232",
    borderRadius: 30,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  floatingButtonText: {
    color: "#000",
    fontSize: 30,
    fontWeight: "semibold",
    textAlign: "center",
  },
  buttonContainer: {
    width: 240,
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    bottom: 48,
    right: 4,
    zIndex: 300,
  },
});
