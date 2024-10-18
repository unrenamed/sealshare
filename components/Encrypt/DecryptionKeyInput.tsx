import { Control, Controller, FieldError } from "react-hook-form";
import { EncryptData } from "./types";
import { cn } from "@/utils";

export const DecryptionKeyInput = (props: {
  control: Control<EncryptData>;
  error?: FieldError;
}) => {
  return (
    <Controller
      name="decryptionKey"
      control={props.control}
      rules={{ required: true }}
      render={({ field }) => (
        <input
          className={cn(
            "w-full max-w-sm rounded-md outline-none p-2 transition-colors border border-solid border-black/[.345] dark:border-white/[.145] dark:bg-neutral-900 bg-gray-100 placeholder-black/[.5] dark:placeholder-white/[.25] text-xs sm:text-base",
            {
              "dark:border-red-500 border-red-500 dark:shadow-red-400 shadow-red-400 shadow-[0_2px_10px]":
                !!props.error,
            }
          )}
          autoComplete="off"
          spellCheck={false}
          value={field.value}
          onChange={field.onChange}
          placeholder="Your custom decryption key"
        />
      )}
    />
  );
};
