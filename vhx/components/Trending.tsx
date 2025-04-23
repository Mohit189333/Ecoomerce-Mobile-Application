import React from "react";
import Banner from "./Banner";

import { ScrollView } from "react-native";
import Cards from "./Cards";

const Trending = () => {
  return (
    <ScrollView>
      <Banner />
      <Cards />
    </ScrollView>
  );
};

export default Trending;
