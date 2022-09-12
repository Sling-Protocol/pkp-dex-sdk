import { Interface } from "@ethersproject/abi";

const iface = new Interface([
  "function approve(address,uint256) returns (bool)",
]);

export function generateApproveCalldata (
  spender,
  amount
  ) {
  return iface.encodeFunctionData("approve", [
    spender,
    amount,
  ]);
}
