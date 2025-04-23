import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

const Banner = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/ALL season.jpg")}
        style={styles.background}
      ></ImageBackground>
      <View></View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "white",
    fontSize: 18,
  },
});

export default Banner;
