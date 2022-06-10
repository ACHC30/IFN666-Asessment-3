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
        console.log(data.watchList);
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
      alert("error in fecthing");
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

    let data = await res.json();
    console.log(data);
    if (data.error == false) {
      //set the async storage
      setWatchList((x) => {
        x.push({ symbol: newSymbol });
        return [...new Set(x)];
      });
      await AsyncStorage.setItem(
        "@storage_watchlist",
        JSON.stringify(watchList)
      );
      getWatchList();
    } else {
      if (data.message == "cannot connect to database") {
        alert("cannot connect to database symbol is stored in async storage.");
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

    let data = await res.json();
    console.log(data);
    if (data.error == false) {
      getWatchList();
    } else {
      if (data.message == "cannot connect to database") {
        //get the async storage
        const value = await AsyncStorage.getItem("@storage_watchlist");
        if (value !== null) {
          setWatchList(JSON.parse(value));
        }
        //delete from async storage
        watchList = watchList.filter((item) => item.symbol !== newSymbol);
        //set the async storage
        await AsyncStorage.setItem(
          "@storage_watchlist",
          JSON.stringify(watchList)
        );
      } else {
        alert("Symbol is not deleted from the watchlist");
      }
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
