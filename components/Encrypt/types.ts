export type EncryptData = {
  secretMessage: string;
  expiration: "1h" | "1d" | "1w";
  oneTime: boolean;
  generateDecryptionKey: boolean;
  decryptionKey: string;
};
