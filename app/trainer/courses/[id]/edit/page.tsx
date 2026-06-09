import CourseEditor from "@/components/trainer/CourseEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Course | Trainer Portal",
};

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <CourseEditor courseId={id} />
  );
}
