import { Interface } from "@ethersproject/abi";

const iface = new Interface([
  "function exactInputSingle(tuple(address,address,uint24,address,uint256,uint256,uint160)) external payable returns (uint256)"
]);

export function generateSwapExactInputSingleCalldata(
  exactInputSingleData
  ) {
  return iface.encodeFunctionData("exactInputSingle", [[
    exactInputSingleData.tokenIn,
    exactInputSingleData.tokenOut,
    exactInputSingleData.fee,
    exactInputSingleData.recipient,
    exactInputSingleData.amountIn,
    exactInputSingleData.amountOutMinimum,
    exactInputSingleData.sqrtPriceLimitX96
  ]]);
}
