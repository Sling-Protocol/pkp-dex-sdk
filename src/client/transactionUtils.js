import { serialize } from "@ethersproject/transactions";
import { arrayify } from "@ethersproject/bytes";
import { keccak256 } from "js-sha3";

const getMessage = (transaction) => {
	return keccak256.digest(arrayify(serialize(transaction)));
}

const sendSignedTransaction = (provider, signedTransaction) => {
	return await provider.sendTransaction(signedTransaction);
};

module.exports = {
	getMessage,
	sendSignedTransaction
}