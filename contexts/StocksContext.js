import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const StocksContext = React.createContext();

export function useStocksContext() {
  return useContext(StocksContext);
}

export const StocksProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);
  const [quoteData, setDataQ] = useState([]);

  async function getWatchList() {
    try {
      const ServerURl = "http://172.22.31.202:3002";
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
        console.log("data inside mysql watchlist", data.watchList);
        setWatchList(data.watchList);
      } else {
        if (data.message == "cannot connect to database") {
          //get the async storage
          const value = await AsyncStorage.getItem("@storage_watchlist");
          if (value !== null) {
            setWatchList(JSON.parse(value));
          }
        } else {
          alert("No Symbol in the watchlist");
        }
      }
    } catch {
      alert("error in fecthing watchlist");
    }
  }

  async function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const ServerURl = "http://172.22.31.202:3002";
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

    //set the async storage
    setWatchList((x) => {
      x.push({ symbol: newSymbol });
      return [...new Set(x)];
    });
    console.log("watchlist to be stored in async storage (add)", watchList);
    await AsyncStorage.setItem("@storage_watchlist", JSON.stringify(watchList));

    let data = await res.json();
    if (data.error == false) {
      // get from watchlist
      getWatchList();
    } else {
      if (data.message == "cannot connect to database") {
        alert("cannot connect to database async storage is used.");
      } else {
        alert("Symbol is not added to the watchlist");
      }
    }
  }

  async function deleteToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    const ServerURl = "http://172.22.31.202:3002";
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

    //get the async storage
    const value = await AsyncStorage.getItem("@storage_watchlist");
    if (value !== null) {
      setWatchList(JSON.parse(value));
    }
    console.log("watchlist extracted from the async storage", watchList);
    //delete from async storage
    let watchListTemp = watchList.filter((item) => item.symbol !== newSymbol);
    console.log(
      "watchlist to be stored in async storage(delete)",
      watchListTemp
    );
    //set the async storage
    await AsyncStorage.setItem(
      "@storage_watchlist",
      JSON.stringify(watchListTemp)
    );

    let data = await res.json();
    if (data.error == false) {
      //get from mysql
      getWatchList();
    } else {
      if (data.message == "cannot connect to database") {
        alert("cannot connect to database async storage is used.");
      } else {
        alert("Symbol is not deleted from the watchlist");
      }
    }
  }

  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <StocksContext.Provider
      value={{
        watchList,
        quoteData,
        setWatchList,
        addToWatchlist,
        deleteToWatchlist,
        setDataQ,
        getWatchList,
      }}
    >
      {children}
    </StocksContext.Provider>
  );
};
