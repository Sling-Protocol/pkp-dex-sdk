# pkp-dex-sdk
SDK to make swapping ERC-20 tokens easy with Lit Actions and PKPs.

To make the SDK as modular as possible, there are a few different components.

- Methods to generate transaction data to interact with several DEXes.
- A Lit Action that uses the PKP to sign an arbitrary message.
- Methods to interact with the Lit Action to acquire a transaction signature.

The developer should follow these steps to start interacting with DEXes with their PKP (boilerplate found in `src/test/sdkTest.js`):
- Acquire user input or generate the token swap details according to the chosen DEX's specification
  - Parameters such as input token, output token, input amount, deadline, etc. are usually needed
- Create the raw transaction object with the encoded calldata
- Compute the transaction's signature by interacting with the Lit Action
- After the signature is retrieved, broadcast the signed transaction with a generic web3 provider.


## Supported DEXes
- Uniswap V3 (`SwapRouter02`)
  - `exactInputSingle`
- 1inch (`AggregationRouterV4`)
  - `swap`
