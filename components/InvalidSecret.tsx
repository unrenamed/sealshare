import { HomeIcon } from "lucide-react";
import Link from "next/link";

export const InvalidSecret = () => {
  return (
    <div className="w-full flex flex-col align-center gap-6 items-center sm:items-start">
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)] text-center">
        Secret does not exist
      </h1>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <h2 className="text-md sm:text-lg font-[family-name:var(--font-geist-mono)] text-center">
          Opened before
        </h2>
        <p className="text-xs text-center sm:text-left sm:text-base dark:text-neutral-400 transition-colors">
          A secret can be limited to a single download. It may be inaccessible
          if the sender accessed this link prior to your viewing.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <h2 className="text-md sm:text-lg font-[family-name:var(--font-geist-mono)] text-center">
          Broken link
        </h2>
        <p className="text-xs text-center sm:text-left sm:text-base dark:text-neutral-400 transition-colors">
          The link needs to be an exact match for decryption to succeed; it may
          be missing some essential characters.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <h2 className="text-md sm:text-lg font-[family-name:var(--font-geist-mono)] text-center">
          Expired
        </h2>
        <p className="text-xs text-center sm:text-left sm:text-base dark:text-neutral-400 transition-colors">
          No secret is eternal. All saved secrets will expire and self-destruct
          automatically. The duration can range from one hour to one week.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-md border border-solid border-transparent transition-colors bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] active:scale-95 text-sm sm:text-base font-medium h-8 sm:h-10 px-4 sm:px-5 flex items-center gap-2 shadow-[0_2px_10px] shadow-foreground"
      >
        <HomeIcon className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2} />
        Go to homepage
      </Link>
    </div>
  );
};
