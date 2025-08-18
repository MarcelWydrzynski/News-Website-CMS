import { useState, useEffect } from "react";

type MarketChartData = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

const useFetchSelectedCrypto = (cryptoName: string | null) => {
  const [cryptoGrapghData, setCryptoGrapghData] = useState<MarketChartData | null>(null);
  const [selectedCrypto, setselectedCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchSelectedCrypto = async () => {
      setError(false);

      try {
        const [marketRes, coinRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart?vs_currency=USD&days=10`),
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`),
        ]);

        const marketData = await marketRes.json();
        const coinData = await coinRes.json();

        setCryptoGrapghData(marketData);
        setselectedCrypto(coinData);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (cryptoName) {
      fetchSelectedCrypto();
    }
  }, [cryptoName]);

  return { cryptoGrapghData, selectedCrypto, loading, error };
};

export default useFetchSelectedCrypto;
