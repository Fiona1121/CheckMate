import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

// Convert image to Base64
export const convertImageToBase64 = async (uri: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `${base64}`;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    return null;
  }
};
