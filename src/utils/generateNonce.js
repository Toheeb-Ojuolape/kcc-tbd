import { CryptoUtils } from "@web5/crypto";

export const generateCNonce = () => {
  const nonce = CryptoUtils.randomBytes(24);
  return nonce;
};
