"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "bg-background text-content",
          description: "text-content-subtle",
          closeButton: "bg-background hover:!bg-border border-border hover:!border-border",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
