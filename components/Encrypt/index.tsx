"use client";

import { KeySquareIcon, LoaderIcon } from "lucide-react";
import { DecryptionKeyCheckbox } from "./DecryptionKeyCheckbox";
import { DecryptionKeyInput } from "./DecryptionKeyInput";
import { Expiration } from "./Expiration";
import { OneTimeDownload } from "./OneTimeDownload";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EncryptData } from "./types";
import { cn, randomString, encryptMessage } from "@/utils";
import { deriveKeyFromMessage } from "@/app/actions";
import { toast } from "sonner";
import { EncryptionResult } from "./EncryptionResult";

export const Encrypt = () => {
  const [loading, setLoading] = useState(false);

  const [encryptionResult, setEncryptionResult] = useState({
    messageKey: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<EncryptData>({
    defaultValues: {
      secretMessage: "",
      expiration: "1h",
      oneTime: true,
      generateDecryptionKey: true,
      decryptionKey: "",
    },
  });

  const generateDecryptionKey = watch("generateDecryptionKey");

  const onSubmit = async (data: EncryptData): Promise<void> => {
    setLoading(true);
    clearErrors();

    const password = data.generateDecryptionKey
      ? randomString(25)
      : data.decryptionKey;

    const encryptedMessage = await encryptMessage(data.secretMessage, password);

    try {
      const messageKey = await deriveKeyFromMessage({
        encryptedMessage: String(encryptedMessage),
        expiration: data.expiration,
        oneTime: data.oneTime,
      });

      setEncryptionResult({
        messageKey,
        password,
      });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (encryptionResult.messageKey) {
    return (
      <EncryptionResult
        messageKey={encryptionResult.messageKey}
        password={encryptionResult.password}
      />
    );
  }

  return (
    <form
      className="w-full flex flex-col align-center gap-6 items-center sm:items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)]">
        Encrypt Message
      </h1>

      <textarea
        {...register("secretMessage", { required: true })}
        autoFocus
        className={cn(
          "w-full resize-none rounded-md outline-none p-2 transition-colors border border-solid border-border bg-background-subtle placeholder-content-subtle text-xs sm:text-base overflow-auto scrollbar-thin scrollbar-track-rounded-xl scrollbar-thumb-rounded-xl scrollbar-track-gray-200 scrollbar-thumb-black/[.345] dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-700",
          {
            "border-alert shadow-alert-subtle shadow-[0_2px_10px]":
              !!errors.secretMessage,
          }
        )}
        rows={4}
        placeholder="Message to encrypt locally in your browser"
        aria-multiline
      />

      <p className="text-xs text-center sm:text-left sm:text-base text-content-subtle transition-colors">
        The encrypted message will be deleted automatically after:
      </p>
      <Expiration control={control} />
      <OneTimeDownload control={control} />
      <DecryptionKeyCheckbox control={control} />
      {!generateDecryptionKey && (
        <DecryptionKeyInput control={control} error={errors.decryptionKey} />
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-foreground/80 active:scale-95 text-sm sm:text-base font-medium h-8 sm:h-10 px-4 sm:px-5 flex items-center gap-2 shadow-[0_2px_10px] shadow-foreground disabled:bg-foreground/70 disabled:shadow-none disabled:active:scale-100 disabled:cursor-not-allowed"
      >
        {loading ? (
          <LoaderIcon
            className="h-3 w-3 sm:h-4 sm:w-4 animate-spin"
            strokeWidth={2}
          />
        ) : (
          <KeySquareIcon className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2} />
        )}
        Encrypt Message
      </button>
    </form>
  );
};
