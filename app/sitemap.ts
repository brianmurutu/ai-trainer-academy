import { MetadataRoute } from "next";
import { getCourseRows, type CourseRow } from "@/lib/supabase/queries";
import { BLOG_POSTS } from "@/lib/blog-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ai-trainer-academy.top";
  const now = new Date();

  // Static routes
  const staticRoutes = [
    { route: "", priority: 1.0, freq: "weekly" },
    { route: "/about", priority: 0.8, freq: "monthly" },
    { route: "/pricing", priority: 0.8, freq: "weekly" },
    { route: "/courses", priority: 0.9, freq: "weekly" },
    { route: "/trainers", priority: 0.9, freq: "weekly" },
    { route: "/blog", priority: 0.8, freq: "weekly" },
    { route: "/business", priority: 0.7, freq: "monthly" },
    { route: "/contact", priority: 0.6, freq: "monthly" },
    { route: "/faq/trainers", priority: 0.6, freq: "monthly" },
    { route: "/certifications", priority: 0.7, freq: "monthly" },
    { route: "/academy/modules", priority: 0.7, freq: "weekly" },
    { route: "/careers", priority: 0.5, freq: "monthly" },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: freq as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority,
  }));

  // Dynamic course routes from database
  let dbCourses: CourseRow[] = [];
  try {
    dbCourses = await getCourseRows();
  } catch (e) {
    console.error("Failed to fetch courses for sitemap", e);
  }

  const courseRoutes = dbCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
