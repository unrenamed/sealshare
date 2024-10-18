"use client";

import { useAsync } from "@/hooks";
import { decryptMessage } from "@/utils";
import { useState } from "react";
import { DecryptedSecret } from "./DecryptedSecret";
import { EnterDecryptionKey } from "./EnterDecryptionKey";
import { Decrypting } from "./Decrypting";

type Props = {
  readonly message: string;
  readonly password?: string;
};

export const Decrypt = (props: Props) => {
  const [password, setPassword] = useState(props.password || "");

  const { loading, error, value } = useAsync(async () => {
    return await decryptMessage(props.message, password, "utf8");
  }, [password]);

  if (loading) {
    return <Decrypting />;
  }

  if (error) {
    return (
      <EnterDecryptionKey
        loading={loading}
        password={password}
        setPassword={setPassword}
      />
    );
  }

  return <DecryptedSecret secret={value?.data as string} />;
};
