import { useNavigation } from "@react-navigation/native";
import React, { createContext, useEffect, useState } from "react";
import { Alert, Share } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MyContext = createContext();

export const MycontextProvider = ({ children }) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);

  const [token, setToken] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://vhx.vercel.app/api")
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => console.error(error));
  }, []);

  const [input, setInput] = useState("");

  const [categoryhead, setCategoryhead] = useState("");
  const handleCategoryPress = (category) => {
    navigation.navigate("product", { category });
    setCategoryhead(category);
  };

  const handleProductPress = (category, product) => {
    navigation.navigate("singleproduct", { category, product });
  };

  const [headerr, setHeaderr] = useState(null);

  const onShare = async () => {
    await Share.share({
      message: `Check out this product: ${headerr.product_name} - ₹${headerr.product_price}. Available now!
          download VHX APP Now,And Shop From Site - vhx.com`,
    });
  };

  const [sizei, setSizei] = useState("");

  const [cartItems, setCartItems] = useState([]);

  const handlecart = async (category, product) => {
    if (!token) {
      Alert.alert("Please login first");
      setSizei("");
      setTimeout(() => {
        navigation.navigate("account");
      }, 2000);
      return;
    }

    if (!sizei) {
      Alert.alert("Please select a size!");
      return;
    }

    setLoader(true);

    try {
      const response = await fetch("https://vhx.vercel.app/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryid: category.id,
          productid: product.id,
          size: sizei,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(data.message);
        setCartItems(data.cartInfo);
        setSizei("");
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoader(false);
    }
  };

  // for increase quantity in cart start
  const handleIncreaseQuantity = async (categoryid, productid, size) => {
    try {
      setLoader(true);

      const response = await fetch("https://vhx.vercel.app/increase-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryid, productid, size }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartInfo);
      } else {
        Alert.alert(data.error);
      }
      setLoader(false);
    } catch (error) {
      alert("please try again");
    }
  };

  // for increase quantity in cart end

  const handleDecreaseQuantity = async (categoryid, productid, size) => {
    try {
      setLoader(true);

      const response = await fetch("https://vhx.vercel.app/decrease-quantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryid, productid, size }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartInfo);
      } else {
        Alert.alert(data.error);
      }
      setLoader(false);
    } catch (error) {
      alert("please try again");
    }
  };

  // remove product from cart start

  const handleRemoveItem = async (categoryid, productid, size) => {
    try {
      setLoader(true);
      const response = await fetch("https://vhx.vercel.app/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryid, productid, size }),
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartInfo);
      } else {
        Alert.alert(data.error);
      }
      setLoader(false);
    } catch (error) {
      alert("please try again");
    }
  };
  // remove product from cart end

  // show go to cart start
  const isProductInCart = (categoryid, productid) => {
    if (cartItems) {
      return cartItems.find(
        (item) =>
          item.categoryid === categoryid &&
          item.productid === productid &&
          item.size === sizei
      );
    }
    return false;
  };

  // show go to cart end
  const [wishItems, setWishItems] = useState([]);

  const handlewish = async (categoryid, productid) => {
    if (!token) {
      Alert.alert("Please login first");
      setTimeout(() => {
        navigation.navigate("account");
      }, 2000);
      return;
    }

    setLoader(true);

    try {
      const response = await fetch("https://vhx.vercel.app/add-to-wish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryid,
          productid,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert(data.message);
        setWishItems(data.wishInfo);
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoader(false);
    }
  };

  // show go to cart start
  const isProductInWish = (categoryid, productid) => {
    if (wishItems) {
      return wishItems.find(
        (item) => item.categoryid === categoryid && item.productid === productid
      );
    }
    return false;
  };

  // show go to cart end

  const handleRemoveItemwish = async (categoryid, productid) => {
    try {
      setLoader(true);
      const response = await fetch("https://vhx.vercel.app/remove-from-wish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryid, productid }),
      });

      const data = await response.json();
      if (data.success) {
        setWishItems(data.wishInfo);
      } else {
        Alert.alert(data.error);
      }
      setLoader(false);
    } catch (error) {
      alert("please try again");
    }
  };

  const handleSubmit = async (values) => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://vhx.vercel.app/update-account-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (data.success) {
        Alert.alert(data.message);
        setUserdata(data.accountInfo);
        navigation.goBack();
      } else {
        Alert.alert(data.error);
      }
      setLoader(false);
    } catch (error) {
      alert("please try again");
    }
  };

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            onPress: async () => {
              await AsyncStorage.removeItem("token");

              setToken("");
              setCartItems([]);
              setWishItems([]);
              setOrder([]);
              setUserdata(null);

              navigation.navigate("login");

              Alert.alert(
                "Logged out",
                "You have been logged out successfully"
              );
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  const [userdata, setUserdata] = useState(null);

  const [shipping, setShipping] = useState(null);
  const [order, setOrder] = useState([]);

  return (
    <MyContext.Provider
      value={{
        order,
        setOrder,
        shipping,
        setShipping,
        handleSubmit,
        userdata,
        setUserdata,
        handleRemoveItemwish,
        handleRemoveItem,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleLogout,
        categoryhead,
        setCategoryhead,
        isProductInWish,
        wishItems,
        setWishItems,
        handlewish,
        isProductInCart,
        cartItems,
        setCartItems,
        handlecart,
        setSizei,
        sizei,
        headerr,
        setHeaderr,
        onShare,
        handleProductPress,
        navigation,
        handleCategoryPress,
        input,
        setInput,
        data,
        loader,
        token,
        setLoader,
        setToken,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
