# pkp-dex-sdk
SDK to make swapping ERC-20 tokens easy with Lit Actions and PKPs.

To make the SDK as modular as possible, there are a few different components.

- Methods to generate transaction data to interact with several DEXes.
- A simple Lit Action that uses the PKP to sign an arbitrary message.
- Methods to interact with the Lit Action to acquire a transaction signature.

How to use (Uniswap example):
```
const sdk = new SDK(PKP_OWNER_PRIVATE_KEY, PKP_PUBLIC_KEY, testProvider);

const approveTx = await sdk.executeApprove(
   TOKEN_X_ADDRESS,
   addresses.mainnet.uniswap.v3.SwapRouter02,
   MaxUint256
);
await approveTx.wait();

const swapTx = await sdk.executeUniswapV3SwapExactInputSingle(addresses.mainnet.uniswap.v3.SwapRouter02, { /* Swap Desc */ });
await swapTx.wait();
```

## Supported DEXes
- Uniswap V3 (`SwapRouter02`)
  - `exactInputSingle`
- 1inch (`AggregationRouterV4`)
  - `swap`
