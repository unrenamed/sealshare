import { useCopyToClipboard } from "@/hooks";
import { useDebounce } from "@/hooks/use-debounce";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  readonly messageKey: string;
  readonly password: string;
};

export const EncryptionResult = ({ messageKey, password }: Props) => {
  const [base, setBase] = useState("");

  useEffect(() => {
    setBase(
      process.env.NEXT_PUBLIC_URL ||
        `${window.location.protocol}//${window.location.host}`
    );
  }, []);

  const shortLink = `${base}/${messageKey}`;
  const oneClickLink = `${shortLink}/${password}`;

  return (
    <div className="w-full flex flex-col align-center gap-6 items-center sm:items-start">
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)]">
        Your Message is Encrypted!
      </h1>

      <p className="text-xs text-center sm:text-left sm:text-base text-content-subtle transition-colors">
        Your message has been successfully encrypted. To securely share it with
        others, simply copy the unique link below and send it to your intended
        recipient.
      </p>

      {!base ? (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-[45px] bg-background-subtle rounded-lg animate-pulse" />
          <div className="w-full h-[45px] bg-background-subtle rounded-lg animate-pulse" />
          <div className="w-full h-[45px] bg-background-subtle rounded-lg animate-pulse" />
        </div>
      ) : (
        <ul className="w-full grid grid-rows-3 overflow-hidden border divide-y rounded-lg divide-border border-border">
          <Row label="One-click link" value={oneClickLink} />
          <Row label="Short link" value={shortLink} />
          <Row label="Decryption key" value={password} />
        </ul>
      )}
    </div>
  );
};

type RowProps = {
  readonly label: string;
  readonly value: string;
};

const Row = ({ label, value }: RowProps) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const debouncedToast = useDebounce(() => {
    toast.promise(copyToClipboard(value), {
      loading: "Copying link to clipboard...",
      success: "Copied link to clipboard!",
      error: "Failed to copy to clipboard",
      duration: 1500,
    });
  }, 150);

  return (
    <div
      key={label}
      className="w-full grid items-center grid-cols-12 px-4 py-2 gap-4"
    >
      <div className="col-span-4 flex items-center gap-4 text-content">
        <button
          className="h-6 w-6 sm:h-8 sm:w-8 flex justify-center items-center rounded-full hover:bg-background-subtle transition-colors"
          onClick={debouncedToast}
        >
          <CopyIcon
            className="h-3 w-3 sm:h-4 sm:w-4 stroke-content-subtle"
            strokeWidth={2}
          />
        </button>
        <span className="text-xs sm:text-base font-medium truncate">
          {label}
        </span>
      </div>
      <span className="text-xs sm:text-sm truncate col-span-8 font-[family-name:var(--font-geist-mono)]">
        {value}
      </span>
    </div>
  );
};
