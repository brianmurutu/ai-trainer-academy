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
      ],
    },
    sitemap: "https://ai-trainer-academy.top/sitemap.xml",
  };
}
