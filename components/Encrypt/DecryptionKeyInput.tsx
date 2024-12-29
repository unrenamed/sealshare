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
            "w-full max-w-sm rounded-md outline-none p-2 transition-colors text-xs sm:text-base",
            "border border-solid border-border bg-background-subtle placeholder-content-subtle",
            { "border-alert shadow-alert-subtle shadow-[0_2px_10px]": !!props.error }
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
