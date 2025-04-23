import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";

const Cards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              This Product is not available right now{" "}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.cat}>Upcoming Products</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={styles.boxi}
            source={require("./../assets/puma t shirts.jpeg")}
          />
          <Text style={styles.texti}>T-shirt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={styles.boxi}
            source={require("./../assets/Trousers.jpeg")}
          />
          <Text style={styles.texti}>Trousers</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={styles.boxi}
            source={require("./../assets/Grip Gloves.jpeg")}
          />
          <Text style={styles.texti}>Gloves</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.box}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={styles.boxi}
            source={require("./../assets/shoes.jpeg")}
          />
          <Text style={styles.texti}>shoes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cat: {
    fontSize: 24,
    marginBottom: 10,
  },
  texti: {
    zIndex: 9999,
    position: "absolute",
    top: "50%",
    color: "white",
    fontSize: 23,
  },
  container: {
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "white",
    width: "48%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxi: {
    backgroundColor: "white",
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    width: 100,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Cards;
