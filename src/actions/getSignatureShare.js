/// Lit Action that signs a digest and returns a signature share.

const go = async () => {
  const sigShare = await LitActions.signEcdsa({ toSign, keyId, sigName });
};

go();