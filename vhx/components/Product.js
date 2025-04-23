import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { MyContext } from "./MyContextProvider";
import { useRoute } from "@react-navigation/native";

const Product = () => {
  const { data, handleProductPress } = useContext(MyContext);

  const route = useRoute();
  const { category } = route.params || {};

  const filteredData = category
    ? data.filter((outer) => outer.product_category === category)
    : data;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {filteredData.map((outer) => (
        <View key={outer.id}>
          {!category && (
            <Text style={styles.txt}>{outer.product_category}</Text>
          )}
          <View style={styles.row} key={outer.id}>
            {outer.product_container.map((inner) => (
              <TouchableOpacity
                key={inner.id}
                style={styles.box}
                onPress={() => handleProductPress(outer, inner)}
              >
                <Image
                  source={{ uri: inner.product_img }}
                  style={styles.productImage}
                />
                <Text style={styles.boxText}>{inner.product_name}</Text>
                <Text style={styles.boxPrice}>₹{inner.product_price}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // marginTop: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "white",
    width: "48%",
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  boxPrice: {
    fontSize: 14,
    color: "#888",
  },
  txt: {
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
  },
});
