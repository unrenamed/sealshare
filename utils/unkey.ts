import { Unkey } from "@unkey/api";

export const createApiKey = async ({
  remaining,
  expires,
  meta,
}: {
  remaining?: number;
  expires: number;
  meta: { [key: string]: unknown };
}) => {
  const unkey = new Unkey({
    rootKey: process.env.UNKEY_ROOT_KEY!,
    cache: "no-cache",
  });
  return unkey.keys.create({
    apiId: process.env.UNKEY_API_ID!,
    ownerId: "anonymous",
    remaining,
    expires,
    meta,
  });
};

export const verifyApiKey = async (key: string) => {
  const unkey = new Unkey({
    rootKey: process.env.UNKEY_ROOT_KEY!,
    cache: "no-cache",
  });
  return unkey.keys.verify({
    key,
    apiId: process.env.UNKEY_API_ID!,
  });
};

export const getAllApiKeys = async ({
  limit = 5,
  cursor,
}: {
  limit: number;
  cursor?: string;
}) => {
  const unkey = new Unkey({
    rootKey: process.env.UNKEY_ROOT_KEY!,
  });
  return unkey.apis.listKeys({
    limit,
    cursor,
    revalidateKeysCache: true,
    apiId: process.env.UNKEY_API_ID!,
  });
};

export const deleteApiKey = async (keyId: string) => {
  const unkey = new Unkey({
    rootKey: process.env.UNKEY_ROOT_KEY!,
  });
  return unkey.keys.delete({ keyId });
};
