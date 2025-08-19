import { useState, useEffect } from "react";

const useFetchSelectedCrypto = (cryptoId: string) => {
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [cryptoGrapghData, setCryptoGraphData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [cryptoRes, graphRes] = await Promise.all([
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`),
          fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=USD&days=7`),
        ]);

        if (cryptoRes.status === 429 || graphRes.status === 429) {
          setError("Too many requests on the free API. Please try again later.");
          setLoading(false);
          return;
        }

        if (!cryptoRes.ok || !graphRes.ok) {
          throw new Error("Failed to fetch crypto data");
        }

        const cryptoData = await cryptoRes.json();
        const graphData = await graphRes.json();

        setSelectedCrypto(cryptoData);
        setCryptoGraphData(graphData);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  return { selectedCrypto, cryptoGrapghData, loading, error };
};

export default useFetchSelectedCrypto;
