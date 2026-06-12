import { MetadataRoute } from "next";
import { getCourseRows, type CourseRow } from "@/lib/supabase/queries";
import { BLOG_POSTS } from "@/lib/blog-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ai-trainer-academy.top";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/pricing",
    "/courses",
    "/trainers",
    "/blog",
    "/business",
    "/contact",
    "/faq/trainers",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic courses routes
  let dbCourses: CourseRow[] = [];
  try {
    dbCourses = await getCourseRows();
  } catch (e) {
    console.error("Failed to fetch courses for sitemap", e);
  }

  const courseRoutes = dbCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic trainers routes (mock list)
  const trainerSlugs = ["dr-amara-osei", "naledi-dlamini"];
  const trainerRoutes = trainerSlugs.map((slug) => ({
    url: `${baseUrl}/trainers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes, ...trainerRoutes];
}
