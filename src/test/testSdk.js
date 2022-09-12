import { MaxUint256 } from "@ethersproject/constants";
import { BigNumber } from "@ethersproject/bignumber";

import { SDK } from "../sdk.js";
import { addresses } from "../external/constants.js";
import { getAllowance } from "../external/erc20/allowance.js";
import { testProvider, testChainId, PKP_ADDRESS, PKP_PUBLIC_KEY, PKP_OWNER_PRIVATE_KEY } from "./constants.js";

const cEUR_ADDRESS = "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73";
const cUSD_ADDRESS = "0x765DE816845861e75A25fCA122bb6898B8B1282a";
const CELO_NATIVE_ADDRESS = "0x471EcE3750Da237f93B8E339c536989b8978a438";

/// Swaps 0.001 cEUR for cUSD on Celo using uniswap SwapRouter02
const testUniswapExactInputSingle = async (sdk) => {
  console.log("[testSDK]: getting uniswap allowance...");
  const allowance = await getAllowance(
    cEUR_ADDRESS, // cEUR
    PKP_ADDRESS, // owner
    addresses.celo.uniswap.v3.SwapRouter02, // spender
    testProvider
  );
  
  if (allowance.eq(0)) {
    console.log("[testSDK]: approving maximum allowance for swap...");
    const tx = await sdk.executeApprove(
      cEUR_ADDRESS,
      addresses.celo.uniswap.v3.SwapRouter02,
      MaxUint256
    );
    console.log("[testSDK]: waiting for approve tx to be mined...")
    await tx.wait();
  } else {
    console.log("[testSDK]: uniswap already approved...")
  }
  
  const swapDescription = {
    tokenIn: cEUR_ADDRESS,
    tokenOut: cUSD_ADDRESS,
    recipient: PKP_ADDRESS,
    amountIn: BigNumber.from(1).mul(BigNumber.from(10).pow(15)),
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
    fee: 500
  };

  console.log("[testSDK]: executing trade on celo uniswap...");
  const tx = await sdk.executeUniswapV3SwapExactInputSingle(addresses.celo.uniswap.v3.SwapRouter02, swapDescription);
  console.log("[testSDK]: sent swap transaction... ");
}

const runTests = async () => {
  console.log("[testSDK]: initializing SDK instance...");
  const sdk = new SDK(PKP_OWNER_PRIVATE_KEY, PKP_PUBLIC_KEY, testProvider);

  await testUniswapExactInputSingle(sdk);
};

console.log("Running tests...");
runTests();
