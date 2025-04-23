import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";

import { MyContext } from "./MyContextProvider";
import { useNavigation } from "@react-navigation/native";

const AccountDetails = () => {
  const { handleLogout, userdata } = useContext(MyContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Welcome {userdata && userdata.name}</Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("userdetails")}
      >
        <Text style={styles.logoutButtonText}>Update Account Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("checkout")}
      >
        <Text style={styles.logoutButtonText}>Shipping Information</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("order")}
      >
        <Text style={styles.logoutButtonText}>Order Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  container: {
    height: 900,
    backgroundColor: "white",
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "black",
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
