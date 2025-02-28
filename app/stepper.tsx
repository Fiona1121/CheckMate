import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AnimatedStepper from "@/components/AnimatedStepper";
import { globalStyles } from "@/themes/globalStyles";
import colors from "@/themes/colors";
import { Image, TextField } from "react-native-ui-lib";
import {
  ArrowLeftIcon,
  CounterMinusIcon,
  CounterPlusIcon,
} from "@/components/Icons";
import ItemCard from "@/components/ItemCard";

const StepperScreen = () => {
  const params = useLocalSearchParams();
  const receiptData = Array.isArray(params.receiptData)
    ? params.receiptData[0]
    : params.receiptData;
  const parsedReceipt = receiptData ? JSON.parse(receiptData) : null;
  const [receipt, setReceipt] = useState(parsedReceipt);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [serviceFee, setServiceFee] = useState<string>(
    parsedReceipt?.serviceFee?.toFixed(2).toString() || "0.00"
  );
  const [deliveryFee, setDeliveryFee] = useState<string>(
    parsedReceipt?.deliveryFee?.toFixed(2).toString() || "0.00"
  );
  const [discount, setDiscount] = useState<string>(
    parsedReceipt?.discount?.toFixed(2).toString() || "0.00"
  );
  const [tax, setTax] = useState<string>(
    parsedReceipt?.tax?.toFixed(2).toString() || "0.00"
  );
  const [tipAmount, setTipAmount] = useState<string>(
    parsedReceipt?.tip?.toFixed(2).toString() || "0.00"
  );

  const [items, setItems] = useState(
    parsedReceipt?.items.map((item: any) => ({
      ...item,
      selected: false,
    }))
  );
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log("Loaded receipt data:", parsedReceipt);
    console.log("Parsed items:", items);
    console.log(parsedReceipt?.serviceFee);
    console.log(parsedReceipt?.deliveryFee);
    console.log(parsedReceipt?.discount);
    console.log(parsedReceipt?.tax);
    console.log(parsedReceipt?.tip);
  }, []);

  const goNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    if (currentStep === 1) {
      return router.push({
        pathname: "/",
      });
    }

    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleEditPrice = (id: any, newPrice: number) => {
    const newItems = items.map((item: any) =>
      item.id === id ? { ...item, price: newPrice } : item
    );
    setItems(newItems);
  };

  return (
    <View
      style={
        (globalStyles.container,
        {
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 40,
          backgroundColor: "#fff",
        })
      }
    >
      {/* Stepper Progress */}
      <AnimatedStepper currentStep={currentStep} totalSteps={totalSteps} />

      {/* Back Button */}
      <Pressable
        onPress={goBack}
        style={{ position: "absolute", left: 32, top: 72 }}
      >
        <ArrowLeftIcon />
      </Pressable>

      {/* Conditional Rendering of Step Content */}
      <View style={[styles.contentContainer]}>
        {/* {currentStep === 1 && (
          <View style={styles.step1Container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/images/asking-assistance.png")}
                resizeMode="contain"
                style={[styles.image]}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.strongText]}>Almost Ready...</Text>
              <Text style={[styles.bodyText]}>
                How would you like to split the bill?
              </Text>
            </View>

            <View style={styles.actionContainer}>
              <Pressable
                onPress={goNext}
                style={[
                  globalStyles.buttonSecondary,
                  globalStyles.shadow,
                  styles.actionButton,
                ]}
              >
                <Text style={[globalStyles.buttonText]}>Select Your Items</Text>
              </Pressable>
              <Pressable
                onPress={goNext}
                style={[
                  globalStyles.buttonSecondary,
                  globalStyles.shadow,
                  styles.actionButton,
                ]}
              >
                <Text style={[globalStyles.buttonText]}>Split Evenly</Text>
              </Pressable>
            </View>
          </View>
        )} */}

        {currentStep === 1 && (
          <>
            <View style={styles.toolBar}>
              <View style={styles.totalContainer}>
                <Text
                  style={{
                    fontFamily: "AvenirNext-Bold",
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.primary.default,
                    marginRight: 10,
                  }}
                >
                  Subtotal:
                </Text>
                <Text
                  style={{
                    fontFamily: "AvenirNext-Regular",
                    fontSize: 16,
                    marginRight: 2,
                  }}
                >
                  $
                </Text>
                <Text
                  style={{ fontFamily: "AvenirNext-Regular", fontSize: 24 }}
                >
                  {items
                    .filter((item: any) => item.selected)
                    .reduce((acc: number, item: any) => acc + item.price, 0)
                    .toFixed(2)}
                </Text>
              </View>
              <Pressable
                style={{
                  ...styles.editButton,
                  backgroundColor: colors.primary.default,
                }}
                onPress={() => setEdit(!edit)}
              >
                <Text style={styles.editButtonText}>
                  {edit ? "Done ✓" : "Edit"}
                </Text>
              </Pressable>
            </View>

            {/* Display Extracted Items */}
            <FlatList
              data={items}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <ItemCard
                  label={item.name}
                  price={item.price}
                  selected={item.selected}
                  onSelect={() => {
                    const newItems = items.map((i: any) =>
                      i.id === item.id ? { ...i, selected: !i.selected } : i
                    );
                    setItems(newItems);
                  }}
                  allowEdit={edit}
                  onEdit={(newPrice: number) =>
                    handleEditPrice(item.id, newPrice)
                  }
                />
              )}
            />

            <View style={styles.actionContainer}>
              <Pressable
                onPress={goNext}
                style={[globalStyles.buttonPrimary, globalStyles.shadow]}
              >
                <Text style={[globalStyles.buttonText]}>Next</Text>
              </Pressable>
            </View>
          </>
        )}

        {/* add additional cost */}
        {currentStep === 2 && (
          <View style={styles.step2Container}>
            <View style={styles.additionalCostContainer}>
              <Text
                style={{
                  fontFamily: "AvenirNext-Regular",
                  fontSize: 18,
                  color: colors.primary.default,
                }}
              >
                Service Fee:
              </Text>
              <TextField
                value={serviceFee}
                onChangeText={setServiceFee}
                keyboardType="decimal-pad"
                containerStyle={styles.textfield}
                centered
                leadingAccessory={
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    $
                  </Text>
                }
              />
            </View>
            <View style={styles.additionalCostContainer}>
              <Text
                style={{
                  fontFamily: "AvenirNext-Regular",
                  fontSize: 18,
                  color: colors.primary.default,
                }}
              >
                Delivery Fee:
              </Text>
              <TextField
                value={deliveryFee}
                onChangeText={setDeliveryFee}
                keyboardType="decimal-pad"
                containerStyle={styles.textfield}
                centered
                leadingAccessory={
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    $
                  </Text>
                }
              />
            </View>
            <View style={styles.additionalCostContainer}>
              <Text
                style={{
                  fontFamily: "AvenirNext-Regular",
                  fontSize: 18,
                  color: colors.primary.default,
                }}
              >
                Discount:
              </Text>
              <TextField
                value={discount}
                onChangeText={setDiscount}
                keyboardType="decimal-pad"
                containerStyle={styles.textfield}
                centered
                leadingAccessory={
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    -$
                  </Text>
                }
              />
            </View>
            <View style={styles.additionalCostContainer}>
              <Text
                style={{
                  fontFamily: "AvenirNext-Regular",
                  fontSize: 18,
                  color: colors.primary.default,
                }}
              >
                Tax:
              </Text>
              <TextField
                value={tax}
                onChangeText={setTax}
                keyboardType="decimal-pad"
                containerStyle={styles.textfield}
                centered
                leadingAccessory={
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    $
                  </Text>
                }
              />
            </View>
            <View style={styles.additionalCostContainer}>
              <Text
                style={{
                  fontFamily: "AvenirNext-Regular",
                  fontSize: 18,
                  color: colors.primary.default,
                }}
              >
                Total Tip:
              </Text>
              <TextField
                value={tipAmount}
                onChangeText={setTipAmount}
                keyboardType="decimal-pad"
                containerStyle={styles.textfield}
                centered
                leadingAccessory={
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    $
                  </Text>
                }
              />
            </View>
            <View style={styles.actionContainer}>
              <Pressable
                onPress={goNext}
                style={[globalStyles.buttonPrimary, globalStyles.shadow]}
              >
                <Text style={[globalStyles.buttonText]}>Next</Text>
              </Pressable>
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View style={styles.step2Container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/images/loving-pizza-drink.png")}
                resizeMode="contain"
                style={[styles.image]}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={[styles.bodyText]}>
                How many hungry humans are splitting this feast? 🍕👫👬👭
              </Text>
            </View>
            <View style={[styles.counterContainer]}>
              <Pressable
                onPress={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              >
                <CounterMinusIcon />
              </Pressable>
              <Text style={styles.peopleCountText}>{peopleCount}</Text>
              <Pressable onPress={() => setPeopleCount(peopleCount + 1)}>
                <CounterPlusIcon />
              </Pressable>
            </View>
            <View style={styles.actionContainer}>
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/result",
                    params: {
                      items,
                      peopleCount,
                      serviceFee: parseFloat(serviceFee),
                      deliveryFee: parseFloat(deliveryFee),
                      discount: parseFloat(discount),
                      tax: parseFloat(tax),
                      tipAmount: parseFloat(tipAmount),
                    },
                  })
                }
                style={[globalStyles.buttonPrimary, globalStyles.shadow]}
              >
                <Text style={[globalStyles.buttonText]}>Calculate!</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default StepperScreen;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  step1Container: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  step2Container: {
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 360,
    maxWidth: "100%",
  },
  actionContainer: {
    backgroundColor: colors.neutral.white,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 12,
  },
  actionButton: {
    width: "100%",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 10,
  },
  strongText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary.default,
  },
  bodyText: {
    fontFamily: "WixMadeforText-Bold",
    fontSize: 18,
    lineHeight: 28,
    color: colors.neutral.black,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  iconButton: {
    width: 32,
    height: 32,
  },
  peopleCountText: {
    fontFamily: "WixMadeforText-Bold",
    fontSize: 16,
    width: 40,
    textAlign: "center",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  toolBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  editButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
  },
  editButtonText: {
    color: colors.neutral.white,
  },
  additionalCostContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 20,
    gap: 20,
  },
  textfield: {
    backgroundColor: colors.neutral.grayLight,
    padding: 6,
    width: 80,
    borderRadius: 99,
    textAlign: "center",
  },
  topDivider: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.grayLight,
    paddingTop: 20,
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
});
