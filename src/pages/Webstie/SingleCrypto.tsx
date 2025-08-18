import { useParams } from "react-router-dom";
import ReturnButton from "../../components/Website/ReturnToHomeButton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useFetchSelectedCrypto from "../../hooks/UseFetchSelectedCrypto";
import LoaderCMS from "../../components/Loader";

const SingleCrypto = () => {
  const { cryptoname } = useParams<{ cryptoname: string }>(); // <-- must match :slug

  const { cryptoGrapghData, selectedCrypto, loading, error } = useFetchSelectedCrypto(cryptoname);

  const formattedData = cryptoGrapghData?.prices?.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    price: Number(price.toFixed(2)),
  }));

  console.log(cryptoGrapghData, selectedCrypto);

  return (
    <>
      <ReturnButton />

      <div className="flex items-center justify-center flex-col select-none font-semibold">
        {loading && <LoaderCMS textDark={true} />}
        {error && <p className="text-black mt-10">Failed to fetch crypto data. Please try again later.</p>}
        {!loading && !error && cryptoGrapghData && selectedCrypto && (
          <>
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
                    isAnimationActive
                    animationDuration={2500}
                    animationEasing="ease-in"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <ul className="w-full max-w-4xl flex flex-col gap-3">
              <li className="flex justify-between w-full border-b pb-3">
                <p>Crypto Market Rank</p>
                <p>{selectedCrypto.market_data.current_price.usd}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Current Price</p>
                <p>${selectedCrypto.market_data.current_price.usd}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Market Cap</p>
                <p>${selectedCrypto.market_data.current_price.usd}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour High</p>
                <p>${selectedCrypto.market_data.current_price.usd}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour Low</p>
                <p>${selectedCrypto.market_data.current_price.usd}</p>
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
