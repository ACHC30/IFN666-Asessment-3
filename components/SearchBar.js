import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  TextInput,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SearchBar(props) {
  return (
    <View style={styles.container}>
      <Feather
        name={props.icon}
        size={20}
        color="white"
        style={{ marginLeft: 1 }}
      />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.symbol}
        onChangeText={props.setSymbol}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#282828",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#282828",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    color: "white",
  },
});
