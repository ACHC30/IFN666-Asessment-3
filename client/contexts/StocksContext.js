import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StocksContext = React.createContext();

export function useStocksContext() {
  return useContext(StocksContext);
}

export const StocksProvider = ({ children }) => {
  const [watchList, setState] = useState([]);
  const [quoteData, setDataQ] = useState([]);

  async function getWatchList() {
    const ServerURl = "http://localhost:3000";
    const url = `${ServerURl}/users/getWatchlist`;
    const token = await AsyncStorage.getItem("@storage_token");
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await res.json();
    if (data.error == false) {
      console.log(data.watchList);
      setState(data.watchList);
    } else {
      alert("No Symbol in the watchlist");
    }
  }

  async function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const ServerURl = "http://localhost:3000";
    const url = `${ServerURl}/users/addWatchlist`;
    const token = await AsyncStorage.getItem("@storage_token");
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        symbol: newSymbol,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.error == false) {
      alert(data.message);
    } else {
      alert("Symbol is not added to the watchlist");
    }
  }

  async function deleteToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const ServerURl = "http://localhost:3000";
    const url = `${ServerURl}/users/deleteWatchlist`;
    const token = await AsyncStorage.getItem("@storage_token");
    let res = await fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        symbol: newSymbol,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.error == false) {
      alert(data.message);
    } else {
      alert("Symbol is not deleted from the watchlist");
    }
  }

  useEffect(() => {
    // FixMe: Retrieve watchlist from persistent storage
    getWatchList();
  }, []);

  return (
    <StocksContext.Provider
      value={{
        watchList,
        quoteData,
        setState,
        addToWatchlist,
        deleteToWatchlist,
        setDataQ,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
