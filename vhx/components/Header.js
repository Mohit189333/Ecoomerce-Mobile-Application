import React, { useContext } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MyContext } from "./MyContextProvider";

const Header = ({ showarrow, showcate, shownotification }) => {
  const navigation = useNavigation();
  const { onShare, cartItems, categoryhead } = useContext(MyContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconp}>
        {showarrow && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={23} color="black" />
          </TouchableOpacity>
        )}
        <Image source={require("../assets/kp.jpg")} style={styles.logo} />
      </View>

      {showcate && <Text>{categoryhead}</Text>}

      <View style={styles.iconi}>
        {shownotification ? (
          <TouchableOpacity style={styles.icon} onPress={onShare}>
            <AntDesign name="sharealt" size={23} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("notification")}
          >
            <Ionicons name="notifications-outline" size={23} color="black" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("wishlist")}
        >
          <AntDesign name="hearto" size={23} color="black" />
        </TouchableOpacity>

        <View style={styles.cartContainer}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => navigation.navigate("cart")}
          >
            <AntDesign name="shoppingcart" size={23} color="black" />
          </TouchableOpacity>
          {cartItems.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.17,
    borderBottomColor: "rgba(0,0,0,0.2)",
    padding: 3,
    paddingLeft: 8,
    paddingRight: 20,
    backgroundColor: "white",
    elevation: 4,
  },
  logo: {
    width: 80,
    height: 35,
  },
  iconi: {
    flexDirection: "row",
    gap: 20,
  },
  iconp: {
    flexDirection: "row",
    paddingLeft: 8,
    gap: 5,
  },
  icon: {},
  cartContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    right: -10,
    top: -4,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
