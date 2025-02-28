import colors from "@/themes/colors";
import { globalStyles } from "@/themes/globalStyles";
import { convertImageToBase64 } from "@/utils/imageManger";
import { extractReceiptPrompt } from "@/utils/openai";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Image, ProgressBar, View } from "react-native-ui-lib";

type Props = {};

function AnalyzeScreen({}: Props) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const imageUri = Array.isArray(params.imageUri)
    ? params.imageUri[0]
    : params.imageUri;

  const [progress, setProgress] = useState(0);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAnalyze = async () => {
      // Perform analysis on the imageUri
      if (!imageUri) return;

      setProgress(10);
      const progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 90) {
            return prevProgress + Math.random() * 5;
          }
          return prevProgress;
        });
      }, 500);

      try {
        const base64Image = await convertImageToBase64(imageUri);
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: extractReceiptPrompt,
                },
                {
                  role: "user",
                  content: [
                    {
                      type: "text",
                      text: "Extract receipt details from this image and return a structured JSON.",
                    },
                    {
                      type: "image_url",
                      image_url: {
                        url: `data:image/jpeg;base64,${base64Image}`,
                      },
                    },
                  ],
                },
              ],

              max_tokens: 500,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        clearInterval(progressInterval);
        setProgress(90);

        const result = await response.json();
        const extractedData = result.choices[0]?.message?.content;

        try {
          if (typeof extractedData === "string") {
            const cleanedData = extractedData
              .replace(/```json/g, "")
              .replace(/```/g, "")
              .trim();

            try {
              const parsedData = JSON.parse(cleanedData);

              // Handle "No receipt detected" case
              if (parsedData.error === "No receipt detected") {
                console.warn("No receipt found in the image.");
                setReceiptData(null);

                Alert.alert(
                  "No Receipt Found",
                  "We couldn't detect a receipt in the uploaded image. Please try again with a clearer receipt.",
                  [{ text: "OK", onPress: () => router.push("/") }] // Navigate back to Home
                );
                return;
              }

              setProgress(100);
              setLoading(false);
              router.push({
                pathname: "/stepper",
                params: { receiptData: JSON.stringify(parsedData) },
              });
            } catch (error) {
              console.error("Error parsing JSON:", error);
              setReceiptData({ error: "Invalid response format" });

              Alert.alert(
                "Parsing Error",
                "The receipt data could not be processed. Please try again.",
                [{ text: "OK", onPress: () => router.replace("/") }]
              );
            }
          } else if (typeof extractedData === "object") {
            setProgress(100);
            setLoading(false);
            router.push({
              pathname: "/stepper",
              params: { receiptData: JSON.stringify(extractedData) },
            });
          } else {
            console.error("Unknown response format:", extractedData);
            setReceiptData({ error: "Invalid response format" });

            Alert.alert(
              "Processing Error",
              "An error occurred while analyzing the receipt. Please try again.",
              [{ text: "OK", onPress: () => router.replace("/") }]
            );
          }
        } catch (error) {
          console.error("Error processing receipt data:", error);
          setReceiptData({ error: "Failed to process receipt data" });

          Alert.alert(
            "Processing Error",
            "An error occurred while analyzing the receipt. Please try again.",
            [{ text: "OK", onPress: () => router.replace("/") }]
          );
        }

        setProgress(100);
        setLoading(false);
      } catch (error) {
        clearInterval(progressInterval);
        setLoading(false);
        setProgress(0);

        console.error("Error analyzing image:", error);

        Alert.alert("Analysis Failed", "An unexpected error occurred.", [
          { text: "OK", onPress: () => router.replace("/") },
        ]);
      }
    };
    handleAnalyze();
  }, [imageUri]);

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
          progress={progress}
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
