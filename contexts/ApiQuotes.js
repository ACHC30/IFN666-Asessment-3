import { useEffect, useState } from "react";
const API_KEY = "9bdf814120dd203b072c0828821bd0e2";

function SearchApiQuote(symbol) {
  const [loadingQ, setLoading] = useState(true);
  const [rowDataQ, setData] = useState([]);
  const [errorQ, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setData(await getDataQuote(symbol));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, [symbol]);
  return {
    loadingQ,
    rowDataQ,
    errorQ,
  };
}

async function getDataQuote(symbol) {
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=${API_KEY}`;
  let res = await fetch(url);
  let data = await res.json();
  let quote = data.map((quote) => {
    return {
      symbol: quote.symbol,
      name: quote.name,
      price: quote.price,
      open: quote.open,
      percentage: quote.changesPercentage,
      dayHigh: quote.dayHigh,
      dayLow: quote.dayLow,
      yearHigh: quote.yearHigh,
      yearLow: quote.yearLow,
    };
  });
  console.log(quote);
  return quote;
}

export default SearchApiQuote;
