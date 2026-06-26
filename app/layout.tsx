import type { Metadata } from "next";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const BASE_URL = "https://ai-trainer-academy.top";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AI Trainer Academy | Learn to Train AI Models with Verified Experts",
    template: "%s | AI Trainer Academy",
  },
  description:
    "AI Trainer Academy is the leading platform for AI training, data annotation, and AI model training education. Connect with verified AI trainers to learn RLHF, fine-tuning, prompt engineering, and dataset curation. Pay in KES, USD, or crypto.",
  keywords:
    "AI Trainer, AI Training, AI Training Academy, AI Academy, AI Models Training, Data Annotation, AI trainer certification, RLHF training, fine-tune LLM, prompt engineering course, AI data labeling, machine learning training, become AI trainer, AI annotation course, AI education Kenya, AI courses Africa, AI trainer jobs",
  authors: [{ name: "AI Trainer Academy", url: BASE_URL }],
  creator: "AI Trainer Academy",
  publisher: "AI Trainer Academy",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "AI Trainer Academy | AI Training, Data Annotation & AI Model Training",
    description:
      "The specialist platform for AI training and data annotation education. Find verified AI trainers, earn certifications, and train AI models from real practitioners.",
    type: "website",
    siteName: "AI Trainer Academy",
    url: BASE_URL,
    locale: "en_US",
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
    title: "AI Trainer Academy | AI Training & Data Annotation Platform",
    description:
      "Learn AI training, data annotation, RLHF, and AI model fine-tuning from verified experts. KES, USD and crypto payments accepted.",
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
  category: "Education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${BASE_URL}/#organization`,
    name: "AI Trainer Academy",
    alternateName: ["AI Trainer Academy", "ATA", "AI Training Academy"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
      caption: "AI Trainer Academy Logo",
    },
    description:
      "AI Trainer Academy is the leading platform for AI training, data annotation, and AI model training education. Connect with verified AI trainers worldwide to learn RLHF, fine-tuning, prompt engineering, and dataset curation.",
    foundingDate: "2024",
    areaServed: "Worldwide",
    knowsAbout: [
      "AI Training",
      "Data Annotation",
      "AI Model Training",
      "RLHF",
      "Fine-tuning",
      "Prompt Engineering",
      "Dataset Curation",
      "Machine Learning",
      "Large Language Models",
    ],
    sameAs: [
      "https://twitter.com/AITrainerAcad",
      "https://linkedin.com/company/ai-trainer-academy",
      "https://github.com/brianmurutu/ai-trainer-academy",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Training Programs",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: "AI Training & Data Annotation Courses",
            url: `${BASE_URL}/courses`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "1-on-1 AI Trainer Sessions",
            url: `${BASE_URL}/trainers`,
          },
        },
      ],
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "AI Trainer Academy",
    description: "AI Training, Data Annotation, and AI Model Training platform",
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
