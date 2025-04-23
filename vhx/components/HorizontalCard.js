import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MyContext } from "./MyContextProvider";

const HorizontalCard = () => {
  const { data, handleCategoryPress } = useContext(MyContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Popular</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.row}>
          {data.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => handleCategoryPress(item.product_category)}
              style={styles.shad}
            >
              <Image
                style={styles.tinyLogo}
                source={{ uri: item.category_img }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HorizontalCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    // paddingBottom:10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  box: {},

  shad: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  tinyLogo: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  text: {
    padding: 10,
    fontSize: 21,
    marginBottom: 10,
  },
});
