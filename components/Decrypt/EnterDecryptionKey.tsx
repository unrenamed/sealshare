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
      <p className="text-xs text-center sm:text-left sm:text-base dark:text-neutral-400 transition-colors">
        Do not refresh this window as secret might be restricted to one time
        download.
      </p>
      <input
        className={cn(
          "w-full max-w-sm rounded-md outline-none p-2 border border-solid transition-colors border-black/[.345] dark:border-white/[.145] dark:bg-neutral-900 bg-gray-100 placeholder-black/[.5] dark:placeholder-white/[.25] text-xs sm:text-base",
          {
            "dark:border-red-500 border-red-500 dark:shadow-red-400 shadow-red-400 shadow-[0_2px_10px]":
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
        <p className="text-xs font-[family-name:var(--font-geist-mono)] text-red-500 dark:text-red-400">
          Invalid password. Please, try again.
        </p>
      )}
      <button
        onClick={submitPassword}
        className="rounded-md border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] active:scale-95 text-sm sm:text-base font-medium h-8 sm:h-10 px-4 sm:px-5 flex items-center gap-2 shadow-[0_2px_10px] shadow-foreground disabled:shadow-none disabled:dark:bg-[#ccc] disabled:active:scale-100 disabled:cursor-not-allowed"
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
