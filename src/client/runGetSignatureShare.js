import LitJsSdk from "lit-js-sdk/build/index.node.js";
import fs from "fs";

const code = fs.readFileSync("../getSignatureShare.js");

const runGetSignatureShare = async (authSig, message, keyId, sigName) => {
  const litNodeClient = new LitJsSdk.LitNodeClient({ litNetwork: "serrano" });
  await litNodeClient.connect();

  const signatures = await litNodeClient.executeJs({
    code,
    authSig,
    jsParams: {
      keyId,
      sigName,
      toSign: message,
    }
  });

  console.log(signatures);

  return signatures;
}

module.exports = {
  runGetSignatureShare
}