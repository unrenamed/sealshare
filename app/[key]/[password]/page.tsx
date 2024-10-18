import { deriveEncryptedMessageFromKey } from "@/app/actions";
import { Decrypt } from "@/components/Decrypt";
import { InvalidSecret } from "@/components/InvalidSecret";

type PageParams = {
  key: string;
  password: string;
};

export default async function DecryptMessageKeyWithPassword({
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

  return <Decrypt message={encryptedMesage} password={params.password} />;
}
