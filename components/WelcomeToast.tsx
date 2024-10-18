"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (!document.cookie.includes("sealshare-welcome-toast=1")) {
      toast("🦭✨ Welcome to SealShare!", {
        closeButton: true,
        duration: Infinity,
        onDismiss: () =>
          (document.cookie =
            "sealshare-welcome-toast=1; max-age=31536000; path=/"),
        description: (
          <p>
            The secure way to seal and share your secrets. Thanks for trusting
            us to protect what matters most!
          </p>
        ),
      });
    }
  }, []);

  return null;
}
