/// Lit Action that signs a digest and returns a signature share. This
/// Lit Action will be used to sign transactions interacting with DEXes
/// created by users of the SDK.
/// toSign (the transaction digest), publicKey, and sigName are all required.

const signMessage = async () => {
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey, sigName });
};

signMessage();