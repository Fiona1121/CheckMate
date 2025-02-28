import { globalStyles } from "@/themes/globalStyles";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OutlineAddIcon, OutlineRemoveIcon, PlusIcon } from "./Icons";
import colors from "@/themes/colors";
import { NumberInput, NumberInputData, TextField } from "react-native-ui-lib";

type ItemCardProps = {
  label: string;
  price: number;
  selected: boolean;
  onSelect: () => void;
  allowEdit?: boolean;
  onEdit?: (newPrice: number) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({
  label,
  price,
  selected,
  onSelect,
  allowEdit,
  onEdit,
}) => {
  const onChangeNumber = (newPrice: NumberInputData) => {
    if (onEdit) {
      if (newPrice.type === "valid") {
        onEdit(newPrice.number);
      }
    }
  };

  return (
    <View style={[styles.card, globalStyles.shadow]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* Price */}
      <View style={styles.priceContainer}>
        {allowEdit ? (
          <NumberInput
            // style={[styles.input]}
            fractionDigits={2}
            initialNumber={price}
            onChangeNumber={onChangeNumber}
            leadingText="$"
            leadingTextStyle={styles.price}
            textFieldProps={{
              style: styles.input,
              keyboardType: "number-pad",
            }}
          />
        ) : (
          <Text style={styles.price}>${price}</Text>
        )}
      </View>
      {/* Selection/Removal Button */}
      {allowEdit ? null : (
        <Pressable onPress={onSelect} style={styles.addButton}>
          {selected ? <OutlineRemoveIcon /> : <OutlineAddIcon />}
        </Pressable>
      )}
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  labelContainer: {
    flex: 1,
    maxWidth: "40%",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    minWidth: 40,
    textAlign: "center",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FB8232",
    paddingHorizontal: 5,
    color: "#555",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 24,
    gap: 2,
  },
  price: {
    fontSize: 16,
    color: "#555",
  },
  discount: {
    fontSize: 12,
    color: colors.primary.default,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "0.2s",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
