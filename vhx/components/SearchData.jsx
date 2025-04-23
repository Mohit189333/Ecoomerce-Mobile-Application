import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { MyContext } from "./MyContextProvider";

const SearchData = () => {
  const { input, data, setInput, handleCategoryPress } = useContext(MyContext);
  return (
    <View style={styles.container}>
      {data
        .filter((i) => {
          const newdata = i.product_category.toLowerCase();
          const newinput = input.toLowerCase();
          return newinput && newdata.startsWith(newinput);
        })
        .map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() =>
              handleCategoryPress(item.product_category) || setInput("")
            }
          >
            <Text style={styles.itemText}>{item.product_category}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default SearchData;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#f5f5f5",
  },
  itemContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
});
