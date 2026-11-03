import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/pricing",
          "/courses",
          "/trainers",
          "/blog",
          "/business",
          "/contact",
          "/faq/trainers",
          "/certifications",
          "/academy",
          "/academy/modules",
          "/academy/exam",
          "/careers",
          "/apply",
          "/privacy",
          "/terms",
        ],
        disallow: [
          "/dashboard/",
          "/trainer/",
          "/admin/",
          "/pay/",
          "/auth/",
          "/api/",
          "/login",
          "/signup",
          "/forgot-password",
          "/payouts",
          "/cookies",
        ],
      },
      // Explicitly allow AI crawlers commonly used by AI search engines
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/dashboard/", "/trainer/", "/admin/", "/api/", "/auth/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
        disallow: ["/dashboard/", "/trainer/", "/admin/", "/api/", "/auth/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/"],
        disallow: ["/dashboard/", "/trainer/", "/admin/", "/api/", "/auth/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/"],
        disallow: ["/dashboard/", "/trainer/", "/admin/", "/api/", "/auth/"],
      },
    ],
    sitemap: "https://ai-trainer-academy.top/sitemap.xml",
  };
}
