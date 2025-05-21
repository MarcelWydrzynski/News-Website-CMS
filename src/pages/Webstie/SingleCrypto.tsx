import { useLocation } from "react-router-dom";
import ReturnButton from "../../components/Website/ReturnButton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useFetchSelectedCrypto from "../../hooks/UseFetchSelectedCrypto";
import LoaderCMS from "../../components/CMS/LoaderCMS";

type SingleCryptoProps = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  symbol: string;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
};

const SingleCrypto = () => {
  const { state } = useLocation();
  const data = state as SingleCryptoProps | null;

  // Guard clause for invalid navigation (e.g., page refresh without state)
  if (!data?.id) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg font-semibold text-red-500">Invalid access. No crypto data found.</p>
        <ReturnButton path="/crypto" />
      </div>
    );
  }

  const { selectedCrypto, loading, error } = useFetchSelectedCrypto(data.id);

  const formattedData = selectedCrypto?.prices?.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: Number(price.toFixed(2)),
  }));

  return (
    <>
      <ReturnButton path="/crypto" />

      <div className="flex items-center justify-center flex-col select-none font-semibold">
        {loading && <LoaderCMS textDark={true} />}
        {error && <p className="text-black mt-10">Failed to fetch crypto data. Please try again later.</p>}
        {!loading && !error && (
          <>
            <img src={data.image} alt={`${data.name} logo`} className="max-[500px]:w-1/4"/>
            <h1 className="text-3xl font-bold font-mono mt-5">
              {data.name} ({data.symbol.toUpperCase()})
            </h1>

            <div className="w-full max-w-4xl h-96 my-15">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis domain={["auto", "auto"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={2500}
                    animationEasing="ease-in"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <ul className="w-full max-w-4xl flex flex-col gap-3">
              <li className="flex justify-between w-full border-b pb-3">
                <p>Crypto Market Rank</p>
                <p>{data.market_cap_rank}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Current Price</p>
                <p>${data.current_price.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Market Cap</p>
                <p>${data.market_cap.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour High</p>
                <p>${data.high_24h.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour Low</p>
                <p>${data.low_24h.toLocaleString()}</p>
              </li>
            </ul>
          </>
        )}
      </div>

      <div className="mt-20 text-center">
        <p className="select-none opacity-65 text-sm">
          Data provided by{" "}
          <a className="underline" href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer">
            CoinGecko
          </a>
        </p>
      </div>
    </>
  );
};

export default SingleCrypto;
