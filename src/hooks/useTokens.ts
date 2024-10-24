import { HttpAgent } from "@dfinity/agent";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setSelectedQuote,
  setSelectedSymbol,
  setTokens,
} from "../store/tokensSlice";
import { TokenMetadata } from "../types";
import { convertVolumeFromCanister } from "../utils/calculationsUtils";
import { getActor } from "../utils/canisterUtils";
import { getTokenInfo } from "../utils/tokenUtils";

const useTokens = () => {
  const dispatch = useDispatch();

  const getQuoteToken = useCallback(
    async (agent: HttpAgent): Promise<TokenMetadata | null> => {
      try {
        const serviceActor = getActor(agent);
        const quotePrincipal = await serviceActor.getQuoteLedger();
        const { token } = await getTokenInfo(agent, quotePrincipal, null);
        return token;
      } catch (error) {
        console.error("Error fetching quote token:", error);
        return null;
      }
    },
    []
  );

  const getTokens = useCallback(
    async (agent: HttpAgent) => {
      try {
        dispatch(setLoading(true));

        const serviceActor = getActor(agent);

        const [quoteToken, principals] = await Promise.all([
          getQuoteToken(agent),
          serviceActor.icrc84_supported_tokens(),
        ]);

        const tokens: TokenMetadata[] = await Promise.all(
          (principals ?? []).map(async (principal) => {
            const { token, logo } = await getTokenInfo(
              agent,
              principal,
              `${quoteToken?.base}`
            );

            const { volumeInBase } = convertVolumeFromCanister(
              Number(token.fee),
              token.decimals,
              0
            );

            return {
              ...token,
              fee: String(volumeInBase),
              logo,
              principal: principal.toText(),
            };
          })
        );

        tokens.sort((a, b) => a.symbol.localeCompare(b.symbol));
        const initialSymbol = tokens[0];

        const initialOption: TokenMetadata = {
          symbol: initialSymbol.symbol,
          name: initialSymbol.name,
          fee: initialSymbol.fee,
          logo: initialSymbol.logo,
          base: initialSymbol.base,
          quote: initialSymbol.quote,
          decimals: initialSymbol.decimals,
          principal: initialSymbol.principal,
        };
        dispatch(setTokens(tokens));
        dispatch(setSelectedQuote(quoteToken));
        dispatch(setSelectedSymbol(initialOption));

        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching tokens:", error);
        dispatch(setError("Failed to fetch tokens."));
        dispatch(setLoading(false));
      }
    },
    [dispatch, getQuoteToken]
  );

  return { getTokens };
};

export default useTokens;
