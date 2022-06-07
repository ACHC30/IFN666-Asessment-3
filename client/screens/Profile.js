import React, { FC, ReactElement } from "react";
import { Alert, Text, StyleSheet, TouchableOpacity, View } from "react-native";
//import Parse from "parse/react-native";
import { useNavigation } from "@react-navigation/native";
import { StackActions } from "@react-navigation/native";
//import Styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserLogOut = () => {
  const navigation = useNavigation();

  const doUserLogOut = async function () {
    return await AsyncStorage.clear()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        const currentUser = await AsyncStorage.getAllKeys;
        if (currentUser === null) {
          alert("Success!", "No user is logged in anymore!");
          navigation.navigate("Login");
        }
        alert("Success!", "No user is logged in anymore!");
        navigation.navigate("Login");
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack

        return true;
      })
      .catch((error) => {
        Alert.alert("Error!", error.message);
        return false;
      });
  };

  return (
    <View style={Styles.login_wrapper}>
      <View>
        <Text style={Styles.button_label}>{"Logout"}</Text>
      </View>
      <TouchableOpacity onPress={() => doUserLogOut()}>
        <View style={Styles.button}>
          <Text style={Styles.button_label}>{"Logout"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const Styles = StyleSheet.create({
  login_wrapper: {
    backgroundColor: "white",
  },
  button_label: {
    backgroundColor: "white",
    fontSize: 30,
  },
  button: {
    backgroundColor: "white",
    color: "red",
  },
});
