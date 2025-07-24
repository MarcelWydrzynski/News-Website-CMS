import { useState, useEffect } from "react";

const useFetchAllCrypto = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllCoins = async () => {
      const options = { method: "GET", headers: { accept: "application/json" } };
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd", options);
        const data = await res.json();
        setAllCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins:", err);
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCoins();
  }, []);

  return { allCoins, loading, error };
};

export default useFetchAllCrypto;
