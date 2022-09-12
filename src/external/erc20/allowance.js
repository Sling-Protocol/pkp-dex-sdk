import { Contract } from "@ethersproject/contracts";

const abi = ["function allowance(address,address) view returns (uint256)"];

export const getAllowance = async (tokenAddress, owner, spender, provider) => {
  const contract = new Contract(tokenAddress, abi, provider);
  return await contract.allowance(owner, spender); 
}