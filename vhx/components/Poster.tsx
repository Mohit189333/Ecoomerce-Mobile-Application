import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

const Poster = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/fitness banner.jpg")}
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

export default Poster;
