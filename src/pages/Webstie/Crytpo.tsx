import useFetchAllCrypto from "../../hooks/UseFetchAllCrytpo";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { Suspense, lazy } from "react";

const CryptoList = lazy(() => import("../../components/Website/CryptoList"));
const CryptoSearchResults = lazy(() => import("../../components/Website/../../components/Website/CryptoSearchResults"));

const Crytpo = () => {
  const { allCoins, loading, error } = useFetchAllCrypto();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        {/* Error */}
        {error && <Error errorMessage="Failed to fetch crypto data. Please try again later. (Possibly too many requests on free API)" />}

        {/* Loading */}
        {loading && <Loader textDark={true} />}

        {/* Render all the components */}
        {!error && !loading && (
          <>
            <CryptoSearchResults allCoins={allCoins} />
            <Suspense fallback={<Loader textDark={true} />}>
              <CryptoList allCoins={allCoins} />
            </Suspense>

            <div className="mt-20 text-center mb-0">
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
