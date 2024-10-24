import { HttpAgent } from "@dfinity/agent";
import {
  IcrcLedgerCanister,
  IcrcMetadataResponseEntries,
  IcrcTokenMetadataResponse,
} from "@dfinity/ledger-icrc";
import { Principal } from "@dfinity/principal";

import defSymbolLogo from "../assets/default.svg";
import { TokenMetadata } from "../types";

const quoteTokenDefault = "USDT";

const parseMetadata = (
  metadata: IcrcTokenMetadataResponse,
  quoteToken: string | null
): TokenMetadata => {
  let symbol = "unknown";
  let name = "unknown";
  let decimals = 0;
  let logo = "";
  let fee = "";

  metadata.forEach((entry) => {
    switch (entry[0]) {
      case IcrcMetadataResponseEntries.SYMBOL:
        symbol = (entry[1] as { Text: string }).Text;
        break;
      case IcrcMetadataResponseEntries.NAME:
        name = (entry[1] as { Text: string }).Text;
        break;
      case IcrcMetadataResponseEntries.DECIMALS:
        decimals = Number((entry[1] as unknown as { Nat: string }).Nat);
        break;
      case IcrcMetadataResponseEntries.LOGO:
        logo = (entry[1] as { Text: string }).Text;
        break;
      case IcrcMetadataResponseEntries.FEE:
        fee = (entry[1] as unknown as { Nat: string }).Nat.toString();
        break;
    }
  });

  if (symbol.includes("ck") || name.includes("ck")) {
    symbol = symbol.replace("ck", "");
    name = name.replace("ck", "");
  }

  return {
    symbol,
    name,
    decimals,
    logo,
    fee,
    base: symbol,
    quote: quoteToken ? quoteToken : quoteTokenDefault,
  };
};

const findLogo = async (token: TokenMetadata): Promise<string> => {
  let logo =
    token.logo ||
    new URL(
      `../assets/img/coins/${token.symbol.toLowerCase()}.svg`,
      import.meta.url
    ).href;

  if (!token.logo) {
    try {
      const response = await fetch(logo);
      const blob = await response.blob();
      if (blob.size === 0 || !blob.type.startsWith("image")) {
        throw new Error("Image not found or not an image");
      }
    } catch (error) {
      logo = defSymbolLogo;
    }
  }

  return logo;
};

export async function getTokenInfo(
  userAgent: HttpAgent,
  canisterId: Principal,
  quoteToken: string | null
) {
  const { metadata } = IcrcLedgerCanister.create({
    agent: userAgent,
    canisterId: canisterId,
  });

  const principalData = await metadata({ certified: false });
  const token = parseMetadata(principalData, quoteToken);
  const logo = await findLogo(token);

  return { token, logo };
}

export function getToken(tokens: TokenMetadata[], principal: Principal) {
  const standard = {
    symbol: "",
    name: "",
    decimals: 0,
    logo: "",
    fee: "",
    quote: "",
    base: "",
    principal: "",
  };

  if (!tokens || !principal || tokens.length === 0) return standard;

  const token =
    tokens.find((token) => token.principal === principal.toText()) ?? standard;

  return { ...token };
}
