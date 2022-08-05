import { Interface } from "@ethersproject/utils";

const iface = new Interface([
  "function exactInputSingle(tuple(address,address,uint24,address,uint256,uint256,uint256,uint160)) external payable returns (uint256)"
]);

const generateExactInputSingleCalldata(
  tokenIn,
  tokenOut,
  fee,
  recipient,
  deadline,
  amountIn,
  amountOutMinumum,
  sqrtPriceLimitX96
  ) {
  return iface.encodeFunctionData("exactInputSingle", [[
    tokenIn,
    tokenOut,
    fee,
    recipient,
    deadline,
    amountIn,
    amountOutMinumum,
    sqrtPriceLimitX96
  ]]);
}

module.exports = {
  generateExactInputSingleCalldata
}