import { useState } from "react";
import useFetchAllCrypto from "../../hooks/UseFetchAllCrytpo";
import Pagination from "../../components/Website/Pagination";
import CryptoCard from "./CryptoCard";

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

const CryptoList = () => {
  const { allCoins } = useFetchAllCrypto();
  const [currentPage, setCurrentPage] = useState(1);

  const coinsPerPage = 10;
  const totalPages = Math.ceil(allCoins.length / coinsPerPage);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  console.log(allCoins);

  return (
    <div className="items-stretch w-fit mx-auto">
      <ul className="rounded-2xl flex flex-col gap-y-3">
        <div className="grid grid-cols-[10px_2fr_1fr_1fr_1fr] max-[700px]:grid-cols-[10px_2fr_1fr_1fr] items-center gap-4 py-2 font-bold">
          <p>#</p>
          <p className="text-center">Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="max-[700px]:hidden">Market Cap</p>
        </div>
        {currentCoins.map((coin: Coin, index) => (
          <CryptoCard key={index} data={coin} number={index} />
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default CryptoList;
