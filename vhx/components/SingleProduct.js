import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import { FontAwesome } from "@expo/vector-icons";
import { MyContext } from "./MyContextProvider";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const SingleProduct = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category, product } = route.params || {};
  const {
    setHeaderr,
    handlecart,
    setSizei,
    sizei,
    isProductInCart,
    handlewish,
    isProductInWish,
    handleRemoveItemwish,
  } = useContext(MyContext);

  useEffect(() => {
    setHeaderr(product);
  }, [product]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {isProductInWish(category.id, product.id) ? (
            <TouchableOpacity
              style={styles.wishlistIcon}
              onPress={() => handleRemoveItemwish(category.id, product.id)}
            >
              <AntDesign name="heart" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.wishlistIcon}
              onPress={() => handlewish(category.id, product.id)}
            >
              <FontAwesome name="heart-o" size={24} color="black" />
            </TouchableOpacity>
          )}
          <Swiper
            style={styles.swiper}
            dotColor="white"
            activeDotColor="black"
            showsButtons={false}
            autoplay={true}
          >
            {product.side_img.map((side) => (
              <View key={side.id} style={styles.slide}>
                <Image source={{ uri: side.img }} style={styles.productImage} />
              </View>
            ))}
          </Swiper>
        </View>
        <Text style={styles.productName}>{product.product_name}</Text>
        <Text style={styles.productPrice}>
          ₹{product.product_price}{" "}
          <Text style={styles.productPriceDeleted}>
            ₹{product.product_price_deleted}
          </Text>
        </Text>
        <Text style={[styles.productDescription, styles.colorfulText]}>
          {product.product_description}
        </Text>
        <Text style={styles.rating}>
          Rating: {product.rating} ({product.count} reviews)
        </Text>
        <View style={styles.sizeContainer}>
          {product.size_main.map((size) => (
            <TouchableOpacity
              key={size.id}
              style={
                sizei === size.size ? styles.sizeBoxSelected : styles.sizeBox
              }
              onPress={() => setSizei(size.size)}
            >
              <Text
                style={
                  sizei === size.size
                    ? styles.sizeTextSelected
                    : styles.sizeText
                }
              >
                {size.size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        {isProductInCart(category.id, product.id) ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => navigation.navigate("cart")}
          >
            <Text style={styles.addToCartButtonText}>Go To Cart</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => handlecart(category, product)}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingBottom: 10,

    backgroundColor: "white",
  },
  imageContainer: {
    height: 500,
    marginBottom: 20,
  },
  swiper: {
    height: 500,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    position: "relative",
  },
  productImage: {
    width: width * 1,
    height: 500,
  },
  wishlistIcon: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
  },

  wishlistIcon1: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
    backgroundColor: "black",
  },

  productName: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "left",
    color: "rgba(0,0,0,0.7)",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  productPriceDeleted: {
    textDecorationLine: "line-through",
    color: "black",
    fontSize: 16,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  colorfulText: {
    color: "rgba(0,0,0,0.6)",
  },
  sizeContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    flexWrap: "wrap",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 70,
    color: "black",
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  sizeBoxSelected: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "black",
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  sizeText: {
    fontSize: 18,
    color: "black",
  },
  sizeTextSelected: {
    fontSize: 18,
    color: "white",
  },
  rating: {
    fontSize: 18,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  bottom: {
    backgroundColor: "white",
    position: "absolute",
    height: 60,
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addToCartButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    width: "60%",

    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
  },
});
