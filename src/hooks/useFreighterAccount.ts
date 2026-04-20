"use client";

import { useEffect, useState } from "react";
import { isConnected, getAddress, getNetwork } from "@stellar/freighter-api";
import { Horizon } from "@stellar/stellar-sdk";
import { useQuery } from "@tanstack/react-query";

let address: string;

let addressLookup = (async () => {
  if (await isConnected()) return getAddress();
})();

// returning the same object identity every time avoids unnecessary re-renders
const addressObject = {
  address: "",
  displayName: "",
};

const TESTNET_SERVER = new Horizon.Server(
  "https://horizon-testnet.stellar.org",
);
const PUBLIC_SERVER = new Horizon.Server("https://horizon.stellar.org");

const addressToHistoricObject = (address: string) => {
  addressObject.address = address;
  addressObject.displayName = `${address.slice(0, 4)}...${address.slice(-4)}`;
  return addressObject;
};

const getAccountBalances = async (address: string) => {
  const network = await getNetwork();
  const server =
    network.network.toLowerCase() === "testnet"
      ? TESTNET_SERVER
      : PUBLIC_SERVER;
  const account = await server.loadAccount(address);

  const balances = account.balances.map((balance) => ({
    asset: balance.asset_type === "native" ? "XLM" : balance.asset_code,
    amount: balance.balance,
  }));

  if (typeof balances === "string") {
    return [];
  }

  return balances;
};

/**
 * Returns an object containing `address` and `displayName` properties, with
 * the address fetched from Freighter's `getPublicKey` method in a
 * render-friendly way.
 *
 * Before the address is fetched, returns null.
 *
 * Caches the result so that the Freighter lookup only happens once, no matter
 * how many times this hook is called.
 *
 * NOTE: This does not update the return value if the user changes their
 * Freighter settings; they will need to refresh the page.
 */

export function useFreighterAccount() {
  return useQuery({
    queryKey: ["freighter-account-details"],
    queryFn: async () => {
      const isUserConnected = await isConnected();
      const addressDtls = await addressLookup;
      if (!addressDtls) {
        throw new Error("Account details cannot be found");
      }

      if (addressDtls.error) {
        throw new Error(addressDtls.error);
      }

      const accountBalances = await getAccountBalances(addressDtls.address);
      return {
        accountBalances,
        address: addressDtls.address,
        displayObject: addressToHistoricObject(addressDtls.address),
        isConnected: isUserConnected,
      };
    },
  });
}
