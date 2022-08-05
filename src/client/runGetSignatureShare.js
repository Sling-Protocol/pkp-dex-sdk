import LitJsSdk from "lit-js-sdk/build/index.node.js";
import fs from "fs";

const code = await fs.readFile("../getSignatureShare.js");

const runGetSignatureShare = async (authSig, transactionDigest, keyId, sigName) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();

  const signatures = await litNodeClient.executeJs({
    code,
    authSig,
    jsParams: {
      keyId,
      sigName,
      toSign: transactionDigest,
    }
  });

  console.log(signatures);

  return signatures;
}

module.exports = {
  runGetSignatureShare
}