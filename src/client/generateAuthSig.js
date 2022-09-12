import { Wallet } from "@ethersproject/wallet";
import { computeAddress } from "@ethersproject/transactions";

/// Generates an authSig object for Lit SDK using the private key of the PKP owner
export const generateAuthSig = async (privateKey) => {
  const wallet = new Wallet(privateKey);
  const signedMessage = "[pkp-dex-sdk]: generateAuthSig: " + Date.now().toString();
  const sig = await wallet.signMessage(signedMessage);
  return {
    sig,
    signedMessage,
    derivedVia: "web3.eth.personal.sign",
    address: computeAddress(privateKey)
  }
}