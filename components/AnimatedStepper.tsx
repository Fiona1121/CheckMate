import colors from "@/themes/colors";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type StepperProps = {
  currentStep: number;
  totalSteps: number;
};

const AnimatedStepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming((currentStep - 1) / (totalSteps - 1), {
      duration: 300,
    });
  }, [currentStep]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Progress Bar Background */}
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressFill, animatedStyle]} />
      </View>

      {/* Step Circles */}
      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View key={index} style={styles.step}>
            <View
              style={[
                styles.stepCircle,
                index < currentStep ? styles.stepActive : styles.stepInactive,
              ]}
            >
              <Text
                style={[
                  styles.stepText,
                  index < currentStep ? styles.textActive : styles.textInactive,
                ]}
              >
                {index < currentStep - 1 ? "✓" : index + 1}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default AnimatedStepper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
    paddingHorizontal: 60,
  },
  progressContainer: {
    position: "absolute",
    top: "50%",
    left: 72,
    right: 72,
    height: 1,
    backgroundColor: colors.neutral.grayLight,
  },
  progressFill: {
    position: "absolute",
    left: 0,
    height: "100%",
    backgroundColor: colors.primary.default,
  },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  step: {
    alignItems: "center",
    zIndex: 2,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  stepActive: {
    backgroundColor: colors.primary.default,
    borderColor: colors.primary.default,
  },
  stepInactive: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.neutral.grayLight,
  },
  stepText: {
    fontSize: 12,
  },
  textActive: {
    color: colors.neutral.white,
  },
  textInactive: {
    color: colors.neutral.grayLight,
  },
});
