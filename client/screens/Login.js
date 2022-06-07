import React, { useState, useEffect, navigation } from "react";
import {
  StyleSheet,
  View,
  Keyboard /* include other react native components here as needed */,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextField from "../components/TextField";

const API_URL = "http://localhost:3000";

async function CheckLogin(email, password, navigation) {
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
  data.error ? alert(data.message) : navigation.navigate("Home");
  await AsyncStorage.setItem("@storage_token", data.token);
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
