import * as React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { StocksProvider } from "./contexts/StocksContext";
import "react-native-gesture-handler";
import WatchList from "./components/WatchList";
import OpenBottomSheet from "./components/BottomSheet";
import BottomSheetContext from "./components/BottomSheetContext";
import SearchApiQuote from "./contexts/ApiQuotes";
import SearchApiHistory from "./contexts/ApiHistory";
import MyChart from "./components/MyChart";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StocksProvider>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Home" component={BottomTabNavigator} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="WatchList" component={WatchList} />
            <Stack.Screen name="OpenBottomSheet" component={OpenBottomSheet} />
            <Stack.Screen name="MyChart" component={MyChart} />
            <Stack.Screen name="SearchApiQuote" component={SearchApiQuote} />
            <Stack.Screen
              name="SearchApiHistory"
              component={SearchApiHistory}
            />
            <Stack.Screen
              name="BottomSheetContext"
              component={BottomSheetContext}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StocksProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
