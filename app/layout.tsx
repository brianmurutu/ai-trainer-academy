import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-trainer-academy.top"),
  title: "AI Trainer Academy | Learn to Train AI Models",
  description: "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KSH, USD, or crypto.",
  keywords: "AI model training, fine-tuning, prompt engineering, RLHF, AI courses, machine learning training, AI education Kenya",
  openGraph: {
    title: "AI Trainer Academy",
    description: "The #1 platform for AI model training education. Learn from verified experts.",
    type: "website",
    siteName: "AI Trainer Academy",
    url: "https://ai-trainer-academy.top",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trainer Academy",
    description: "Learn to train AI models from verified experts. KSH, USD & crypto payments.",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ai-trainer-academy.top/#organization",
    "name": "AI Trainer Academy",
    "url": "https://ai-trainer-academy.top",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ai-trainer-academy.top/favicon.ico",
      "caption": "AI Trainer Academy Logo"
    },
    "description": "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners."
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PLSXQKST7Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLSXQKST7Y');
          `}
        </Script>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
