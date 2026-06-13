import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCourseBySlug } from "@/lib/supabase/queries";
import { mapCourseRowToCourse } from "@/lib/courses-data";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft, Star, Clock, BookOpen, User, DollarSign, Check, Award, ArrowRight, Send } from "lucide-react";
import type { Metadata } from "next";
import CourseEnrollmentWidget from "@/components/courses/CourseEnrollmentWidget";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbCourse = await getCourseBySlug(slug);
  if (!dbCourse) return { title: "Course Not Found | AI Trainer Academy" };
  return {
    title: `${dbCourse.title} | AI Trainer Academy`,
    description: dbCourse.description || "",
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbCourse = await getCourseBySlug(slug);

  if (!dbCourse) notFound();

  const course = mapCourseRowToCourse(dbCourse);

  // Get the logged-in user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userEmail = user?.email || "";

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `https://ai-trainer-academy.top/courses/${course.slug}#course`,
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Organization",
      "name": "AI Trainer Academy",
      "url": "https://ai-trainer-academy.top"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructor": {
        "@type": "Person",
        "name": course.trainer,
        "jobTitle": course.trainerTitle
      }
    },
    "educationalLevel": course.level,
    "offers": {
      "@type": "Offer",
      "price": course.priceUsd,
      "priceCurrency": "USD",
      "category": "Paid"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": course.rating,
      "reviewCount": Math.max(5, Math.floor(course.enrolledCount * 0.15)),
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ai-trainer-academy.top"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://ai-trainer-academy.top/courses"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": course.title,
        "item": `https://ai-trainer-academy.top/courses/${course.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main style={{ background: "var(--surface)", minHeight: "100vh" }}>
        {/* Breadcrumb Nav */}
        <nav aria-label="Breadcrumb" style={{
          background: "white",
          borderBottom: "1px solid var(--line)",
          padding: "14px 24px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, color: "var(--slate)" }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Home
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <Link href="/courses" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }} className="hover-link">
              Courses
            </Link>
            <span style={{ color: "var(--muted)" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }} aria-current="page">
              {course.title}
            </span>
          </div>
        </nav>

        {/* Hero Section */}
        <section style={{
          background: course.image_url 
            ? `linear-gradient(rgba(10,25,47,0.8), rgba(10,25,47,0.92)), url(${course.image_url}) center/cover no-repeat`
            : "linear-gradient(135deg, var(--navy) 0%, #1A2E42 100%)",
          color: "white",
          padding: "60px 24px",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: 40, alignItems: "center" }} className="responsive-split-grid">
            <div>
              <span style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "4px 10px",
                borderRadius: 12,
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "inline-block",
                marginBottom: 16
              }}>
                {course.level}
              </span>
              <h1 style={{
                fontSize: "clamp(28px, 4vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "-0.5px",
                marginBottom: 16
              }}>
                {course.title}
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: 24, maxWidth: 650 }}>
                {course.description}
              </p>

              {/* Meta information */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24, fontSize: 13 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: "var(--accent)", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, fontWeight: 600, color: "white"
                  }}>
                    {course.trainerInitials}
                  </div>
                  <span>Created by <strong>{course.trainer}</strong></span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontWeight: 600 }}>{course.rating}</span>
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>rating</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <BookOpen size={14} color="rgba(255,255,255,0.6)" />
                  <span>{course.enrolledCount} learners enrolled</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={14} color="rgba(255,255,255,0.6)" />
                  <span>{course.duration} duration</span>
                </div>
              </div>
            </div>
            {/* Empty grid space for sticky card placement */}
            <div />
          </div>
        </section>

        {/* Content & Sticky Sidebar Grid */}
        <section style={{ maxWidth: 1100, margin: "-40px auto 80px", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" }} className="responsive-split-grid">
          
          {/* Main Course Content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* What you'll learn */}
            <div style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              border: "1px solid var(--line)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                What you'll learn
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="responsive-cards-grid">
                {course.whatYoullLearn.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "start", gap: 10 }}>
                    <Check size={16} color="var(--green)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              border: "1px solid var(--line)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Course Content
              </h2>

              {/* Telegram Delivery Warning Alert */}
              <div style={{
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 12,
                padding: "16px 20px",
                marginBottom: 24,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}>
                <div style={{
                  background: "var(--accent)",
                  borderRadius: "50%",
                  padding: 6,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2
                }}>
                  <Send size={14} style={{ transform: "rotate(45deg)", marginLeft: -1, marginTop: 1 }} />
                </div>
                <div>
                  <h4 style={{ fontSize: 13.5, fontWeight: 600, color: "var(--navy)", marginBottom: 4 }}>
                    Access & Telegram Delivery Requirement
                  </h4>
                  <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5, margin: 0 }}>
                    Please note that you will get access to the course content and materials after making the payment or completing enrollment. 
                    An active <strong>Telegram</strong> account is required since all course content and updates will be delivered and managed through Telegram. A direct link will also be sent to your email.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {course.curriculum.map((section, sidx) => (
                  <div key={sidx} style={{
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    overflow: "hidden"
                  }}>
                    <div style={{
                      background: "var(--surface)",
                      padding: "14px 20px",
                      fontWeight: 600,
                      fontSize: 14,
                      color: "var(--navy)",
                      borderBottom: "1px solid var(--line)"
                    }}>
                      Section {sidx + 1}: {section.title}
                    </div>
                    <div>
                      {section.lessons.map((lesson, lidx) => (
                        <div key={lidx} style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 20px",
                          borderBottom: lidx < section.lessons.length - 1 ? "1px solid var(--line)" : "none",
                          fontSize: 13,
                          color: "var(--slate)"
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <BookOpen size={14} color="var(--muted)" />
                            <span>{lesson.title}</span>
                          </div>
                          <span>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* About the Trainer */}
            <div style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              border: "1px solid var(--line)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 20 }}>
                Your Instructor
              </h2>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: "var(--accent)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 22, fontWeight: 700, color: "white",
                  flexShrink: 0
                }}>
                  {course.trainerInitials}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>
                    {course.trainer}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
                    {course.trainerTitle}
                  </p>
                  <p style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6 }}>
                    {course.trainerBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            <div style={{
              background: "white",
              borderRadius: 16,
              padding: 32,
              border: "1px solid var(--line)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.01)"
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 16 }}>
                Prerequisites
              </h2>
              <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {course.prerequisites.map((req, idx) => (
                  <li key={idx} style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.5 }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Enrollment Widget Card */}
          <div style={{ position: "sticky", top: 84 }}>
            <CourseEnrollmentWidget
              courseId={course.id}
              courseTitle={course.title}
              priceUsd={course.priceUsd}
              priceKsh={course.priceKsh}
              userEmail={userEmail}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
