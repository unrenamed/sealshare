"use server";

import {
  convertDurationToTimestamp,
  createApiKey,
  verifyApiKey,
} from "@/utils";

export const deriveKeyFromMessage = async ({
  encryptedMessage,
  expiration,
  oneTime,
}: {
  encryptedMessage: string;
  expiration: "1h" | "1d" | "1w";
  oneTime: boolean;
}) => {
  const expires = convertDurationToTimestamp(expiration);
  const remaining = oneTime ? 1 : undefined;
  const meta = { encryptedMessage };

  const created = await createApiKey({ remaining, expires, meta });

  if (created.error) {
    console.error(created.error);
    throw new Error("Failed to derive key from encrypted message.");
  }

  return created.result.key;
};

export const deriveEncryptedMessageFromKey = async (key: string) => {
  const { result, error } = await verifyApiKey(key);

  if (error) {
    console.error(error);
    throw new Error("Failed to verify API key.");
  }

  if (!result.valid) {
    throw new Error("The provided key is either invalid or has expired.");
  }

  const message = result.meta?.["encryptedMessage"] as string;
  if (!message) {
    throw new Error("The provided key does not contain an encrypted message.");
  }

  return message;
};
