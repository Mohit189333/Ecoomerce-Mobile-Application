import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
} from "react-native";

const DATA = [
  { id: "1", title: "First Item" },
  { id: "2", title: "Second Item" },
  { id: "3", title: "Third Item" },
  { id: "4", title: "First Item" },
  { id: "5", title: "Second Item" },
  { id: "6", title: "Third Item" },
  { id: "7", title: "First Item" },
  { id: "8", title: "Second Item" },
  { id: "9", title: "Third Item" },
];

const Falt = () => {
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default Falt;
