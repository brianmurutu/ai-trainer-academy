import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const BASE_URL = "https://ai-trainer-academy.top";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AI Trainer Academy | Learn to Train AI Models",
    template: "%s | AI Trainer Academy",
  },
  description:
    "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KES, USD, or crypto.",
  keywords:
    "AI model training, fine-tuning, prompt engineering, RLHF, AI courses, machine learning training, AI education Kenya, LLM training",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "AI Trainer Academy",
    description:
      "The go-to platform for AI model training education. Learn from verified experts.",
    type: "website",
    siteName: "AI Trainer Academy",
    url: BASE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Trainer Academy — Learn to Train AI Models",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AITrainerAcad",
    creator: "@AITrainerAcad",
    title: "AI Trainer Academy",
    description:
      "Learn to train AI models from verified experts. KES, USD and crypto payments.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "AI Trainer Academy",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
      caption: "AI Trainer Academy Logo",
    },
    description:
      "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners.",
    sameAs: [
      "https://twitter.com/AITrainerAcad",
      "https://linkedin.com/company/ai-trainer-academy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "AI Trainer Academy",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/trainers?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        {/* Google Analytics */}
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
        <CurrencyProvider>{children}</CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
