import { cn } from "@/utils";
import { LoaderIcon, LockKeyholeOpenIcon } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type Props = {
  readonly loading: boolean;
  readonly password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export function EnterDecryptionKey({ password, loading, setPassword }: Props) {
  const [tempPassword, setTempPassword] = useState(password);
  const invalidPassword = !!password;

  const submitPassword = () => {
    if (tempPassword) {
      setPassword(tempPassword);
    }
  };

  return (
    <div className="w-full flex flex-col align-center gap-6 items-center sm:items-start">
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)]">
        Enter decryption key
      </h1>
      <p className="text-xs text-center sm:text-left sm:text-base transition-colors text-content-subtle">
        Do not refresh this window as secret might be restricted to one time
        download.
      </p>
      <input
        className={cn(
          "w-full max-w-sm rounded-md outline-none p-2 border border-solid transition-colors border-border bg-background-subtle placeholder-content-subtle text-xs sm:text-base",
          {
            "border-alert shadow-alert-subtle shadow-[0_2px_10px]":
              invalidPassword,
          }
        )}
        autoComplete="off"
        spellCheck={false}
        value={tempPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTempPassword(e.target.value)
        }
        placeholder="Your decryption key..."
      />
      {invalidPassword && (
        <p className="text-xs font-[family-name:var(--font-geist-mono)] text-alert">
          Invalid password. Please, try again.
        </p>
      )}
      <button
        onClick={submitPassword}
        className="rounded-md border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-foreground/80 active:scale-95 text-sm sm:text-base font-medium h-8 sm:h-10 px-4 sm:px-5 flex items-center gap-2 shadow-[0_2px_10px] shadow-foreground disabled:shadow-none disabled:bg-foreground/70 disabled:active:scale-100 disabled:cursor-not-allowed"
      >
        {loading ? (
          <LoaderIcon
            className="h-3 w-3 sm:h-4 sm:w-4 animate-spin"
            strokeWidth={2}
          />
        ) : (
          <LockKeyholeOpenIcon
            className="h-3 w-3 sm:h-4 sm:w-4"
            strokeWidth={2}
          />
        )}
        Decrypt Secret
      </button>
    </div>
  );
}
