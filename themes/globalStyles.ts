import { StyleSheet } from "react-native";
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    zIndex: 200,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    position: "relative",
    backgroundColor: colors.neutral.white,
  },
  bgPrimary: {
    backgroundColor: colors.primary.default,
  },
  buttonPrimary: {
    backgroundColor: colors.primary.default,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonSecondary: {
    backgroundColor: colors.neutral.grayDark,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 999,
  },
  buttonText: {
    color: colors.neutral.white,
    fontFamily: "WixMadeforText-Bold",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 24,
    textAlign: "center",
  },
  normalText: {
    fontFamily: "AvenirNext-Regular",
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral.black,
  },
});
