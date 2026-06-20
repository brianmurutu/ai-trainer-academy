import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
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
        "/apply",
      ],
    },
    sitemap: "https://ai-trainer-academy.top/sitemap.xml",
  };
}
