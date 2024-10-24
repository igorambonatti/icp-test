export interface TokenMetadata {
  symbol: string;
  base: string;
  name: string;
  logo: string;
  quote: string;
  decimals: number;
  fee: string;
  principal?: string;
}

export interface Option {
  id: string;
  value: string;
  label: string;
  image: string;
  base: string;
  quote: string;
  decimals: number;
  principal?: string;
}

export interface DataItem {
  id: bigint;
  datetime: string;
  date: string;
  time: string;
  price: number;
  volume: number;
  volumeInQuote: number;
  volumeInBase: number;
  quoteDecimals: number;
  priceDigitsLimit: number;
}

export interface Statistics {
  clearingPrice: number;
  clearingVolume: number;
  totalAskVolume: number;
  totalBidVolume: number;
}

export interface NextSession {
  nextSession: string;
  datetime: number;
  counter: string;
}
export interface TokenDataItem extends DataItem, TokenMetadata {
  [key: string]: any;
}
