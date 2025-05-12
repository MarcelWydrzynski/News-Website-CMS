import { useState, useEffect } from "react";

const useFetchAllCrypto = () => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllCoins = async () => {
      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.json())
        .then((res) => setAllCoins(res))
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    };

    fetchAllCoins();
  }, []);

  return { allCoins, loading, error };
};

export default useFetchAllCrypto;
