import { useState } from "react";
import Pagination from "../../components/Website/Pagination";
import CryptoCard from "./CryptoCard";
import LoaderCMS from "../Loader";
import Coin from "../../types/Coin";
import Error from "../Error";

type CryptoListProps = {
  allCoins: Coin[];
  loading: boolean;
};

const CryptoList = ({ allCoins, loading }: CryptoListProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const coinsPerPage = 10;
  const totalPages = Math.ceil(allCoins.length / coinsPerPage);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <div className="items-stretch w-full max-w-4xl mx-auto min-w-full">
      <ul className="rounded-2xl flex flex-col gap-y-3">
        <div className="grid grid-cols-[10px_2fr_1fr_1fr_1fr] max-[700px]:grid-cols-[10px_2fr_1fr_1fr] items-center gap-4 py-2 font-bold">
          <p>#</p>
          <p className="text-center">Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="max-[700px]:hidden">Market Cap</p>
        </div>

        {/* Loading */}
        {loading && <LoaderCMS textDark={true} />}

        {/* Render crypto list component*/}
        {!loading && currentCoins.map((coin: Coin, index) => <CryptoCard key={coin.id} data={coin} number={indexOfFirstCoin + index + 1} />)}
      </ul>

      {!loading ? <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} /> : null}
    </div>
  );
};

export default CryptoList;
