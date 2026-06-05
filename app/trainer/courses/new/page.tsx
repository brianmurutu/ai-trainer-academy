import CourseEditor from "@/components/trainer/CourseEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Course — Trainer Portal",
};

export default function NewCoursePage() {
  return (
    <CourseEditor />
  );
}
