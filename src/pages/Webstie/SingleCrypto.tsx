import { useParams } from "react-router-dom";
import ReturnButton from "../../components/Website/ReturnButton";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useFetchSelectedCrypto from "../../hooks/UseFetchSelectedCrypto";
import LoaderCMS from "../../components/Loader";
import Error from "../../components/Error";

const SingleCrypto = () => {
  const { cryptoId } = useParams<{ cryptoId: string }>();

  const { cryptoGrapghData, selectedCrypto, loading, error } = useFetchSelectedCrypto(cryptoId!);

  const formattedData = cryptoGrapghData?.prices?.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    price: Number(price.toFixed(2)),
  }));

  return (
    <>
      <ReturnButton path={"/crypto"} />

      <div className="flex items-center justify-center flex-col select-none font-semibold">
        {loading && <LoaderCMS textDark={true} />}
        {error && <Error errorMessage={"Failed to fetch crypto data. Please try again later. (Possibly too many requests on free API)"} />}

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
                <p>{selectedCrypto.market_cap_rank.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Current Price</p>
                <p>${selectedCrypto.market_data.current_price.usd.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>Market Cap</p>
                <p>${selectedCrypto.market_data.market_cap.usd.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour High</p>
                <p>${selectedCrypto.market_data.high_24h.usd.toLocaleString()}</p>
              </li>
              <li className="flex justify-between w-full border-b pb-3">
                <p>24 Hour Low</p>
                <p>${selectedCrypto.market_data.low_24h.usd.toLocaleString()}</p>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-4">
              <h2 className="text-2xl">{selectedCrypto.id} description</h2>
              <p className="font-normal">{selectedCrypto.description.en}</p>
            </div>
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
