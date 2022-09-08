import { serialize } from "@ethersproject/transactions";
import { arrayify } from "@ethersproject/bytes";
import { keccak256 } from "js-sha3";

export const getMessage = (transaction) => {
	return keccak256.digest(arrayify(serialize(transaction)));
}

export const sendSignedTransaction = async (provider, signedTransaction) => {
  return await provider.sendTransaction(signedTransaction);
};
