import { Decrypt } from "@/components/Decrypt";
import { deriveEncryptedMessageFromKey } from "../actions";
import { InvalidSecret } from "@/components/InvalidSecret";

type PageParams = {
  key: string;
};

export default async function DecryptMessageKey({
  params,
}: {
  params: PageParams;
}) {
  let encryptedMesage = "";
  let errorMessage = "";

  try {
    encryptedMesage = await deriveEncryptedMessageFromKey(params.key);
  } catch (error) {
    errorMessage = (error as Error).message;
  }

  if (errorMessage) {
    return <InvalidSecret />;
  }

  return <Decrypt message={encryptedMesage} />;
}
