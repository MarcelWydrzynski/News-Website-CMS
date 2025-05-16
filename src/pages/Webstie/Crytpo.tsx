import CryptoList from "../../components/Website/CryptoList";

const Crytpo = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-y-4 mb-10">
        <h2 className="text-2xl select-none">Search your favorite crypto below</h2>
        <input
          className="w-fit bg-transparent placeholder:text-black text-black text-sm border border-black rounded-md px-3 py-2  focus:outline-none focus:border-black shadow-sm focus:shadow"
          placeholder="Type here..."
        />
      </div>

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
