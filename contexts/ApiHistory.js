import { useEffect, useState } from "react";

const API_KEY = "eb6d9149d9e4183108ab835be6a1bfac";

function SearchApiHistory(symbol) {
  const [loading, setLoading] = useState(true);
  const [rowData, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setData(await getDataHistory(symbol));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [symbol]);
  return {
    loading,
    rowData,

    error,
  };
}

async function getDataHistory(symbol) {
  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let dataObj = Object.entries(data)[1][1];
  let history = Object.entries(dataObj);
  return history.map((history) => {
    return {
      date: history[0],
      open: history[1]["1. open"],
      low: history[1]["2. high"],
      high: history[1]["3. low"],
      close: history[1]["4. close"],
      volume: history[1]["5. volume"],
    };
  });
}

export default SearchApiHistory;
