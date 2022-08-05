import { Interface } from "@ethersproject/utils";

const iface = new Interface([
  "function approve(address,uint256) returns (bool)",
]);

const generateApproveCalldata(
  spender,
  amount
  ) {
  return iface.encodeFunctionData("approve", [[
    spender,
    amount,
  ]]);
}

module.exports = {
  generateApproveCalldata
}