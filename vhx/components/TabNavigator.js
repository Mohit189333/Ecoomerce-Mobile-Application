import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "./Home";
import Fitness from "./Fitness";
import { Ionicons } from "@expo/vector-icons";
import Account from "./Account";
import { FontAwesome6 } from "@expo/vector-icons";
import Header from "./Header";
import Trending from "./Trending";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarHideOnKeyboard: "false",
        headerStatusBarHeight: 0,
        tabBarInactiveTintColor: "black",
        tabBarActiveTintColor: "black",
        tabBarItemStyle: { marginVertical: 10 },
        tabBarStyle: { backgroundColor: "white", height: 63 },
        tabBarIconStyle: { marginBottom: 0 },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          header: () => <Header />,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Trending"
        component={Trending}
        options={{
          tabBarLabel: "Trending",
          header: () => <Header />,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome6 name="arrow-trend-up" size={24} color="black" />
            ) : (
              <MaterialIcons name="trending-up" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Fitness"
        component={Fitness}
        options={{
          header: () => <Header />,
          tabBarLabel: "Fitness",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="fitness" size={24} color="black" />
            ) : (
              <Ionicons name="fitness-outline" size={24} color="black" />
            ),

          tabBarBadgeStyle: { color: "black" },
        }}
      />

      <Tab.Screen
        name="account"
        component={Account}
        options={{
          header: () => <Header />,
          tabBarLabel: "account",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="user" size={24} color="black" />
            ) : (
              <Feather name="user" size={24} color="black" />
            ),

          tabBarBadgeStyle: { color: "black" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
