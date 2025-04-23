import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "./MyContextProvider";

const Cart = () => {
  const navigation = useNavigation();
  const {
    data,
    handleRemoveItem,
    token,
    cartItems,
    setCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useContext(MyContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!token) {
          Alert.alert("Please login");
          navigation.navigate("account");
          return;
        }

        const response = await fetch("https://vhx.vercel.app/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setCartItems(data.cartInfo);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        Alert.alert("Error", "Failed to fetch cart items.");
      }
    };

    fetchCartItems();
  }, [token, setCartItems, navigation]);

  const cartProductData =
    cartItems &&
    cartItems
      .map((cart) => {
        const category = data.find(
          (category) => category.id === cart.categoryid
        );

        if (category && category.product_container) {
          const product = category.product_container.find(
            (product) => product.id === cart.productid
          );

          if (product) {
            return { ...product, ...cart };
          }
        }

        return null;
      })
      .filter((item) => item !== null);

  // total value start
  const TotalValue = cartProductData?.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );
  // total value end

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        {cartItems.length > 0 ? (
          <>
            <Text style={styles.totalItemsText}>
              Total items: {cartItems.length}
            </Text>
            {cartProductData.map((item) => (
              <View
                key={`${item.productid}-${item.size}`}
                style={styles.cartItem}
              >
                <View>
                  <Image
                    source={{ uri: item.product_img }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productSize}>Size: {item.size}</Text>
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.productName}>{item.product_name}</Text>
                  <Text style={styles.productPrice}>₹{item.product_price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleDecreaseQuantity(
                          item.categoryid,
                          item.productid,
                          item.size
                        )
                      }
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        handleIncreaseQuantity(
                          item.categoryid,
                          item.productid,
                          item.size
                        )
                      }
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() =>
                      handleRemoveItem(
                        item.categoryid,
                        item.productid,
                        item.size
                      )
                    }
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.emptyMessage}>Your cart is empty</Text>
        )}
      </ScrollView>
      {cartItems && cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("checkout", { TotalValue })}
          >
            <Text style={styles.checkoutButtonText}>
              Checkout &nbsp; ₹{TotalValue}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 80, // Padding to prevent overlap with the checkout button
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
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  checkoutButton: {
    backgroundColor: "#4287f5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
