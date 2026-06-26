import { MetadataRoute } from "next";
import { getCourseRows, type CourseRow } from "@/lib/supabase/queries";
import { BLOG_POSTS } from "@/lib/blog-data";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ai-trainer-academy.top";
  const now = new Date();

  // Static routes — all public indexable pages
  const staticRoutes = [
    { route: "",                   priority: 1.0, freq: "daily" },
    { route: "/trainers",          priority: 1.0, freq: "daily" },
    { route: "/courses",           priority: 0.95, freq: "daily" },
    { route: "/academy/modules",   priority: 0.95, freq: "weekly" },
    { route: "/academy/exam",      priority: 0.95, freq: "weekly" },
    { route: "/certifications",    priority: 0.9,  freq: "weekly" },
    { route: "/pricing",           priority: 0.9,  freq: "weekly" },
    { route: "/blog",              priority: 0.85, freq: "weekly" },
    { route: "/about",             priority: 0.8,  freq: "monthly" },
    { route: "/business",          priority: 0.75, freq: "monthly" },
    { route: "/apply",             priority: 0.75, freq: "monthly" },
    { route: "/faq/trainers",      priority: 0.7,  freq: "monthly" },
    { route: "/contact",           priority: 0.6,  freq: "monthly" },
    { route: "/careers",           priority: 0.55, freq: "monthly" },
    { route: "/privacy",           priority: 0.3,  freq: "yearly" },
    { route: "/terms",             priority: 0.3,  freq: "yearly" },
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
    console.error("[getCourseRows] Unexpected error:", e);
  }

  const courseRoutes = dbCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...courseRoutes, ...blogRoutes];
}
