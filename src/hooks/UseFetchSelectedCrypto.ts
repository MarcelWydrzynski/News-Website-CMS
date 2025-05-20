import { useState, useEffect } from "react";

type MarketChartData = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

const useFetchSelectedCrypto = (cryptoName: string) => {
  const [selectedCrypto, setSelectedCrypto] = useState<MarketChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSelectedCrypto = async () => {
      try {
        const options = { method: "GET", headers: { accept: "application/json" } };
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=USD&days=10`, options);
        const data = await res.json();
        setSelectedCrypto(data);
      } catch (err) {
        setError(true);
        console.log(error)
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectedCrypto();
  }, [cryptoName]);

  return { selectedCrypto, loading, error };
};

export default useFetchSelectedCrypto;
