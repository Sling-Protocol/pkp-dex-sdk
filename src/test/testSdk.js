import {
  hexlify,
  splitSignature,
  hexZeroPad,
  joinSignature,
} from "@ethersproject/bytes";
import { serialize, recoverAddress } from "@ethersproject/transactions";
import { MaxUint256 } from "@ethersproject/constants";

import { addresses } from "../external/constants";
import { generateApproveCalldata } from "../external/erc20/approve";
import { generateSwapExactInputSingleCalldata } from "../external/uniswap/swapExactInputSingle";
import { generateSwapData } from "../external/oneinch/swap";
import { runGetSignatureShare } from "../client/runGetSignatureShare";
import { getMessage } from "../client/transactionUtils";
import { authSig } from "./constants";


const approveSpender = async (spender) => {

  const tx = {
    to: addresses.mainnet.uniswap.v3.SwapRouter02,
    nonce: 0,
    value: 0,
    gasPrice: 0,
    gasLimit: 0,
    chainId: 1,
    data: generateApproveCalldata(spender, MaxUint256)
  }

  const message = getMessage(tx);

  const signatures = await runGetSignatureShare(authSig, message, "1", "approveTransaction");

  const encodedSignature = joinSignature({
    r: signatures.approveTransaction.r,
    s: signatures.approveTransaction.s,
    v: signatures.approveTransaction.recid
  });

  return serialize(tx, encodedSignature);
}

const executeUniswapSwapExactInputSingle = async () => {

  const recipient = "";

  const exactInputSingleData = {
    tokenIn: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    tokenOut: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
    fee: 3000, // 0.3%
    recipient: recipient,
    deadline: Date.now() + (60 * 5),
    amountIn: 0,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0
  };

  const tx = {
    to: addresses.mainnet.uniswap.v3.SwapRouter02,
    nonce: 0,
    value: 0,
    gasPrice: 0,
    gasLimit: 0,
    chainId: 1,
    data: generateSwapExactInputSingleCalldata(exactInputSingleData)
  };

  const message = getMessage(tx);

  const signatures = await runGetSignatureShare(authSig, message, "1", "exactInputSingleTransaction");

  const encodedSignature = joinSignature({
    r: signatures.exactInputSingleTransaction.r,
    s: signatures.exactInputSingleTransaction.s,
    v: signatures.exactInputSingleTransaction.recid
  });

  return serialize(tx, encodedSignature);
}

const executeOneInchSwap = async () => {

  const recipient = "";

  const swapDescription = {
    srcToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    dstToken: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
    srcReceiver: "", 
    dstReceiver: "",
    amount: 0,
    minReturnAmount: 0,
    flags: 0,
    permit: ""
  };

  const tx = {
    to: addresses.mainnet.oneinch.v4.AggregationRouter,
    nonce: 0,
    value: 0,
    gasPrice: 0,
    gasLimit: 0,
    chainId: 1,
    data: generateSwapData(swapDescription)
  };

  const message = getMessage(tx);

  const signatures = await runGetSignatureShare(authSig, message, "1", "swapTransaction");

  const encodedSignature = joinSignature({
    r: signatures.exactInputSingleTransaction.r,
    s: signatures.exactInputSingleTransaction.s,
    v: signatures.exactInputSingleTransaction.recid
  });

  return serialize(tx, encodedSignature);
}

console.log("Running tests...");