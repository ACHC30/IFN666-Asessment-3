import React, { useState, useEffect, navigation } from "react";
import {
  StyleSheet,
  View,
  Keyboard /* include other react native components here as needed */,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextField from "../components/TextField";

const API_URL = "http://172.22.31.202:3002";

async function CheckLogin(email, password, navigation) {
  try {
    const url = `${API_URL}/users/login`;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ email: email, password: password }),
    });

    let data = await res.json();
    console.log(data);
    if (data.error) {
      if (data.message == "cannot connect to database") {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } else {
      navigation.navigate("Home");
    }
    await AsyncStorage.setItem("@storage_token", data.token);
    await AsyncStorage.setItem("@storage_email", JSON.stringify(email));
  } catch (e) {
    console.log(e);
  }
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextField
        secureText={false}
        icon={"mail"}
        placeholder={"Please Type In Your Email"}
        input={email}
        setValue={setEmail}
      />
      <TextField
        secureText={true}
        icon={"key"}
        placeholder={"Please Type In Your Password"}
        input={password}
        setValue={setPassword}
      />
      <Button
        title="Login"
        onPress={() => {
          CheckLogin(email, password, navigation);
        }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
    </View>
  );
}
