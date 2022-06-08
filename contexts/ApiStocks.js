import { useEffect, useState } from "react";
const API_KEY = "eb6d9149d9e4183108ab835be6a1bfac";

function SearchApiStocks() {
  const [loading, setLoading] = useState(true);
  const [rowData, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setData(await getDataStocks());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);
  return {
    loading,
    rowData,
    error,
  };
}

async function getDataStocks() {
  const url = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let profile = data.map((profile) => {
    return {
      symbol: profile.symbol,
      name: profile.name,
      industry: profile.sector,
    };
  });

  return profile;
}

export default SearchApiStocks;
