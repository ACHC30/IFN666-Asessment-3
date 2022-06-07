import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard /* include other react native components here as needed */,
  Button,
} from "react-native";
import { ListItem } from "react-native-elements";
import { useStocksContext } from "../contexts/StocksContext";

function CheckButton(watchList, symbolSearched) {
  let check = false;
  watchList.map((e) => {
    if (e.symbol === symbolSearched) {
      check = true;
    }
  });
  return check;
}

export default function StockList(props) {
  let data = props.rowData;
  const { watchList, addToWatchlist, deleteToWatchlist } = useStocksContext();
  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((e, i) => (
          <View key={i} style={styles.container}>
            <ListItem containerStyle={styles.listitem}>
              <ListItem.Content>
                <ListItem.Title style={styles.symbol}>
                  {e.symbol}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} style={styles.name}>
                  {e.name}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Button
                title={CheckButton(watchList, e.symbol) ? "Delete" : "Add"}
                style={styles.button}
                color={CheckButton(watchList, e.symbol) ? "red" : "green"}
                onPress={
                  CheckButton(watchList, e.symbol)
                    ? () => {
                        deleteToWatchlist(e.symbol);
                      }
                    : () => addToWatchlist(e.symbol)
                }
              />
            </ListItem>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", color: "white", borderRadius: 10 },
  listitem: {
    backgroundColor: "black",
    borderRadius: 10,
    borderBottomColor: "white",
  },
  symbol: {
    // backgroundColor: "white",
    color: "white",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  name: {
    // backgroundColor: "white",
    color: "#808080",
    padding: 5,
    borderRadius: 10,
    borderBottomColor: "white",
    margin: 2,
  },
  br: {
    height: 1,
    backgroundColor: "#808080",
  },
});
