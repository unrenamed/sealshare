import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { EncryptData } from "./types";

export const DecryptionKeyCheckbox = (props: {
  control: Control<EncryptData>;
}) => {
  return (
    <Controller
      name="generateDecryptionKey"
      control={props.control}
      render={({ field }) => (
        <div className="flex items-center font-[family-name:var(--font-geist-mono)]">
          <Checkbox.Root
            id="generate-decryption"
            checked={field.value}
            onCheckedChange={field.onChange}
            className="size-[15px] sm:size-[20px] transition-colors appearance-none flex items-center justify-center rounded bg-foreground outline-none active:scale-95"
          >
            <Checkbox.Indicator className="text-accent">
              <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={4} />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label
            className="pl-2 text-xs sm:text-base leading-none"
            htmlFor="generate-decryption"
          >
            Generate decryption key
          </label>
        </div>
      )}
    />
  );
};
