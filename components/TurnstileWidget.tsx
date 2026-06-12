/**
 * components/TurnstileWidget.tsx
 *
 * Reusable Cloudflare Turnstile widget.
 * - Renders invisibly by default (no user interaction needed).
 * - Calls onSuccess(token) when verified.
 * - Calls onError() if verification fails.
 * - Exposes a reset() via ref for retrying after form submission errors.
 *
 * Usage:
 *   const ref = useRef<TurnstileInstance>(null);
 *   <TurnstileWidget onSuccess={setToken} onError={() => setToken("")} ref={ref} />
 *   // After failed submit: ref.current?.reset()
 */
"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
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
    const internalRef = useRef<TurnstileInstance>(null);

    useImperativeHandle(ref, () => ({
      reset: () => internalRef.current?.reset(),
      getResponse: () => internalRef.current?.getResponse(),
      isExpired: () => internalRef.current?.isExpired() ?? false,
    }));

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

    // If site key not configured, render nothing (dev fallback).
    // Forms must still check if token is empty and show a warning.
    if (!siteKey) return null;

    return (
      <Turnstile
        ref={internalRef}
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
