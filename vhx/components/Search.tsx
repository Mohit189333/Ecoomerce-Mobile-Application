import React, { useContext } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MyContext } from "./MyContextProvider";
import SearchData from "./SearchData";

const Search = () => {
  const { input, setInput } = useContext(MyContext);

  return (
    <>
      <View style={styles.container}>
        <Fontisto
          name="search"
          size={15}
          color="rgba(0,0,0,0.4)"
          style={styles.icon}
        />
        <TextInput
          placeholder="search here..."
          style={styles.input}
          placeholderTextColor="rgba(0,0,0,0.4)"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
      </View>
      <SearchData />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.17,
    borderBottomColor: "rgba(0,0,0,0.4)",
    borderTopColor: "rgba(0,0,0,0.6)",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 30,
    color: "black",
  },
});

export default Search;
