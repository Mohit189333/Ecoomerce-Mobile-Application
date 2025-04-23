import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import Product from "./Product";
import Register from "./Register";
import LoginScreen from "./Login";
import Notification from "./Notification";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import UserDetails from "./UserDetails";
import Checkout from "./Checkout";
import Payment from "./Payment";
import Loader from "./Loader";
import { MycontextProvider } from "./MyContextProvider";
import Header from "./Header";
import Order from "./OrderDetails";
import Confirmation from "./Confirmation";
import SplashScreen from "./splashscreen/Splashscreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <MycontextProvider>
      <Loader />
      <Stack.Navigator initialRouteName="splash">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="product"
          component={Product}
          options={{
            headerStatusBarHeight: 0,
            header: () => <Header showcate={true} showarrow={true} />,
          }}
        />
        <Stack.Screen
          name="singleproduct"
          component={SingleProduct}
          options={{
            headerStatusBarHeight: 0,
            header: () => <Header showarrow={true} shownotification={true} />,
          }}
        />
        <Stack.Screen
          name="notification"
          component={Notification}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "home" }}
        />
        <Stack.Screen
          name="order"
          component={Order}
          options={{
            headerStatusBarHeight: 0,
            headerBackTitle: "Back",
            headerTitle: "order details",
          }}
        />
        <Stack.Screen
          name="userdetails"
          component={UserDetails}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "Back" }}
        />
        <Stack.Screen
          name="checkout"
          component={Checkout}
          options={{
            headerStatusBarHeight: 0,
            headerBackTitle: "Shopping Cart",
          }}
        />
        <Stack.Screen
          name="confirmation"
          component={Confirmation}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="payment"
          component={Payment}
          options={{
            headerStatusBarHeight: 0,
            headerBackTitle: "Shopping Cart",
          }}
        />
        <Stack.Screen
          name="wishlist"
          component={Wishlist}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "home" }}
        />
        <Stack.Screen
          name="cart"
          component={Cart}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "home" }}
        />
        <Stack.Screen
          name="tab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "register" }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerStatusBarHeight: 0, headerBackTitle: "login" }}
        />
      </Stack.Navigator>
    </MycontextProvider>
  );
};

export default App;
