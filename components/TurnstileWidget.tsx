"use client";

import { forwardRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import type { TurnstileInstance } from "@marsidev/react-turnstile";

export type { TurnstileInstance };

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

const TurnstileWidget = forwardRef<TurnstileInstance, TurnstileWidgetProps>(
  function TurnstileWidget({ onSuccess, onError, onExpire }, ref) {
    // The site key is a PUBLIC credential (like a reCAPTCHA public key) — it is
    // intentionally visible in page HTML to all users. Hardcoding it as a fallback
    // ensures the widget always loads even when the NEXT_PUBLIC_ env var is absent
    // from the production client bundle (e.g. env var not set in hosting dashboard).
    const siteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "0x4AAAAAADjgT5WKDh8qp6ux";

    if (!siteKey) return null;

    return (
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onSuccess}
        onError={onError}
        onExpire={onExpire}
        options={{
          theme: "light",
          size: "normal",
          appearance: "always",
        }}
        style={{ marginTop: 4 }}
      />
    );
  }
);

export default TurnstileWidget;
