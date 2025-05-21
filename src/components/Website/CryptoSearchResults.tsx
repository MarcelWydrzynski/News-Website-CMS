import slugify from "../../hooks/slugify";
import { Link } from "react-router-dom";

type Coin = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

type CryptoListProps = {
  loading: boolean;
  error: boolean;
  filteredCoins: Coin[];
};

const CryptoSearchResults = ({ filteredCoins, loading, error }: CryptoListProps) => {
  return (
    <ul className="absolute bg-white top-full left-0 w-full shadow-md z-10 flex flex-col gap-1">
      {filteredCoins.length === 0
        ? null
        : filteredCoins.slice(0, 10).map((coin: Coin) => (
            <Link to={`/crypto/${slugify(coin.name)}`} state={coin}>
              <li className="bg-swhite p-2 flex flex-row-reverse justify-between items-center gap-x-4 border-t-1 pb-1 hover:bg-gray-200 hover:cursor-pointer select-none">
                <p>${coin.current_price.toLocaleString()}</p>
                <p>{coin.name}</p>
                <img className="w-8 h-8" src={coin.image} alt={`${coin.name} logo`} />
              </li>
            </Link>
          ))}
    </ul>
  );
};

export default CryptoSearchResults;
