import { notFound } from "next/navigation";
import { getCourseById } from "@/app/actions/courses";
import { EditCourseForm } from "./EditCourseForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edit Course | Admin" };

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course) notFound();

  return <EditCourseForm course={course} />;
}
