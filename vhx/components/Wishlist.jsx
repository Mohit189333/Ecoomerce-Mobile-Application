import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "./MyContextProvider";

const Wishlist = () => {
  const navigation = useNavigation();
  const { data, token, wishItems, setWishItems, handleRemoveItemwish } =
    useContext(MyContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!token) {
          Alert.alert("Please login");
          navigation.navigate("account");
          return;
        }

        const response = await fetch("https://vhx.vercel.app/wish", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setWishItems(data.wishInfo);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        Alert.alert("Error", "Failed to fetch cart items.");
      }
    };

    fetchCartItems();
  }, [token, setWishItems]);

  const wishProductData =
    wishItems &&
    wishItems
      .map((wish) => {
        const category = data.find(
          (category) => category.id === wish.categoryid
        );

        if (category && category.product_container) {
          const product = category.product_container.find(
            (product) => product.id === wish.productid
          );

          if (product) {
            return { ...product, ...wish };
          }
        }

        return null;
      })
      .filter((item) => item !== null);

  return (
    <ScrollView style={styles.container}>
      {wishItems && wishItems.length > 0 ? (
        <>
          <Text style={styles.totalItemsText}>
            Total items: {wishItems.length}
          </Text>
          {wishProductData.map((item) => (
            <View
              key={`${item.categoryid}-${item.productid}`}
              style={styles.cartItem}
            >
              <Image
                source={{ uri: item.product_img }}
                style={styles.productImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.product_name}</Text>
                <Text style={styles.productPrice}>₹{item.product_price}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    handleRemoveItemwish(item.categoryid, item.productid)
                  }
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.emptyMessage}>Your wishlist is empty</Text>
      )}
    </ScrollView>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  totalItemsText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  productSize: {
    fontSize: 16,
    color: "#000",
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 8,
  },
  removeButtonText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});
