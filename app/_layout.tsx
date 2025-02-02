import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    WixMadeforText: require("../assets/fonts/WixMadeforText-VariableFont_wght.ttf"),
    Gaegu: require("../assets/fonts/Gaegu-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="analyze"
        options={{
          title: "Analyze",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
