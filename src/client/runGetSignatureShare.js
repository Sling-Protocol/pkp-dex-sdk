import LitJsSdk from "lit-js-sdk/build/index.node.js";
import fs from "fs";

const code = fs.readFileSync("../getSignatureShare.js");

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

  console.log(signatures);

  return signatures;
}
