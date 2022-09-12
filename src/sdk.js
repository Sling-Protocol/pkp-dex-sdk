import { arrayify, joinSignature } from "@ethersproject/bytes";
import { randomBytes } from "@ethersproject/random";
import { computeAddress, serialize } from "@ethersproject/transactions";
import { JsonRpcProvider } from "@ethersproject/providers";
import { generateAuthSig } from "./client/generateAuthSig.js";
import { runGetSignatureShare } from "./client/runGetSignatureShare.js";
import { getMessage, sendSignedTransaction } from "./client/transactionUtils.js";
import { generateApproveCalldata } from "./external/erc20/approve.js";
import { generateSwapExactInputSingleCalldata } from "./external/uniswap/swapExactInputSingle.js";

/// SDK object 
export class SDK {

  /// Initializes an instance of the SDK
  constructor(pkpOwnerPrivateKey, pkpPublicKey, provider) {
    this.pkpAddress = computeAddress(pkpPublicKey);
    this.pkpOwnerPrivateKey = pkpOwnerPrivateKey;
    this.pkpPublicKey = pkpPublicKey;
    this.provider = provider;
  }

  /// Signs and sends an arbitrary transaction with the PKP
  async pkpSignAndSendTransaction(tx, label) {
    const message = arrayify(getMessage(tx));
    const authSig = await generateAuthSig(this.pkpOwnerPrivateKey);

    const { signatures } = await runGetSignatureShare(authSig, message, this.pkpPublicKey, label);

    const encodedSignature = joinSignature({
      r: "0x" + signatures[label].r,
      s: "0x" + signatures[label].s,
      recoveryParam: signatures[label].recid
    });

    return await sendSignedTransaction(serialize(tx, encodedSignature), this.provider);
  }

  /// Approves an address (usually a DEX contract) to transfer tokens belonging to the PKP
  async executeApprove(tokenAddress, spender, amount) {
    const tx = {
      to: tokenAddress,
      nonce: await this.provider.getTransactionCount(this.pkpAddress),
      value: 0,
      gasPrice: await this.provider.getGasPrice(),
      gasLimit: 150000,
      chainId: (await this.provider.getNetwork()).chainId,
      data: generateApproveCalldata(spender, amount)
    }

    return await this.pkpSignAndSendTransaction(tx, "approveTx");
  }

  /// Executes a UniswapV3 exactInputSingle swap transaction.
  async executeUniswapV3SwapExactInputSingle(swapRouterAddress, exactInputSingleParams) {
    const tx = {
      to: swapRouterAddress,
      nonce: await this.provider.getTransactionCount(this.pkpAddress),
      value: 0,
      gasPrice: await this.provider.getGasPrice(),
      gasLimit: 500000,
      chainId: (await this.provider.getNetwork()).chainId,
      data: generateSwapExactInputSingleCalldata(exactInputSingleParams)
    };

    return await this.pkpSignAndSendTransaction(tx, "exactInputSingleTx");
  }


}
