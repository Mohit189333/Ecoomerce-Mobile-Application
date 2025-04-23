// screens/HomeScreen.js

import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Search from "./Search";
import HorizontalCard from "./HorizontalCard";
import Slider from "./Slider";
import Product from "./Product";

function Home() {
  return (
    <View style={styles.container1}>
      <Search />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Slider />
        <HorizontalCard />

        <Product />
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  container1: {
    backgroundColor: "white",
  },
});
