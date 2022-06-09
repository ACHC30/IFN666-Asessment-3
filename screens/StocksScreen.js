import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Keyboard,
} from "react-native";
import { useStocksContext } from "../contexts/StocksContext";
import WatchList from "../components/WatchList";
import SearchApiQuote from "../contexts/ApiQuotes";
import BottomSheet from "../components/BottomSheet";

// FixMe: implement other components and functions used in StocksScreen here (don't just put all the JSX in StocksScreen below)

export default function StocksScreen({ route }) {
  const { watchList, setDataQ } = useStocksContext();
  const refRBSheet = useRef();
  let result = [];
  watchList.map((e) => {
    result.push(e.symbol);
  });
  let symbollist_fetch = result.toString();
  const { loadingQ, errorQ, rowDataQ } = SearchApiQuote(symbollist_fetch);
  const [historyIndex, setHistoryIndex] = useState(0);
  // const [state, setState] = useState({
  //   /* FixMe: initial state here */
  // });

  // can put more code here
  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    setDataQ(rowDataQ);
  }, [rowDataQ]);

  if (loadingQ) {
    return (
      <SafeAreaView onPress={Keyboard}>
        <Text style={styles.titleText}> loading... </Text>
      </SafeAreaView>
    );
  } else if (errorQ) {
    return (
      <SafeAreaView onPress={Keyboard}>
        <Text style={styles.titleText}>
          {" "}
          Something went wrong with the API{" "}
        </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView onPress={Keyboard}>
        <View style={styles.container}>
          <WatchList
            rowData={rowDataQ}
            refRBSheet={refRBSheet}
            setHistorySymbol={setHistoryIndex}
          />
          <BottomSheet refRBSheet={refRBSheet} index={historyIndex} />
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
