import { useCopyToClipboard } from "@/hooks";
import { useDebounce } from "@/hooks/use-debounce";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

type Props = {
  secret: string;
};

export function DecryptedSecret({ secret }: Props) {
  const [, copyToClipboard] = useCopyToClipboard();

  const debouncedToast = useDebounce(() => {
    toast.promise(copyToClipboard(secret), {
      loading: "Copying secret to clipboard...",
      success: "Copied secret to clipboard!",
      error: "Failed to copy to clipboard",
      duration: 1500,
    });
  }, 150);

  return (
    <div className="w-full flex flex-col align-center gap-6 items-center sm:items-start">
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)]">
        Decrypted message
      </h1>
      <div className="w-full flex justify-center sm:justify-between items-center flex-wrap gap-4">
        <p className="text-xs text-center sm:text-left sm:text-base text-content-subtle transition-colors">
          This secret might not be viewable again, make sure to save it now!
        </p>
        <button
          className="rounded-md border border-solid border-border transition-colors flex items-center justify-center hover:bg-background-subtle hover:border-transparent dark:hover:border-transparent text-foreground active:scale-95 text-sm sm:text-base font-medium h-8 sm:h-10 px-4 sm:px-5 gap-2"
          onClick={debouncedToast}
        >
          <CopyIcon className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2} />
          Copy
        </button>
      </div>
      <p className="w-full resize-none rounded-md outline-none p-4 border border-solid border-border transition-colors bg-background-subtle text-content text-xs sm:text-base break-words break-all whitespace-pre-wrap font-[family-name:var(--font-geist-mono)]">
        {secret}
      </p>
    </div>
  );
}
