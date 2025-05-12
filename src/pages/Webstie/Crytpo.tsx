import React from "react";
import CryptoList from "../../components/Website/CryptoList";
import Seperator from "../../components/Website/Separator";

const Crytpo = () => {
  return (
    <div className="flex flex-col">
      <h1>Hello, here you will be able to view crypto</h1>
      <CryptoList />
      <div className="mt-20 text-center">
        <p className="select-none opacity-65 text-sm ">
          Data provided by{" "}
          <a className="underline" href="https://www.coingecko.com/" target="_blank">
            CoinGecko
          </a>
        </p>
      </div>
    </div>
  );
};

export default Crytpo;
