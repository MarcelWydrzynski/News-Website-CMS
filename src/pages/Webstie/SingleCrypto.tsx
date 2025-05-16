import React from "react";
import { useLocation } from "react-router";

type SingleCryptoProps = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  symbol: string;
  market_cap_rank: number;
};

const SingleCrypto = () => {
  const { state } = useLocation();
  const data = state as SingleCryptoProps;

  console.log(data);

  return (
    <div className="flex items-center justify-center flex-col select-none">
      <img src={data.image} alt={`${data.name} logo`} />
      <h1 className="text-3xl font-semibold mt-5">
        {data.name} ({data.symbol.toUpperCase()})
      </h1>
    
      <ul className="mt-4 w-1/2">
        <li className="flex justify-between w-full">
          <p>Crytpo Market Rank</p>
          <p>{data.market_cap_rank}</p>
        </li>
      </ul>
    </div>
  );
};

export default SingleCrypto;
