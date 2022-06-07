import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  TextInput,
  Button,
} from "react-native";
import TextField from "../components/TextField";

const API_URL = "http://localhost:3000";

async function CheckRegister(email, username, password, navigation) {
  const url = `${API_URL}/users/register`;
  let res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });

  let data = await res.json();
  console.log(data);
  data.error ? alert(data.message) : navigation.navigate("Login");
}

export default function Register({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <TextField
        secureText={false}
        icon={"user"}
        placeholder={"Please Type In Your Username"}
        input={username}
        setValue={setUsername}
      />
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
        title="Register"
        onPress={() => {
          CheckRegister(email, username, password, navigation);
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}
