import { LoaderIcon } from "lucide-react";

export function Decrypting() {
  return (
    <div className="flex items-center gap-4">
      <LoaderIcon
        className="h-5 w-5 sm:h-7 sm:w-7 animate-spin"
        strokeWidth={2}
      />
      <h1 className="text-xl sm:text-3xl font-[family-name:var(--font-geist-mono)]">
        Decrypting, please hold...
      </h1>
    </div>
  );
}
