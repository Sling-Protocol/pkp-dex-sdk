import {
  hexlify,
  splitSignature,
  hexZeroPad,
  joinSignature,
} from "@ethersproject/bytes";
import { serialize, recoverAddress } from "@ethersproject/transactions";

import { addresses } from "../external/constants";
import { generateApproveCalldata } from "../external/erc20/approve";
import { generateSwapExactInputSingleCalldata } from "../external/uniswap/swapExactInputSingle";
import { runGetSignatureShare } from "../client/runGetSignatureShare";
import { getMessage } from "../client/transactionUtils";
import { authSig } from "./constants";

const approveUniswapSwapRouter = async () => {

  const tx = {
    to: addresses.mainnet.uniswap.v3.SwapRouter02,
    nonce: 0,
    value: 0,
    gasPrice: 0,
    gasLimit: 0,
    chainId: 1,
    data: generateApproveCalldata(addresses.mainnet.uniswap.v3.SwapRouter02, )
  }

  const message = getMessage(tx);

  const signatures = await runGetSignatureShare(authSig, message, "1", "approveUniswapSwapRouterTransaction");

  const encodedSignature = joinSignature({
    r: signatures.approveUniswapSwapRouterTransaction.r,
    s: signatures.approveUniswapSwapRouterTransaction.s,
    v: signatures.approveUniswapSwapRouterTransaction.recid
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
    deadline: Date.now() + (60 * 5) // now + 5 minutes,
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

