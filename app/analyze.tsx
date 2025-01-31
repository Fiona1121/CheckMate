import colors from "@/themes/colors";
import { globalStyles } from "@/themes/globalStyles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Button, Image, ProgressBar, View } from "react-native-ui-lib";

type Props = {};

function AnalyzeScreen({}: Props) {
  const router = useRouter();
  return (
    <View style={[globalStyles.container, globalStyles.bgPrimary]}>
      <View style={[styles.boxContainer, globalStyles.shadow]}>
        <Image
          source={require("../assets/images/analyzing-text.png")}
          resizeMode="contain"
          style={[styles.textTitle]}
        />
        <Image
          source={require("../assets/images/3-coins.png")}
          resizeMode="contain"
          style={[styles.image]}
        />
        <ProgressBar
          progress={50}
          progressColor={colors.primary.default}
          style={styles.progressBar}
        />
      </View>
      <Button
        label="Back"
        hyperlink
        linkColor={colors.neutral.black}
        style={styles.backButton}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 24,
    paddingVertical: 80,
    backgroundColor: colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1.5,
    borderBlockColor: colors.neutral.black,
  },
  textTitle: {
    width: 300,
    height: 120,
    maxWidth: "100%",
  },
  image: {
    width: 240,
    height: 100,
    maxWidth: "100%",
  },
  progressBar: {
    width: 280,
    maxWidth: "100%",
    height: 10,
    marginTop: 20,
    borderColor: colors.neutral.black,
    borderWidth: 1.4,
  },
  backButton: {
    position: "absolute",
    bottom: 80,
  },
});

export default AnalyzeScreen;
