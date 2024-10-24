import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory as Icrc84IDLFactory } from "../../declarations/icrc1_auction/icrc1_auction.did.js";

export interface Icrc84Actor {
  queryPriceHistory(arg0: Principal[], arg1: bigint, arg2: bigint): unknown;
  icrc84_supported_tokens: () => Promise<Principal[]>;
  getQuoteLedger: () => Promise<Principal>;
}

export const getActor = (agent: HttpAgent): Icrc84Actor => {
  const canisterId = "g2mgr-byaaa-aaaai-actsq-cai";

  return Actor.createActor<Icrc84Actor>(Icrc84IDLFactory, {
    agent,
    canisterId,
  });
};
