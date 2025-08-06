import { useState } from "react";
import CryptoList from "../../components/Website/CryptoList";
import CryptoSearchResults from "../../components/Website/CryptoSearchResults";
import useFetchAllCrypto from "../../hooks/UseFetchAllCrytpo";
import Error from "../../components/Error";
import Coin from "../../types/Coin";
import Loader from "../../components/Loader";

const Crytpo = () => {
  const { allCoins, loading, error } = useFetchAllCrypto();
  const [filteredCoins, setFilteredCoins] = useState([]);

  const filterCoins = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setFilteredCoins([]);
    } else {
      setFilteredCoins(allCoins.filter((coin: Coin) => coin.name.toLowerCase().includes(event.target.value.toLowerCase())));
      console.log(filteredCoins);
    }
  };
  console.log(error);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        {/* Error */}
        {error && <Error errorMessage="Failed to fetch crypto data, please try again later" />}

        {/* Loading */}
        {loading && <Loader textDark={true} />}

        {/* Render all the components */}
        {!error && !loading && (
          <>
            <h2 className="text-2xl select-none">Search your favorite crypto below</h2>
            <div className="w-full max-w-sm relative">
              <input
                className="w-full bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2 focus:outline-none focus:border-black shadow-sm focus:shadow"
                placeholder="Type here..."
                onChange={(e) => filterCoins(e)}
              />
              <CryptoSearchResults filteredCoins={filteredCoins} />{" "}
            </div>

            <CryptoList allCoins={allCoins} loading={loading} />
            <div className="mt-20 text-center">
              <p className="select-none opacity-65 text-sm ">
                Data provided by{" "}
                <a className="underline" href="https://www.coingecko.com/" target="_blank">
                  CoinGecko
                </a>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Crytpo;
