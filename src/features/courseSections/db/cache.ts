import { getGlobalTag, getIdTag, getCourseTag } from "@/lib/dataCache";
import { revalidateTag } from "next/cache";

export function getCourseSectionGlobalTag() {
  return getGlobalTag("courseSections");
}

export function getCourseSectionIdTag(id: string) {
  return getIdTag("courseSections", id);
}

export function getCourseSectionCourseTag(courseId: string) {
  return getCourseTag("courseSections", courseId);
}

export function revalidateCourseSectionCache({
  courseId,
  id,
}: {
  courseId: string;
  id: string;
}) {
  revalidateTag(getCourseSectionGlobalTag());
  revalidateTag(getCourseSectionIdTag(id));
  revalidateTag(getCourseSectionCourseTag(courseId));
}
