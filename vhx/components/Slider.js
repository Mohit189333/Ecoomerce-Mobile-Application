import React from "react";
import { StyleSheet, View } from "react-native";
import { ImageSlider } from "react-native-image-slider-banner";

const Slider = () => {
  const images = [
    { img: require("../assets/slider1.png") },
    { img: require("../assets/slider2.png") },
    { img: require("../assets/slider3.png") },
  ];

  return (
    <View style={styles.sliderContainer}>
      <ImageSlider
        data={images}
        localImg
        autoPlay={true}
        timer={3000}
        caroselImageStyle={styles.imageStyle}
        preview={false}
        indicatorContainerStyle={styles.indicatorContainerStyle}
        indicatorActiveColor="#ff6347"
        indicatorInActiveColor="#dcdcdc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  imageStyle: {
    resizeMode: "cover",
    height: 230,
  },

  indicatorContainerStyle: {
    position: "absolute",
    bottom: 10,
  },
});

export default Slider;
