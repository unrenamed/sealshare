import * as RadioGroup from "@radix-ui/react-radio-group";
import { Controller, Control } from "react-hook-form";
import { EncryptData } from "./types";

export const Expiration = (props: { control: Control<EncryptData> }) => {
  return (
    <Controller
      name="expiration"
      control={props.control}
      render={({ field }) => (
        <RadioGroup.Root
          className="flex gap-8 font-[family-name:var(--font-geist-mono)]"
          value={field.value}
          onValueChange={field.onChange}
          aria-label="Expiration options"
        >
          <ExpirationOption value="1h" label="One hour" id="1h" />
          <ExpirationOption value="1d" label="One day" id="1d" />
          <ExpirationOption value="1w" label="One week" id="1w" />
        </RadioGroup.Root>
      )}
    />
  );
};

type ExpirationOptionProps = {
  value: string;
  label: string;
  id: string;
};

const ExpirationOption = ({ value, label, id }: ExpirationOptionProps) => {
  return (
    <div className="flex items-center">
      <RadioGroup.Item
        id={id}
        value={value}
        className="size-[15px] sm:size-[20px] rounded-full bg-foreground outline-none transition-colors active:scale-95"
      >
        <RadioGroup.Indicator className="relative flex size-full items-center justify-center after:block after:size-[10px] after:rounded-full after:dark:bg-blue-700 after:bg-blue-500" />
      </RadioGroup.Item>
      <label className="text-xs sm:text-base pl-2 leading-none" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
