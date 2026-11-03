import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://ai-trainer-academy.top";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "AI Trainer Academy — Learn to Train AI Models",
  description: "Connect with verified AI training experts. Learn fine-tuning, prompt engineering, RLHF, and dataset curation from real practitioners. Pay in KSH, USD, or crypto.",
  keywords: "AI model training, fine-tuning, prompt engineering, RLHF, AI courses, machine learning training, AI education Kenya",
=======
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Trainer Academy | Learn from Practitioners. Earn Real Credentials.",
    template: "%s | Trainer Academy",
  },
  description:
    "Trainer Academy connects learners with practitioners who work in machine learning every day. Take structured courses, book 1-on-1 sessions, and leave with credentials employers recognise. Pay in KES, USD, or crypto.",
  keywords:
    "machine learning training, data annotation, RLHF, fine-tuning, prompt engineering, LLM training, AI certification, trainer booking, learn from practitioners, Kenyan tech education",
  authors: [{ name: "Trainer Academy", url: BASE_URL }],
  creator: "Trainer Academy",
  publisher: "Trainer Academy",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
>>>>>>> d950e182d713accc40d6b00347024f8418854729
  openGraph: {
    title: "Trainer Academy | Practitioner-Led Machine Learning Training",
    description:
      "Book sessions with practitioners who work in machine learning daily. Structured courses, real certifications, honest pricing.",
    type: "website",
    siteName: "AI Trainer Academy",
<<<<<<< HEAD
=======
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Trainer Academy — Practitioner-Led Machine Learning Training",
      },
    ],
>>>>>>> d950e182d713accc40d6b00347024f8418854729
  },
  twitter: {
    card: "summary_large_image",
    site: "@AITrainerAcad",
    creator: "@AITrainerAcad",
    title: "Trainer Academy | Learn Machine Learning from Practitioners",
    description:
      "Structured courses, 1-on-1 sessions, and credentials that matter. Taught by people who do this work every day.",
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

<<<<<<< HEAD
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
=======
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
    alternateName: ["Trainer Academy", "ATA"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
      caption: "AI Trainer Academy Logo",
    },
    description:
      "A training platform that connects learners with machine learning practitioners. Courses, 1-on-1 sessions, and certifications for data annotation, RLHF, fine-tuning, and prompt engineering.",
    foundingDate: "2024",
    areaServed: "Worldwide",
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
>>>>>>> d950e182d713accc40d6b00347024f8418854729
    </html>
  );
}
