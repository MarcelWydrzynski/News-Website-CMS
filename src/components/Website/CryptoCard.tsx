import { Link } from "react-router-dom";

type CryptoCardProps = {
  data: {
    id: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
  };
  number: number;
};

const CryptoCard = ({ data, number }: CryptoCardProps) => {

  return (
    <Link to={`/crypto/${data.id}`} state={data}>
      {" "}
      <div className="grid grid-cols-[10px_2fr_1fr_1fr_1fr] max-[700px]:grid-cols-[10px_2fr_1fr_1fr] items-center pt-3 border-t-1 justify-center gap-4 select-none hover:cursor-pointer">
        <p>{number}</p>
        <div className="flex items-center gap-2 justify-center">
          <img className="w-8 h-8" src={data.image} alt={`${data.name} logo`} loading="lazy"/>
          <p className="break-all">{data.name}</p>
        </div>
        <p>${data.current_price.toLocaleString()}</p>
        <p className={`${data.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>{data.price_change_percentage_24h.toFixed(2)}%</p>
        <p className="max-[700px]:hidden">${data.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default CryptoCard;
