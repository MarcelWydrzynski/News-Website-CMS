import { useState, useEffect } from "react";

const useFetchAllCrypto = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllCoins = async () => {
      const options = { method: "GET", headers: { accept: "application/json" } };

      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", options)
        .then((res) => res.json())
        .then((res) => setAllCoins(res))
        .catch((err) => console.error(err));
    };
    fetchAllCoins();
  }, []);

  return { allCoins, loading, error };
};

export default useFetchAllCrypto;
