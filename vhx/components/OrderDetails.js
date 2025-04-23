import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "./MyContextProvider";

const OrderDetails = () => {
  const navigation = useNavigation();
  const { data, token, order, setOrder } = useContext(MyContext);

  useEffect(() => {
    if (!token) {
      return;
    }
    const fetchCartItems = async () => {
      try {
        if (!token) {
          Alert.alert("Please login");
          navigation.navigate("account");
          return;
        }

        const response = await fetch("https://vhx.vercel.app/order", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setOrder(data.orderInfo);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        Alert.alert("Error", "Failed to fetch cart items.");
      }
    };

    fetchCartItems();
  }, [token, setOrder, navigation]);

  const orderProductData =
    order &&
    order
      .map((outer) => {
        const category = data.find(
          (category) => category.id === outer.categoryid
        );

        if (category && category.product_container) {
          const product = category.product_container.find(
            (product) => product.id === outer.productid
          );

          if (product) {
            return { ...product, ...outer };
          }
        }

        return null;
      })
      .filter((item) => item !== null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        {order && order.length > 0 ? (
          <>
            <Text style={styles.totalItemsText}>
              Total items: {order.length-1}
            </Text>
            {orderProductData.map(
              (
                item,
                index // Adding index for unique key
              ) => (
                <View
                  key={`${item.productid}-${item.size}-${index}`}
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
                    <Text style={styles.productPrice}>
                      ₹{item.product_price}
                    </Text>
                    <Text style={styles.productDate}>
                      {new Date(item.orderDate).toLocaleDateString("en-GB")}
                    </Text>
                    <Text style={styles.orderId}>
                      Order ID: {item._id.slice(-6)}
                    </Text>
                  </View>
                </View>
              )
            )}
          </>
        ) : (
          <Text style={styles.emptyMessage}>Your order is empty</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetails;

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
    color: "#333",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
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
    borderRadius: 10,
    marginRight: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
    marginVertical: 5,
  },
  productDate: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  orderId: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  productSize: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
});
