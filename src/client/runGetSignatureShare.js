import LitJsSdk from "lit-js-sdk/build/index.node.js";
import fs from "fs";
import path from "path";

/// Reads in the code to run on the Lit nodes
const code = fs.readFileSync(new URL("../actions/getSignatureShare.js", import.meta.url));

/// Connects to the Lit network and acquires the PKP signature shares.
export const runGetSignatureShare = async (authSig, message, publicKey, sigName) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();

  const signatures = await litNodeClient.executeJs({
    code,
    authSig,
    jsParams: {
      publicKey,
      sigName,
      toSign: message,
    }
  });

  return signatures;
}
