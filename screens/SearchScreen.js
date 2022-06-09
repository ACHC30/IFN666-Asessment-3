import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Keyboard, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import SearchApiStocks from "../contexts/ApiStocks";
import StockList from "../components/StockList";
import { useStocksContext } from "../contexts/StocksContext";

function filterStocks(data, symbol) {
  let finalData = [];
  if (symbol === "") {
    return (finalData = data);
  } else {
    finalData = data.filter((profile) => {
      return profile.symbol.toLowerCase().includes(symbol.toLowerCase());
    });
    return finalData;
  }
}

export default function SearchScreen({ navigation }) {
  const { getWatchList } = useStocksContext();
  const { loading, rowData, error } = SearchApiStocks();
  const [symbol, setSymbol] = useState("");
  const stocksList = filterStocks(rowData, symbol);
  useEffect(() => {
    getWatchList();
  }, []);

  if (loading) {
    return (
      <SafeAreaView onPress={Keyboard}>
        <Text style={styles.titleText}> loading... </Text>
      </SafeAreaView>
    );
  } else if (error) {
    return (
      <SafeAreaView onPress={Keyboard}>
        <Text style={styles.titleText}>Something went wrong with the API</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView onPress={Keyboard}>
        <View style={styles.container}>
          <SearchBar
            icon={"search"}
            placeholder={"Search"}
            symbol={symbol}
            setSymbol={setSymbol}
          ></SearchBar>
          <StockList rowData={stocksList} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: "white",
  },
});
