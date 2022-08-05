import { Interface } from "@ethersproject/utils";

const iface = new Interface([
  "function swap(address,tuple(address,address,address,address,uint256,uint256,uint256,bytes),bytes) external returns (uint256,uint256)"
]);

const generateSwapData(
  swapDescription,
  data
  ) {
  return iface.encodeFunctionData("swap", [[
    swapDescription.srcToken,
    swapDescription.dstToken,
    swapDescription.srcReceiver,
    swapDescription.dstReceiver,
    swapDescription.amount,
    swapDescription.minReturnAmout,
    swapDescription.flags,
    swapDescription.permit
  ], data]);
}

module.exports = {
  generateSwapData
}