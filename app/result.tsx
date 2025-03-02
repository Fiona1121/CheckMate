import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { ArrowLeftIcon } from "@/components/Icons";
import { globalStyles } from "@/themes/globalStyles";
import { Image } from "react-native-ui-lib";
import { convertImageToBase64 } from "@/utils/imageManger";
import ViewShot, { captureRef } from "react-native-view-shot";

const SCREEN_WIDTH = Dimensions.get("window").width;

const ReceiptScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    items: string;
    total: string;
    tax: string;
    serviceFee: string;
    deliveryFee: string;
    discount: string;
    tipAmount: string;
    peopleCount: string;
  }>();

  const items = JSON.parse(decodeURIComponent(params.items || "[]"));
  const total = parseFloat(params.total || "0");
  const tax = parseFloat(params.tax || "0");
  const serviceFee = parseFloat(params.serviceFee || "0");
  const deliveryFee = parseFloat(params.deliveryFee || "0");
  const discount = parseFloat(params.discount || "0");
  const tipAmount = parseFloat(params.tipAmount || "0");
  const peopleCount = parseInt(params.peopleCount || "1");

  const subtotal = items.reduce(
    (sum: Float, item: any) =>
      sum + parseFloat(item.price) - (item.discount || 0),
    0
  );

  const taxFraction = subtotal > 0 ? subtotal / total : 0;
  const userTax = tax * taxFraction;

  const splitServiceFee = serviceFee / peopleCount;
  const splitDeliveryFee = deliveryFee / peopleCount;
  const splitDiscount = discount / peopleCount;
  const splitTip = tipAmount / peopleCount;

  const finalTotal =
    subtotal +
    userTax +
    splitServiceFee +
    splitDeliveryFee -
    splitDiscount +
    splitTip;

  const receiptRef = useRef<ViewShot>(null);

  const handleShare = async () => {
    try {
      if (!receiptRef.current) return;

      const uri = await captureRef(receiptRef, {
        fileName: `CheckMate-Receipt-#${new Date().getTime()}`,
        format: "png",
        quality: 1,
      });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Error sharing receipt:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          height: 120,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 72,
          paddingHorizontal: 32,
        }}
      >
        {/* Back Button */}
        <Pressable onPress={() => router.push("/")}>
          <ArrowLeftIcon />
        </Pressable>
      </View>

      {/* Receipt Wrapper */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 120,
          paddingBottom: 200,
        }}
      >
        <ViewShot ref={receiptRef} options={{ format: "png", quality: 0.9 }}>
          <View style={[styles.receiptWrapper, globalStyles.shadow]}>
            {/* Tab shape on top */}
            {/* <View style={styles.topTab} /> */}

            {/* Receipt Content */}
            <View style={styles.receiptContent}>
              <Text style={styles.title}>RECEIPT</Text>
              <Text style={styles.subtitle}>
                {new Date().toLocaleString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </Text>

              <View style={styles.dashedDivider} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: "#333",
                  marginTop: 10,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Your Items
              </Text>
              {/* Render Selected Items */}
              {items.map((item: any, index: number) => (
                <View key={index}>
                  <View style={styles.row}>
                    <Text style={styles.itemLabel}>{item.name}</Text>
                    <Text style={styles.itemValue}>
                      ${parseFloat(item.price).toFixed(2)}
                    </Text>
                  </View>
                  {item.discount > 0 && (
                    <View style={styles.detailsRow}>
                      <Text style={styles.detailLabel}>Discount</Text>
                      <Text style={styles.detailValue}>
                        -${parseFloat(item.discount).toFixed(2)}
                      </Text>
                    </View>
                  )}
                </View>
              ))}
              <View style={styles.dashedDivider} />
              <View style={styles.row}>
                <Text style={styles.itemLabel}>Subtotal</Text>
                <Text style={styles.itemValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.dashedDivider} />
              {/* Summary Calculations */}
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "800",
                  color: "#333",
                  marginTop: 10,
                  marginBottom: 10,
                  textAlign: "center",
                }}
              >
                Your Portion
              </Text>

              <View style={styles.row}>
                <Text style={styles.itemLabel}>Tax</Text>
                <Text style={styles.itemValue}>${userTax.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemLabel}>Service Fee</Text>
                <Text style={styles.itemValue}>
                  ${splitServiceFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemLabel}>Delivery Fee</Text>
                <Text style={styles.itemValue}>
                  ${splitDeliveryFee.toFixed(2)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemLabel}>Tip</Text>
                <Text style={styles.itemValue}>${splitTip.toFixed(2)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.itemLabel}>Discount</Text>
                <Text style={styles.itemValue}>
                  -${splitDiscount.toFixed(2)}
                </Text>
              </View>

              <View style={styles.dashedDivider} />

              {/* Final Total */}
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>TOTAL</Text>
                <Text style={styles.totalAmount}>${finalTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.dashedDivider} />

              {/* Fortune Section */}
              <Text style={styles.fortuneTitle}>TODAY’S FORTUNE</Text>
              <Text style={styles.fortuneContent}>
                TOMORROW WILL BE BETTER ❤️
              </Text>
              <View style={{ alignItems: "center", paddingTop: 20 }}>
                <Image
                  style={{ width: 120, height: 120 }}
                  source={require("../assets/images/cupcake.png")}
                />
              </View>
            </View>
          </View>
        </ViewShot>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Your new receipt is ready !!!</Text>
        <Text style={styles.footerSubtitle}>THANK YOU FOR BEING HAPPY!</Text>

        {/* Share Button */}
        <Pressable style={globalStyles.buttonPrimary} onPress={handleShare}>
          <Text style={globalStyles.buttonText}>Share Receipt</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", alignItems: "center" },
  backText: { fontSize: 24 },
  receiptWrapper: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: "white",
    borderRadius: 1,
    paddingTop: 80,
    paddingBottom: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  footer: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    bottom: 0,
    paddingVertical: 12,
    paddingBottom: 40,
    alignItems: "center",
    gap: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topTab: {
    position: "absolute",
    top: -30,
    width: 120,
    height: 60,
    backgroundColor: "#F5F5F5",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignSelf: "center",
  },
  receiptContent: { paddingHorizontal: 40, paddingBottom: 30 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 5,
  },
  orderNumber: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  dashedDivider: {
    borderStyle: "dashed",
    borderWidth: 0.5,
    borderColor: "#999",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    alignItems: "center",
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    maxWidth: "60%",
  },
  itemValue: { fontSize: 16, fontWeight: "500", color: "#333" },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  totalText: { fontSize: 18, fontWeight: "bold", color: "#000" },
  totalAmount: { fontSize: 18, fontWeight: "bold", color: "#000" },
  fortuneTitle: {
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
    color: "#444",
  },
  fortuneContent: {
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
    marginBottom: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FB8232",
    marginTop: 20,
  },
  footerSubtitle: { fontSize: 12, color: "#666", marginBottom: 10 },
  shareButton: { backgroundColor: "#ccc", padding: 10, borderRadius: 20 },
  shareButtonText: { fontSize: 16, fontWeight: "600", color: "#333" },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  detailLabel: { fontSize: 14, color: "#555" },
  detailValue: { fontSize: 14, color: "#555" },
});
