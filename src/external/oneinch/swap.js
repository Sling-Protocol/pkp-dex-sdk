import { Interface } from "@ethersproject/abi";

const iface = new Interface([
  "function swap(address,tuple(address,address,address,address,uint256,uint256,uint256,bytes),bytes) external returns (uint256,uint256)"
]);

export function generateSwapData(
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
