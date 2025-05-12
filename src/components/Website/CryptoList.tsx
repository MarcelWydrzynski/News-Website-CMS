import { useState } from "react";
import useFetchAllCrypto from "../../hooks/UseFetchAllCrytpo";
import Pagination from "../../components/Website/Pagination";

type Coin = {
  id: string;
  symbol: string;
  name: string;
  platforms: { [key: string]: string };
};

const CryptoList = () => {
  const { allCoins } = useFetchAllCrypto();
  const [currentPage, setCurrentPage] = useState(1);

  const coinsPerPage = 20;
  const totalPages = Math.ceil(allCoins.length / coinsPerPage);

  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = allCoins.slice(indexOfFirstCoin, indexOfLastCoin);

  return (
    <div className="items-stretch w-full">
      <ul>
        {currentCoins.map((coin: Coin) => (
          <li key={coin.id} className="py-2 px-4 border-b border-gray-200">
            {coin.name} ({coin.symbol})
          </li>
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default CryptoList;
