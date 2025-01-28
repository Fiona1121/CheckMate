import colors from "@/themes/colors";
import { globalStyles } from "@/themes/globalStyles";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  isExpanded: Animated.SharedValue<boolean>;
  index: number;
  buttonLabel: string;
  buttonEndIcon: React.ReactNode;
};

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function FloatingActionButton({
  isExpanded,
  index,
  buttonLabel,
  buttonEndIcon,
}: Props) {
  const [isPressed, setPressed] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index + 12 : 0;
    const delay = index * 50;

    const translateX = isExpanded.value ? 0 : withDelay(delay, withTiming(80));
    const translateY = withSpring(-moveValue, SPRING_CONFIG);
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        {
          translateX,
        },
        {
          translateY: withDelay(delay, translateY),
        },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        animatedStyles,
        globalStyles.shadow,
        styles.button,
        {
          backgroundColor: isPressed
            ? colors.primary.default
            : colors.neutral.white,
        },
      ]}
    >
      <Animated.Text style={styles.content}>{buttonLabel}</Animated.Text>
      {buttonEndIcon}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 54,
    backgroundColor: "#fff",
    position: "absolute",
    borderRadius: 8,
    borderWidth: 1.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
    zIndex: -1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  content: {
    color: "#000",
    fontWeight: 500,
    fontSize: 16,
  },
});

export default FloatingActionButton;
