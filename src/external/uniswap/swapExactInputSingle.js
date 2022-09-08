import { Interface } from "@ethersproject/abi";

const iface = new Interface([
  "function exactInputSingle(tuple(address,address,uint24,address,uint256,uint256,uint256,uint160)) external payable returns (uint256)"
]);

export function generateSwapExactInputSingleCalldata(
  exactInputSingleData
  ) {
  return iface.encodeFunctionData("exactInputSingle", [[
    exactInputSingleData.tokenIn,
    exactInputSingleData.tokenOut,
    exactInputSingleData.fee,
    exactInputSingleData.recipient,
    exactInputSingleData.deadline,
    exactInputSingleData.amountIn,
    exactInputSingleData.amountOutMinumum,
    exactInputSingleData.sqrtPriceLimitX96
  ]]);
}
