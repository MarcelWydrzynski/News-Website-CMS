type SelectedCrypto = {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
  };
  description: {
    en: string;
  };
};

export default SelectedCrypto;
