import { Wallet } from "@ethersproject/wallet";
import { randomBytes } from "@ethersproject/random";
import { computeAddress } from "@ethersproject/transactions";
import { JsonRpcProvider } from "@ethersproject/providers";

import * as dotenv from "dotenv";
dotenv.config();

/// Constants
export const PKP_PUBLIC_KEY = process.env.PKP_PUBLIC_KEY;
export const PKP_OWNER_PRIVATE_KEY = process.env.PKP_OWNER_PRIVATE_KEY;
export const PKP_ADDRESS = computeAddress(PKP_PUBLIC_KEY);

/// Chain info -- CELO is used for tests
const PROVIDER_URL = "https://rpc.ankr.com/celo";
export const testProvider = new JsonRpcProvider(PROVIDER_URL);
export const testChainId = 42220;
