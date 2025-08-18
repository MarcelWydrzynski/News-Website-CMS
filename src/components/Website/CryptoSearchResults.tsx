import { useState } from "react";
import slugify from "../../utils/slugify";
import { Link } from "react-router-dom";
import Coin from "../../types/Coin";

type CryptoSearchResultsProps = {
  allCoins: Coin[];
};

const CryptoSearchResults = ({ allCoins }: CryptoSearchResultsProps) => {
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);

  const filterCoins = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setFilteredCoins([]);
    } else {
      setFilteredCoins(allCoins.filter((coin: Coin) => coin.name.toLowerCase().includes(event.target.value.toLowerCase())));
    }
  };

  return (
    <>
      <h2 className="text-2xl select-none">Search your favorite crypto below</h2>
      <div className="w-full max-w-sm relative">
        <input
          className="w-full bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2 focus:outline-none focus:border-black shadow-sm focus:shadow"
          placeholder="Type here..."
          onChange={(e) => filterCoins(e)}
        />
        <ul className="absolute bg-white top-full left-0 w-full shadow-md z-10 flex flex-col gap-1">
          {filteredCoins.slice(0, 10).map((coin: Coin) => (
            <Link key={coin.id} to={`/crypto/${coin.id}`}>
              <li className="bg-swhite p-2 flex flex-row-reverse justify-between items-center gap-x-4 border-t-1 pb-1 hover:bg-gray-200 hover:cursor-pointer select-none">
                <p>${coin.current_price.toLocaleString()}</p>
                <p>{coin.name}</p>
                <img className="w-8 h-8" src={coin.image} alt={`${coin.name} logo`} />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CryptoSearchResults;
