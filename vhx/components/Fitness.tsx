import React from "react";
import Poster from "./Poster";
import { ScrollView } from "react-native";
import Photos from "./Photos";

const Fitness = () => {
  return (
    <ScrollView>
      <Poster />
      <Photos />
    </ScrollView>
  );
};

export default Fitness;
